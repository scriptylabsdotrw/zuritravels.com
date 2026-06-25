import 'server-only';

/* MTN MoMo Collections (Rwanda) — adapted from the project's NestJS service to
   a plain server module. Handles OAuth token caching, request-to-pay, status
   polling, and optional account-name lookup.

   Docs flow:
   1. POST /collection/token/                          → bearer token (Basic auth)
   2. POST /collection/v1_0/requesttopay               → prompt on payer's phone (202)
   3. GET  /collection/v1_0/requesttopay/{ref}         → SUCCESSFUL | FAILED | PENDING
   4. GET  /collection/v1_0/accountholder/...          → payer name (optional) */

const base = process.env.MTN_MOMO_BASE_URL || 'https://proxy.momoapi.mtn.co.rw';
const subKey = process.env.MTN_MOMO_SUBSCRIPTION_KEY || '';
const apiUser = process.env.MTN_MOMO_API_USER || '';
const apiKey = process.env.MTN_MOMO_API_KEY || '';
const env = process.env.MTN_MOMO_ENVIRONMENT || 'mtnrwanda';

export const momoConfigured = () => Boolean(subKey && apiUser && apiKey);

/* Token cached at module scope (survives across requests on a warm server). */
let token: string | null = null;
let tokenExpiry = 0;

/** Normalise a Rwandan number to MSISDN (e.g. 078… → 25078…). */
export function normaliseMsisdn(phone: string) {
  const digits = (phone || '').replace(/\D/g, '');
  if (digits.startsWith('250')) return digits;
  if (digits.startsWith('0')) return `250${digits.slice(1)}`;
  if (digits.length === 9) return `250${digits}`;
  return digits;
}

async function getToken(): Promise<string> {
  if (token && Date.now() < tokenExpiry) return token;
  const creds = Buffer.from(`${apiUser}:${apiKey}`).toString('base64');
  const res = await fetch(`${base}/collection/token/`, {
    method: 'POST',
    // Empty body guarantees a Content-Length: 0 header — the MoMo proxy rejects
    // the request with "411 Length Required" otherwise.
    body: '',
    headers: {
      Authorization: `Basic ${creds}`,
      'Ocp-Apim-Subscription-Key': subKey,
      'Content-Length': '0',
    },
  });
  if (!res.ok) throw new Error(`MoMo token error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  token = data.access_token as string;
  tokenExpiry = Date.now() + ((data.expires_in || 3600) - 60) * 1000; // 60s buffer
  return token;
}

/** Trigger the approve-prompt. Returns the X-Reference-Id used to poll status. */
export async function requestToPay(opts: {
  amount: number;
  currency?: string;
  phone: string;
  note?: string;
}): Promise<string> {
  const ref = globalThis.crypto.randomUUID();
  const phone = normaliseMsisdn(opts.phone);
  const accessToken = await getToken();
  const res = await fetch(`${base}/collection/v1_0/requesttopay`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Reference-Id': ref,
      'X-Target-Environment': env,
      'Ocp-Apim-Subscription-Key': subKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: String(Math.round(opts.amount)),
      currency: opts.currency || 'RWF',
      externalId: ref,
      payer: { partyIdType: 'MSISDN', partyId: phone },
      payerMessage: opts.note || 'Zuri Travels booking',
      payeeNote: opts.note || 'Zuri Travels booking',
    }),
  });
  if (!res.ok) throw new Error(`MoMo request failed ${res.status}: ${await res.text()}`);
  return ref;
}

export async function checkStatus(ref: string): Promise<'SUCCESSFUL' | 'FAILED' | 'PENDING'> {
  const accessToken = await getToken();
  const res = await fetch(`${base}/collection/v1_0/requesttopay/${ref}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'X-Target-Environment': env,
      'Ocp-Apim-Subscription-Key': subKey,
    },
  });
  if (!res.ok) return 'PENDING';
  const data = await res.json();
  if (data.status === 'SUCCESSFUL') return 'SUCCESSFUL';
  if (data.status === 'FAILED') return 'FAILED';
  return 'PENDING';
}

export async function getAccountName(phone: string): Promise<string | null> {
  try {
    const accessToken = await getToken();
    const msisdn = normaliseMsisdn(phone);
    const res = await fetch(
      `${base}/collection/v1_0/accountholder/msisdn/${msisdn}/basicuserinfo`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'X-Target-Environment': env,
          'Ocp-Apim-Subscription-Key': subKey,
        },
      },
    );
    if (!res.ok) return null;
    const d = await res.json();
    return d.name || `${d.given_name || ''} ${d.family_name || ''}`.trim() || null;
  } catch {
    return null;
  }
}
