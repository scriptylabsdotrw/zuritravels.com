import { getPayload } from 'payload';
import config from '@payload-config';
import { checkStatus } from '@/lib/momo';

/* Polled by the payment page while a Mobile Money prompt is pending.
   On SUCCESSFUL it flips the booking to Paid (which the page then reflects). */

export const dynamic = 'force-dynamic';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: 'enquiries',
    where: { token: { equals: token } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  const booking = res.docs[0] as any | undefined;

  if (!booking) return Response.json({ status: 'FAILED' }, { status: 404 });
  if (booking.status === 'Paid') return Response.json({ status: 'SUCCESSFUL' });
  if (!booking.paymentReference) return Response.json({ status: 'PENDING' });

  let status: 'SUCCESSFUL' | 'FAILED' | 'PENDING' = 'PENDING';
  try {
    status = await checkStatus(booking.paymentReference);
  } catch {
    return Response.json({ status: 'PENDING' });
  }

  if (status === 'SUCCESSFUL') {
    await payload.update({
      collection: 'enquiries',
      id: booking.id,
      data: { status: 'Paid', paymentMethod: 'Mobile Money', paidAt: new Date().toISOString() },
      overrideAccess: true,
    });
  }

  return Response.json({ status });
}
