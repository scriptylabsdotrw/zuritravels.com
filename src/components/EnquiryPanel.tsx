'use client';

/* Branded booking panel at the top of the Bookings (enquiries) edit view.
   Lets staff set the price and confirm the booking — which saves the record
   and emails the customer a secure payment link. Reads live form state so it
   stays in sync. Registered as the Field component of a `ui` field. */

import { useField, useFormFields, useDocumentInfo } from '@payloadcms/ui';
import { useMemo, useState } from 'react';

const STATUSES = ['New', 'In progress', 'Confirmed', 'Paid', 'Cancelled'] as const;

const CURRENCY_SYMBOL: Record<string, string> = { USD: '$', EUR: '€', RWF: 'FRw ' };

const initials = (name?: string) =>
  (name || '?')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('') || '?';

const since = (iso?: string) => {
  if (!iso) return '';
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d}d ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const money = (amount?: number | null, currency = 'USD') =>
  amount == null || Number.isNaN(amount)
    ? ''
    : `${CURRENCY_SYMBOL[currency] ?? ''}${Number(amount).toLocaleString('en-US', {
        maximumFractionDigits: 2,
      })}`;

export default function EnquiryPanel() {
  const { id } = useDocumentInfo();
  const [copied, setCopied] = useState(false);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  const { value: status, setValue: setStatus } = useField<string>({ path: 'status' });
  const { value: amount, setValue: setAmount } = useField<number>({ path: 'amount' });
  const { value: currency, setValue: setCurrency } = useField<string>({ path: 'currency' });

  const data = useFormFields(([fields]) => ({
    name: (fields.name?.value as string) || '',
    email: (fields.email?.value as string) || '',
    travellers: (fields.travellers?.value as string) || '',
    dates: (fields.dates?.value as string) || '',
    notes: (fields.notes?.value as string) || '',
    destination: (fields.destination?.value as string) || '',
    tour: (fields.tour?.value as string) || '',
    tier: (fields.tier?.value as string) || '',
    createdAt: (fields.createdAt?.value as string) || '',
    token: (fields.token?.value as string) || '',
    paymentMethod: (fields.paymentMethod?.value as string) || '',
    paidAt: (fields.paidAt?.value as string) || '',
    paymentReference: (fields.paymentReference?.value as string) || '',
  }));

  const summary = useMemo(
    () => [data.destination, data.tour, data.tier].filter(Boolean).join('  ·  '),
    [data.destination, data.tour, data.tier],
  );

  const details = [
    { label: 'Travellers', value: data.travellers },
    { label: 'Preferred dates', value: data.dates },
    { label: 'Destination', value: data.destination },
    { label: 'Tour', value: data.tour },
    { label: 'Tier', value: data.tier },
  ].filter((d) => d.value);

  const cur = currency || 'USD';
  const statusKey = (status || 'New').toLowerCase().replace(/\s+/g, '-');
  const isPaid = status === 'Paid';
  const isConfirmed = status === 'Confirmed';
  const payUrl = data.token ? `/pay/${data.token}` : '';

  const mailto =
    data.email &&
    `mailto:${data.email}?subject=${encodeURIComponent('Re: your Zuri Travels booking')}&body=${encodeURIComponent(
      `Hi ${data.name || 'there'},\n\n`,
    )}`;

  const copy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setMsg({ kind: 'ok', text: `${label} copied` });
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard blocked */
    }
  };

  /* Persist amount + status and trigger the payment-link email (server hook). */
  const confirmAndSend = async () => {
    if (!id) {
      setMsg({ kind: 'err', text: 'Save the booking once before confirming.' });
      return;
    }
    if (!amount || Number(amount) <= 0) {
      setMsg({ kind: 'err', text: 'Enter a booking amount first.' });
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status: 'Confirmed', amount: Number(amount), currency: cur }),
      });
      if (!res.ok) throw new Error(`Save failed (${res.status})`);
      setStatus('Confirmed');
      setMsg({ kind: 'ok', text: 'Confirmed — payment link emailed to the customer.' });
    } catch (e) {
      setMsg({ kind: 'err', text: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="enq-panel">
      {/* Header */}
      <div className="enq-panel__head">
        <div className="enq-panel__id">
          <span className="enq-panel__avatar" aria-hidden="true">
            {initials(data.name)}
          </span>
          <div>
            <h2 className="enq-panel__name">{data.name || 'New booking'}</h2>
            <p className="enq-panel__sub">
              {id ? `Booking #${id}` : 'Unsaved booking'}
              {data.createdAt ? ` · received ${since(data.createdAt)}` : ''}
            </p>
          </div>
        </div>
        <span className={`enq-panel__status enq-panel__status--${statusKey}`}>{status || 'New'}</span>
      </div>

      {summary && <p className="enq-panel__summary">{summary}</p>}

      {/* Contact actions */}
      <div className="enq-panel__actions">
        {data.email && (
          <a className="enq-panel__btn" href={mailto || undefined}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            Email
          </a>
        )}
        {data.email && (
          <button type="button" className="enq-panel__btn" onClick={() => copy(data.email, 'Email')}>
            {data.email}
          </button>
        )}
        {payUrl && (isConfirmed || isPaid) && (
          <button
            type="button"
            className="enq-panel__btn"
            onClick={() => copy(`${window.location.origin}${payUrl}`, 'Payment link')}
          >
            {copied ? 'Copied!' : 'Copy payment link'}
          </button>
        )}
      </div>

      {/* Detail grid */}
      {details.length > 0 && (
        <dl className="enq-panel__grid">
          {details.map((d) => (
            <div key={d.label} className="enq-panel__cell">
              <dt>{d.label}</dt>
              <dd>{d.value}</dd>
            </div>
          ))}
        </dl>
      )}

      {data.notes && (
        <div className="enq-panel__notes">
          <span className="enq-panel__notes-label">Notes from traveller</span>
          <p>{data.notes}</p>
        </div>
      )}

      {/* ── Money / payment box ── */}
      <div className="enq-panel__pay">
        <div className="enq-panel__pay-row">
          <label className="enq-panel__money">
            <span className="enq-panel__pay-label">Booking value</span>
            <div className="enq-panel__money-input">
              <select
                value={cur}
                onChange={(e) => setCurrency(e.target.value)}
                className="enq-panel__currency"
                aria-label="Currency"
              >
                <option value="USD">$ USD</option>
                <option value="RWF">FRw RWF</option>
                <option value="EUR">€ EUR</option>
              </select>
              <input
                type="number"
                min={0}
                step="any"
                value={amount ?? ''}
                onChange={(e) => setAmount(e.target.value === '' ? undefined : Number(e.target.value))}
                placeholder="0.00"
                className="enq-panel__amount"
              />
            </div>
          </label>

          {isPaid ? (
            <div className="enq-panel__paid">
              <span className="enq-panel__paid-badge">Paid · {money(amount, cur)}</span>
              <span className="enq-panel__paid-meta">
                {[data.paymentMethod, data.paidAt && `on ${since(data.paidAt)}`]
                  .filter(Boolean)
                  .join(' · ')}
                {data.paymentReference ? ` · ${data.paymentReference}` : ''}
              </span>
            </div>
          ) : (
            <button
              type="button"
              className="enq-panel__btn enq-panel__btn--primary enq-panel__confirm"
              onClick={confirmAndSend}
              disabled={busy}
            >
              {busy
                ? 'Sending…'
                : isConfirmed
                  ? `Resend payment link · ${money(amount, cur) || '—'}`
                  : `Confirm & send payment link${money(amount, cur) ? ` · ${money(amount, cur)}` : ''}`}
            </button>
          )}
        </div>
        {msg && (
          <p className={`enq-panel__msg enq-panel__msg--${msg.kind}`}>{msg.text}</p>
        )}
      </div>

      {/* Status quick-set */}
      <div className="enq-panel__statusbar">
        <span className="enq-panel__statusbar-label">Set status</span>
        <div className="enq-panel__statusbtns">
          {STATUSES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={`enq-panel__chip${(status || 'New') === s ? ' enq-panel__chip--active' : ''}`}
            >
              {s}
            </button>
          ))}
        </div>
        <span className="enq-panel__hint">Remember to save</span>
      </div>
    </div>
  );
}
