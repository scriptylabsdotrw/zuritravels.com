import type { CollectionConfig } from 'payload';

const BRAND = '#7C8A3F';

const CURRENCY_SYMBOL: Record<string, string> = {
  USD: '$',
  EUR: '€',
  RWF: 'FRw ',
};

/** Format a money amount for display in emails / pages. */
export function formatMoney(amount?: number | null, currency = 'USD') {
  if (amount == null || Number.isNaN(amount)) return '';
  const sym = CURRENCY_SYMBOL[currency] ?? '';
  return `${sym}${Number(amount).toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
}

const serverUrl = () =>
  process.env.NEXT_PUBLIC_SERVER_URL?.replace(/\/$/, '') || 'http://localhost:3000';

/** Shared email shell so both templates stay visually consistent. */
function shell(bodyHtml: string) {
  return `
  <div style="margin:0;padding:0;background:#f5f5f4;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f4;padding:32px 0;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e7e5e4;border-radius:4px;overflow:hidden;">
          <tr><td style="background:${BRAND};padding:28px 40px;">
            <p style="margin:0;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:18px;font-weight:bold;letter-spacing:1px;">ZURI TRAVELS</p>
          </td></tr>
          <tr><td style="padding:40px;font-family:Arial,Helvetica,sans-serif;">
            ${bodyHtml}
          </td></tr>
          <tr><td style="padding:24px 40px;background:#fafaf9;border-top:1px solid #e7e5e4;font-family:Arial,Helvetica,sans-serif;">
            <p style="margin:0;color:#a3a3a3;font-size:12px;line-height:20px;">
              Sent by Zuri Travels. If you didn't expect this email, you can safely ignore it.
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </div>`;
}

function detailRows(doc: Record<string, any>) {
  const rows: Array<[string, string]> = [
    ['Destination', doc.destination],
    ['Tour', doc.tour],
    ['Tier', doc.tier],
    ['Travellers', doc.travellers],
    ['Preferred dates', doc.dates],
  ].filter(([, v]) => v && String(v).trim()) as Array<[string, string]>;

  const html = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 0;color:#737373;font-size:13px;text-transform:uppercase;letter-spacing:1.5px;width:160px;vertical-align:top;">${label}</td>
          <td style="padding:8px 0;color:#171717;font-size:15px;">${value}</td>
        </tr>`,
    )
    .join('');
  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');
  return { html, text };
}

