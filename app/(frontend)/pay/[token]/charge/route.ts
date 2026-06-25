import { getPayload } from 'payload';
import config from '@payload-config';
import { momoConfigured, requestToPay, getAccountName } from '@/lib/momo';
import { paypalConfigured, createOrder } from '@/lib/paypal';

/* Payment initiation for /pay/[token].
   - Mobile Money: triggers an MTN MoMo prompt on the payer's phone, returns
     { pending: true } — the page then polls /pay/[token]/status.
   - PayPal: creates an order and returns { url } to redirect to PayPal.
   - Stripe: seam left for keys (returns not-configured). */

export const dynamic = 'force-dynamic';

export async function POST(
  req: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const body = await req.json().catch(() => ({}));
  const method: string = body.method || '';
  const phone: string = body.phone || '';

  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: 'enquiries',
    where: { token: { equals: token } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const booking = res.docs[0] as any | undefined;

  if (!booking) {
    return Response.json({ ok: false, message: 'Booking not found.' }, { status: 404 });
  }
  if (booking.status !== 'Confirmed' || !booking.amount || booking.amount <= 0) {
    return Response.json(
      { ok: false, message: 'This booking is not ready for payment.' },
      { status: 409 },
    );
  }

  const base = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, '') || 'http://localhost:3000';
  const note = [booking.destination, booking.tour].filter(Boolean).join(' · ') || 'Zuri Travels booking';

  try {
    switch (method) {
      /* ── MTN Mobile Money ── */
      case 'Mobile Money': {
        if (!momoConfigured()) break;
        if (!phone || phone.replace(/\D/g, '').length < 9) {
          return Response.json(
            { ok: false, message: 'Enter a valid mobile money number.' },
            { status: 400 },
          );
        }
        // MoMo Rwanda settles in RWF; pass the booking currency through and let
        // the gateway validate (price MoMo bookings in RWF to avoid rejection).
        const ref = await requestToPay({
          amount: Number(booking.amount),
          currency: booking.currency || 'RWF',
          phone,
          note,
        });
        const payerName = await getAccountName(phone);
        await payload.update({
          collection: 'enquiries',
          id: booking.id,
          data: { paymentMethod: 'Mobile Money', paymentReference: ref, payerPhone: phone },
          overrideAccess: true,
        });
        return Response.json({ ok: true, pending: true, ref, payerName });
      }

      /* ── PayPal ── */
      case 'PayPal': {
        if (!paypalConfigured()) break;
        const order = await createOrder({
          amount: Number(booking.amount),
          currency: booking.currency || 'USD',
          description: note,
          returnUrl: `${base}/pay/${token}/paypal-return`,
          cancelUrl: `${base}/pay/${token}`,
        });
        await payload.update({
          collection: 'enquiries',
          id: booking.id,
          data: { paymentMethod: 'PayPal', paymentReference: order.id },
          overrideAccess: true,
        });
        return Response.json({ ok: true, url: order.approveUrl });
      }

      /* ── Stripe (seam — add STRIPE_SECRET_KEY + `npm i stripe`) ── */
      case 'Stripe': {
        if (!process.env.STRIPE_SECRET_KEY) break;
        // @ts-ignore optional dep
        const { default: Stripe } = await import('stripe');
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const session = await stripe.checkout.sessions.create({
          mode: 'payment',
          success_url: `${base}/pay/${token}`,
          cancel_url: `${base}/pay/${token}`,
          customer_email: booking.email,
          line_items: [
            {
              quantity: 1,
              price_data: {
                currency: (booking.currency || 'USD').toLowerCase(),
                unit_amount: Math.round(Number(booking.amount) * 100),
                product_data: { name: note },
              },
            },
          ],
          metadata: { token, bookingId: String(booking.id) },
        });
        return Response.json({ ok: true, url: session.url });
      }
    }
  } catch (err) {
    payload.logger?.error(`Payment init failed (${method}) for ${token}: ${(err as Error).message}`);
    return Response.json(
      { ok: false, message: 'We could not start the payment. Please try again shortly.' },
      { status: 502 },
    );
  }

  return Response.json({
    ok: false,
    configured: false,
    method,
    message: `${method} isn't switched on yet. Our team will email you a secure ${method} link shortly.`,
  });
}
