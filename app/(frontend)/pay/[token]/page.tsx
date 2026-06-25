import { getPayload } from 'payload';
import config from '@payload-config';
import type { Metadata } from 'next';
import PaymentOptions from '@/components/PaymentOptions';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Complete your booking — Zuri Travels',
  robots: { index: false, follow: false },
};

const CURRENCY_SYMBOL: Record<string, string> = { USD: '$', EUR: '€', RWF: 'FRw ' };
const money = (amount?: number | null, currency = 'USD') =>
  amount == null
    ? ''
    : `${CURRENCY_SYMBOL[currency] ?? ''}${Number(amount).toLocaleString('en-US', {
        maximumFractionDigits: 2,
      })}`;

async function getBooking(token: string) {
  const payload = await getPayload({ config });
  const res = await payload.find({
    collection: 'enquiries',
    where: { token: { equals: token } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  });
  return res.docs[0] as any | undefined;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-neutral-50 px-6 py-16">
      <div className="w-full max-w-lg">{children}</div>
    </main>
  );
}

function Notice({ title, body }: { title: string; body: string }) {
  return (
    <Shell>
      <div className="rounded-sm border border-neutral-200 bg-white p-10 text-center">
        <p className="text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-[#7C8A3F]">
          Zuri Travels
        </p>
        <h1 className="mt-4 text-2xl font-light tracking-tight text-neutral-900">{title}</h1>
        <p className="mt-3 text-sm leading-7 text-neutral-500">{body}</p>
      </div>
    </Shell>
  );
}

export default async function PayPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const booking = await getBooking(token);

  if (!booking) {
    return (
      <Notice
        title="Booking not found"
        body="This payment link is invalid or has expired. Please contact our team if you believe this is a mistake."
      />
    );
  }

  if (booking.status === 'Cancelled') {
    return (
      <Notice
        title="Booking cancelled"
        body="This booking has been cancelled and can no longer be paid. Reach out to us if you'd like to rebook."
      />
    );
  }

  if (booking.status === 'Paid') {
    return (
      <Notice
        title="Payment received — thank you!"
        body={`We've received your payment of ${money(
          booking.amount,
          booking.currency,
        )}. A receipt and your trip details are on their way to your inbox.`}
      />
    );
  }

  if (!booking.amount || booking.amount <= 0 || booking.status !== 'Confirmed') {
    return (
      <Notice
        title="Payment not ready yet"
        body="Your booking is still being finalised by our team. You'll receive an email with a secure payment link as soon as it's confirmed."
      />
    );
  }

  const summary = [booking.destination, booking.tour, booking.tier].filter(Boolean).join(' · ');

  return (
    <Shell>
      <div className="overflow-hidden rounded-sm border border-neutral-200 bg-white">
        <div className="bg-[#7C8A3F] px-8 py-6">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-white/90">
            Zuri Travels · Secure payment
          </p>
        </div>

        <div className="px-8 py-8">
          <h1 className="text-2xl font-light tracking-tight text-neutral-900">
            Complete your booking
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Hi {booking.name?.split(' ')[0] || 'there'}, reserve your place by paying below.
          </p>

          {summary && (
            <div className="mt-6 rounded-sm bg-neutral-50 p-5 ring-1 ring-neutral-200/70">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-neutral-500">
                Your journey
              </p>
              <p className="mt-2 text-base text-neutral-900">{summary}</p>
              {(booking.travellers || booking.dates) && (
                <p className="mt-1 text-sm text-neutral-500">
                  {[booking.travellers, booking.dates].filter(Boolean).join(' · ')}
                </p>
              )}
            </div>
          )}

          <div className="mt-6 flex items-baseline justify-between border-y border-neutral-200 py-5">
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-neutral-500">
              Total due
            </span>
            <span className="text-3xl font-light tracking-tight text-neutral-900">
              {money(booking.amount, booking.currency)}
            </span>
          </div>

          <PaymentOptions token={token} />

          <p className="mt-6 text-center text-xs leading-6 text-neutral-400">
            Payments are processed securely. Your booking is held while you complete payment.
          </p>
        </div>
      </div>
    </Shell>
  );
}
