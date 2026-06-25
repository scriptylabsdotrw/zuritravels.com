import 'server-only';

/* PayPal Orders v2 — create an order (returns the approval URL to redirect to)
   and capture it on return. Client-credentials OAuth, sandbox or live by mode. */

const mode = process.env.PAYPAL_MODE || 'sandbox';
const base =
  mode === 'live' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com';
const clientId = process.env.PAYPAL_CLIENT_ID || '';
const secret = process.env.PAYPAL_CLIENT_SECRET || '';

export const paypalConfigured = () => Boolean(clientId && secret);

async function getToken(): Promise<string> {
  const creds = Buffer.from(`${clientId}:${secret}`).toString('base64');
  const res = await fetch(`${base}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  });
  if (!res.ok) throw new Error(`PayPal token error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.access_token as string;
}

/** Create an order; returns { id, approveUrl } to redirect the payer to. */
export async function createOrder(opts: {
  amount: number;
  currency?: string;
  description?: string;
  returnUrl: string;
  cancelUrl: string;
}): Promise<{ id: string; approveUrl: string }> {
  const token = await getToken();
  const res = await fetch(`${base}/v2/checkout/orders`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: opts.currency || 'USD',
            value: Number(opts.amount).toFixed(2),
          },
          description: opts.description?.slice(0, 127),
        },
      ],
      application_context: {
        brand_name: 'Zuri Travels',
        user_action: 'PAY_NOW',
        return_url: opts.returnUrl,
        cancel_url: opts.cancelUrl,
      },
    }),
  });
  if (!res.ok) throw new Error(`PayPal create order failed ${res.status}: ${await res.text()}`);
  const data = await res.json();
  const approveUrl = (data.links || []).find((l: any) => l.rel === 'approve')?.href;
  if (!approveUrl) throw new Error('PayPal: no approval link returned');
  return { id: data.id, approveUrl };
}

/** Capture an approved order. Returns { ok, reference }. */
export async function captureOrder(
  orderId: string,
): Promise<{ ok: boolean; reference?: string }> {
  const token = await getToken();
  const res = await fetch(`${base}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
  });
  if (!res.ok) return { ok: false };
  const data = await res.json();
  const capture = data?.purchase_units?.[0]?.payments?.captures?.[0];
  return { ok: data.status === 'COMPLETED', reference: capture?.id || data.id };
}