/** Email sent on first submission — acknowledges the enquiry. */
function buildEnquiryEmail(doc: Record<string, any>) {
  const { html: rowsHtml, text: rowsText } = detailRows(doc);
  const html = shell(`
    <h1 style="margin:0 0 16px;color:#171717;font-size:24px;font-weight:300;">Thank you, ${doc.name || 'traveller'}.</h1>
    <p style="margin:0 0 24px;color:#525252;font-size:15px;line-height:24px;">
      We've received your enquiry and a member of our team will be in touch personally
      within 24 hours to begin designing your journey. Here's a summary of what you sent us:
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid #e7e5e4;border-bottom:1px solid #e7e5e4;margin:0 0 24px;">
      ${rowsHtml || `<tr><td style="padding:16px 0;color:#737373;font-size:14px;">We'll review your request and respond shortly.</td></tr>`}
    </table>
    ${
      doc.notes
        ? `<p style="margin:0 0 8px;color:#737373;font-size:13px;text-transform:uppercase;letter-spacing:1.5px;">Your notes</p>
           <p style="margin:0 0 24px;color:#404040;font-size:15px;line-height:24px;">${doc.notes}</p>`
        : ''
    }
    <p style="margin:0;color:#525252;font-size:15px;line-height:24px;">
      With warm regards,<br/><strong style="color:#171717;">The Zuri Travels Team</strong>
    </p>
  `);
  const text = [
    `Thank you, ${doc.name || 'traveller'}.`,
    '',
    "We've received your enquiry and a member of our team will be in touch personally within 24 hours.",
    '',
    rowsText,
    doc.notes ? `\nYour notes: ${doc.notes}` : '',
    '',
    'With warm regards,',
    'The Zuri Travels Team',
  ]
    .filter((l) => l !== undefined)
    .join('\n');
  return { html, text };
}

/** Email sent when a booking is confirmed — includes the secure payment link. */
function buildPaymentEmail(doc: Record<string, any>) {
  const { html: rowsHtml, text: rowsText } = detailRows(doc);
  const money = formatMoney(doc.amount, doc.currency);
  const payUrl = `${serverUrl()}/pay/${doc.token}`;
  const html = shell(`
    <p style="margin:0 0 6px;color:${BRAND};font-size:12px;text-transform:uppercase;letter-spacing:2px;font-weight:bold;">Booking confirmed</p>
    <h1 style="margin:0 0 16px;color:#171717;font-size:24px;font-weight:300;">Your journey is ready, ${doc.name || 'traveller'}.</h1>
    <p style="margin:0 0 24px;color:#525252;font-size:15px;line-height:24px;">
      We've confirmed your booking and prepared your secure payment. Reserve your place
      by completing payment below — you can pay by card, PayPal, or mobile money.
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-top:1px solid #e7e5e4;border-bottom:1px solid #e7e5e4;margin:0 0 24px;">
      ${rowsHtml}
      <tr>
        <td style="padding:14px 0 8px;color:#737373;font-size:13px;text-transform:uppercase;letter-spacing:1.5px;vertical-align:top;">Total due</td>
        <td style="padding:14px 0 8px;color:#171717;font-size:22px;font-weight:bold;">${money}</td>
      </tr>
    </table>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      <tr><td style="border-radius:999px;background:${BRAND};">
        <a href="${payUrl}" style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:bold;text-decoration:none;font-family:Arial,Helvetica,sans-serif;">
          Pay ${money} securely →
        </a>
      </td></tr>
    </table>
    <p style="margin:0 0 24px;color:#a3a3a3;font-size:13px;line-height:20px;">
      Or copy this link into your browser:<br/>
      <a href="${payUrl}" style="color:${BRAND};">${payUrl}</a>
    </p>
    <p style="margin:0;color:#525252;font-size:15px;line-height:24px;">
      With warm regards,<br/><strong style="color:#171717;">The Zuri Travels Team</strong>
    </p>
  `);
  const text = [
    `Your journey is ready, ${doc.name || 'traveller'}.`,
    '',
    "We've confirmed your booking. Complete your secure payment to reserve your place.",
    '',
    rowsText,
    `Total due: ${money}`,
    '',
    `Pay securely: ${payUrl}`,
    '',
    'With warm regards,',
    'The Zuri Travels Team',
  ].join('\n');
  return { html, text };
}

/** Email sent when payment is received — a simple receipt. */
function buildReceiptEmail(doc: Record<string, any>) {
  const money = formatMoney(doc.amount, doc.currency);
  const summary = [doc.destination, doc.tour, doc.tier].filter(Boolean).join(' · ');
  const html = shell(`
    <p style="margin:0 0 6px;color:${BRAND};font-size:12px;text-transform:uppercase;letter-spacing:2px;font-weight:bold;">Payment received</p>
    <h1 style="margin:0 0 16px;color:#171717;font-size:24px;font-weight:300;">Thank you, ${doc.name || 'traveller'}!</h1>
    <p style="margin:0 0 24px;color:#525252;font-size:15px;line-height:24px;">
      We've received your payment of <strong>${money}</strong>${summary ? ` for ${summary}` : ''}.
      Your place is reserved — our team will be in touch shortly with your full trip details.
    </p>
    <p style="margin:0;color:#525252;font-size:15px;line-height:24px;">
      With warm regards,<br/><strong style="color:#171717;">The Zuri Travels Team</strong>
    </p>
  `);
  const text = [
    `Thank you, ${doc.name || 'traveller'}!`,
    '',
    `We've received your payment of ${money}${summary ? ` for ${summary}` : ''}.`,
    'Your place is reserved — our team will be in touch shortly with your full trip details.',
    '',
    'With warm regards,',
    'The Zuri Travels Team',
  ].join('\n');
  return { html, text };
}

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  labels: { singular: 'Booking', plural: 'Bookings' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'destination', 'amount', 'status', 'createdAt'],
    description:
      'Tour bookings from the site. Set the price, then confirm to email the customer a secure payment link.',
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Generate a secure, unguessable token for the public payment link.
        if (operation === 'create' && !data.token) {
          data.token = globalThis.crypto.randomUUID().replace(/-/g, '');
        }
        return data;
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, operation, req }) => {
        if (!req.payload.email) return doc;

        try {
          // 1) New submission → acknowledge the enquiry.
          if (operation === 'create' && doc?.email) {
            const { html, text } = buildEnquiryEmail(doc);
            await req.payload.sendEmail({
              to: doc.email,
              subject: 'We received your enquiry — Zuri Travels',
              html,
              text,
            });
          }

          // 2) Status transitioned INTO "Confirmed" with a price → send payment link.
          const becameConfirmed =
            operation === 'update' &&
            doc?.status === 'Confirmed' &&
            previousDoc?.status !== 'Confirmed';

          if (becameConfirmed && doc?.email) {
            if (!doc.amount || Number(doc.amount) <= 0) {
              req.payload.logger.warn(
                `Booking #${doc.id} confirmed without an amount — payment email not sent.`,
              );
            } else {
              const { html, text } = buildPaymentEmail(doc);
              await req.payload.sendEmail({
                to: doc.email,
                subject: 'Your booking is confirmed — complete payment',
                html,
                text,
              });
            }
          }

          // 3) Status transitioned INTO "Paid" → send a receipt.
          const becamePaid =
            operation === 'update' && doc?.status === 'Paid' && previousDoc?.status !== 'Paid';
          if (becamePaid && doc?.email) {
            const { html, text } = buildReceiptEmail(doc);
            await req.payload.sendEmail({
              to: doc.email,
              subject: 'Payment received — Zuri Travels',
              html,
              text,
            });
          }
        } catch (err) {
          // Never let a mail failure break the save.
          req.payload.logger.error(
            `Enquiry email failed for ${doc?.email}: ${(err as Error).message}`,
          );
        }
        return doc;
      },
    ],
  },
  fields: [
    {
      name: 'summaryPanel',
      type: 'ui',
      admin: {
        components: {
          Field: '/src/components/EnquiryPanel#default',
        },
      },
    },
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'travellers', type: 'text' },
    { name: 'dates', type: 'text' },
    { name: 'notes', type: 'textarea' },
    {
      type: 'row',
      fields: [
        { name: 'destination', type: 'text', admin: { width: '33%' } },
        { name: 'tour', type: 'text', admin: { width: '33%' } },
        { name: 'tier', type: 'text', admin: { width: '33%' } },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'New',
      options: [
        { label: 'New', value: 'New' },
        { label: 'In progress', value: 'In progress' },
        { label: 'Confirmed', value: 'Confirmed' },
        { label: 'Paid', value: 'Paid' },
        { label: 'Cancelled', value: 'Cancelled' },
      ],
    },
    {
      label: 'Pricing & payment',
      type: 'collapsible',
      admin: {
        description:
          'Set the booking value, then move status to "Confirmed" (or use the panel button) to email the payment link.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'amount',
              type: 'number',
              min: 0,
              admin: { width: '50%', description: 'Total booking value to charge the customer.' },
            },
            {
              name: 'currency',
              type: 'select',
              defaultValue: 'USD',
              options: [
                { label: 'USD ($)', value: 'USD' },
                { label: 'RWF (FRw)', value: 'RWF' },
                { label: 'EUR (€)', value: 'EUR' },
              ],
              admin: { width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'paymentMethod',
              type: 'select',
              admin: { width: '50%', description: 'Recorded automatically when the customer pays.' },
              options: [
                { label: 'Stripe (card)', value: 'Stripe' },
                { label: 'PayPal', value: 'PayPal' },
                { label: 'Mobile Money', value: 'Mobile Money' },
              ],
            },
            {
              name: 'paidAt',
              type: 'date',
              admin: { width: '50%', readOnly: true },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'paymentReference',
              type: 'text',
              admin: { width: '50%', description: 'Transaction / reference id from the payment provider.' },
            },
            {
              name: 'payerPhone',
              type: 'text',
              admin: { width: '50%', description: 'Mobile money number used to pay (if applicable).' },
            },
          ],
        },
        {
          name: 'token',
          type: 'text',
          unique: true,
          index: true,
          admin: {
            readOnly: true,
            description: 'Secure token used in the public payment link /pay/[token].',
          },
        },
      ],
    },
  ],
};
