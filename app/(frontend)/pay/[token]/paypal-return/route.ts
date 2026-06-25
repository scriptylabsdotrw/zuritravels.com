import { getPayload } from 'payload';
import config from '@payload-config';
import { captureOrder } from '@/lib/paypal';

/* PayPal redirects the payer here after approval. PayPal appends its order id
   as the `token` QUERY param (distinct from our booking `token` PATH param).
   We capture the order and, on success, mark the booking Paid — then send the
   payer back to the payment page which shows the receipt state. */

export const dynamic = 'force-dynamic';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const orderId = new URL(req.url).searchParams.get('token'); // PayPal order id
  const base = process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, '') || 'http://localhost:3000';
  const backTo = `${base}/pay/${token}`;

  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: 'enquiries',
    where: { token: { equals: token } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const booking = res.docs[0] as any | undefined;

  if (booking && orderId && booking.status !== 'Paid') {
    try {
      const capture = await captureOrder(orderId);
      if (capture.ok) {
        await payload.update({
          collection: 'enquiries',
          id: booking.id,
          data: {
            status: 'Paid',
            paymentMethod: 'PayPal',
            paidAt: new Date().toISOString(),
            paymentReference: capture.reference || orderId,
          },
          overrideAccess: true,
        });
      } else {
        return Response.redirect(`${backTo}?error=paypal`, 303);
      }
    } catch (err) {
      payload.logger?.error(`PayPal capture failed for ${token}: ${(err as Error).message}`);
      return Response.redirect(`${backTo}?error=paypal`, 303);
    }
  }

  return Response.redirect(backTo, 303);
}
