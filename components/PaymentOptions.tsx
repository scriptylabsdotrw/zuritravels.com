'use client';

/* Payment method picker on /pay/[token].
   - Mobile Money: collects a phone number, triggers the MoMo prompt, then polls
     /pay/[token]/status until the payer approves (or it fails/times out).
   - PayPal / Stripe: redirect to the provider's checkout when configured. */

import { useCallback, useRef, useState } from 'react';

const METHODS = [
  { key: 'Mobile Money', label: 'Mobile Money', hint: 'MTN MoMo · approve on your phone' },
  { key: 'PayPal', label: 'PayPal', hint: 'Pay with PayPal or a card' },
  { key: 'Stripe', label: 'Card', hint: 'Visa · Mastercard · Amex' },
] as const;

type Mode = 'idle' | 'momoPhone' | 'processing' | 'polling' | 'done' | 'failed';

export default function PaymentOptions({ token }: { token: string }) {
  const [mode, setMode] = useState<Mode>('idle');
  const [phone, setPhone] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const pollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reset = () => {
    if (pollTimer.current) clearTimeout(pollTimer.current);
    setMode('idle');
    setBusy(null);
  };

  /* Poll the status endpoint until resolved or timed out (~2 min). */
  const poll = useCallback(
    (attempt = 0) => {
      pollTimer.current = setTimeout(async () => {
        try {
          const r = await fetch(`/pay/${token}/status`, { cache: 'no-store' });
          const d = await r.json().catch(() => ({}));
          if (d.status === 'SUCCESSFUL') {
            setMode('done');
            setMsg('Payment received! Redirecting…');
            setTimeout(() => window.location.reload(), 1800);
            return;
          }
          if (d.status === 'FAILED') {
            setMode('failed');
            setMsg('The payment was declined or cancelled. Please try again.');
            return;
          }
        } catch {
          /* transient — keep polling */
        }
        if (attempt >= 28) {
          setMode('failed');
          setMsg("We didn't get a confirmation in time. If you approved it, refresh in a moment.");
          return;
        }
        poll(attempt + 1);
      }, 4000);
    },
    [token],
  );

  const startMomo = async () => {
    const digits = phone.replace(/\D/g, '');
    if (digits.length < 9) {
      setMsg('Enter a valid MTN mobile number.');
      return;
    }
    setMode('processing');
    setMsg(null);
    try {
      const res = await fetch(`/pay/${token}/charge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: 'Mobile Money', phone }),
      });
      const d = await res.json().catch(() => ({}));
      if (d.pending) {
        setMode('polling');
        setMsg(
          d.payerName
            ? `Prompt sent to ${d.payerName}. Approve it on your phone to complete payment.`
            : 'Check your phone and approve the MTN MoMo prompt to complete payment.',
        );
        poll();
        return;
      }
      setMode('failed');
      setMsg(d.message || "We couldn't start the mobile money payment. Please try again.");
    } catch {
      setMode('failed');
      setMsg('Something went wrong. Please try again.');
    }
  };

  const payRedirect = async (method: string) => {
    setBusy(method);
    setMsg(null);
    try {
      const res = await fetch(`/pay/${token}/charge`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method }),
      });
      const d = await res.json().catch(() => ({}));
      if (d.url) {
        window.location.href = d.url as string;
        return;
      }
      setMsg(d.message || `${method} isn't available right now. Please try another method.`);
    } catch {
      setMsg('Something went wrong. Please try again.');
    } finally {
      setBusy(null);
    }
  };

  const onSelect = (key: string) => {
    if (key === 'Mobile Money') {
      setMsg(null);
      setMode('momoPhone');
    } else {
      payRedirect(key);
    }
  };

  // ── Processing / polling / done states ──
  if (mode === 'processing' || mode === 'polling' || mode === 'done') {
    return (
      <div className="mt-6 rounded-sm border border-neutral-200 bg-white p-6 text-center">
        <div className="mx-auto mb-4 h-8 w-8">
          {mode === 'done' ? (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#7C8A3F] text-white">✓</div>
          ) : (
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-[#7C8A3F]" />
          )}
        </div>
        <p className="text-sm leading-6 text-neutral-700">{msg}</p>
        {mode === 'polling' && (
          <button type="button" onClick={reset} className="mt-4 text-xs text-neutral-400 underline">
            Cancel
          </button>
        )}
      </div>
    );
  }

  // ── MoMo phone entry ──
  if (mode === 'momoPhone') {
    return (
      <div className="mt-6">
        <label className="block">
          <span className="text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-neutral-500">
            MTN Mobile Money number
          </span>
          <input
            type="tel"
            inputMode="tel"
            autoFocus
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="078 123 4567"
            className="mt-2 w-full rounded-sm border border-neutral-200 bg-neutral-50/50 px-5 py-4 text-base text-neutral-900 outline-none transition focus:border-[#7C8A3F] focus:bg-white focus:ring-2 focus:ring-[#7C8A3F]/15"
          />
        </label>
        <div className="mt-3 flex gap-3">
          <button
            type="button"
            onClick={startMomo}
            className="flex-1 rounded-full bg-[#7C8A3F] px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-[#97a65a]"
          >
            Send payment prompt →
          </button>
          <button type="button" onClick={reset} className="rounded-full border border-neutral-200 px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-neutral-500 transition hover:border-neutral-400">
            Back
          </button>
        </div>
        {msg && <p className="mt-3 text-sm text-red-600">{msg}</p>}
      </div>
    );
  }

  // ── Idle: method list ──
  return (
    <div className="mt-6">
      <p className="mb-3 text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-neutral-500">
        Choose how to pay
      </p>
      <div className="grid gap-3">
        {METHODS.map((m) => (
          <button
            key={m.key}
            type="button"
            disabled={busy !== null}
            onClick={() => onSelect(m.key)}
            className="group flex items-center justify-between rounded-sm border border-neutral-200 bg-white px-5 py-4 text-left transition hover:border-[#7C8A3F] hover:bg-[#7C8A3F]/[0.03] disabled:opacity-50"
          >
            <span>
              <span className="block text-sm font-medium text-neutral-900">{m.label}</span>
              <span className="block text-xs text-neutral-500">{m.hint}</span>
            </span>
            <span className="text-sm text-neutral-300 transition group-hover:text-[#7C8A3F]">
              {busy === m.key ? '…' : '→'}
            </span>
          </button>
        ))}
      </div>
      {msg && (
        <p className="mt-4 rounded-sm bg-[#7C8A3F]/[0.06] px-4 py-3 text-center text-sm leading-6 text-[#5d6730]">
          {msg}
        </p>
      )}
    </div>
  );
}
