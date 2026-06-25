/* Zuri Travels — Admin dashboard.
   A business view: bookings + money (pipeline, confirmed, collected revenue),
   charts, and the most recent bookings. Rendered above the default Payload
   dashboard via beforeDashboard. */

import { getPayload } from 'payload';
import config from '@payload-config';
import Link from 'next/link';
import DashboardCharts from './DashboardCharts';

const STATUS_COLORS: Record<string, string> = {
  New: '#7c8a3f',
  'In progress': '#3b82f6',
  Confirmed: '#d97706',
  Paid: '#22c55e',
  Cancelled: '#a3a3a3',
};
const STATUS_ORDER = ['New', 'In progress', 'Confirmed', 'Paid', 'Cancelled'];
const CURRENCY_SYMBOL: Record<string, string> = { USD: '$', EUR: '€', RWF: 'FRw ' };

const since = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
};

export default async function Dashboard() {
  const payload = await getPayload({ config });

  const all = await payload.find({
    collection: 'enquiries',
    limit: 2000,
    depth: 0,
    sort: '-createdAt',
  });
  const docs = all.docs as any[];

  // ── Aggregates ──────────────────────────────────────────
  const num = (v: any) => (typeof v === 'number' && !Number.isNaN(v) ? v : 0);
  const countBy = (s: string) => docs.filter((d) => (d.status || 'New') === s).length;
  const sumWhere = (pred: (d: any) => boolean) =>
    docs.filter(pred).reduce((acc, d) => acc + num(d.amount), 0);

  const total = docs.length;
  const newCount = countBy('New');
  const confirmedCount = countBy('Confirmed');
  const paidCount = countBy('Paid');

  const collected = sumWhere((d) => d.status === 'Paid');
  const confirmedValue = sumWhere((d) => d.status === 'Confirmed');
  const pipeline = sumWhere((d) => ['New', 'In progress', 'Confirmed'].includes(d.status || 'New'));
  const priced = docs.filter((d) => num(d.amount) > 0);
  const avgValue = priced.length
    ? Math.round(priced.reduce((a, d) => a + num(d.amount), 0) / priced.length)
    : 0;
  const activeTotal = total - countBy('Cancelled');
  const conversion = activeTotal > 0 ? Math.round((paidCount / activeTotal) * 100) : 0;

  // Dominant currency (fall back to USD).
  const curCount = priced.reduce<Record<string, number>>((acc, d) => {
    const c = d.currency || 'USD';
    acc[c] = (acc[c] || 0) + 1;
    return acc;
  }, {});
  const currency =
    Object.entries(curCount).sort((a, b) => b[1] - a[1])[0]?.[0] || 'USD';
  const sym = CURRENCY_SYMBOL[currency] ?? '';
  const fmtMoney = (n: number) => `${sym}${Math.round(n).toLocaleString('en-US')}`;

  // Status donut data.
  const slices = STATUS_ORDER.map((label) => ({
    label,
    value: countBy(label),
    color: STATUS_COLORS[label],
  })).filter((s) => s.value > 0);

  // Revenue collected per month (last 6 months, by paidAt or createdAt).
  const now = new Date();
  const revenue = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const key = `${d.getFullYear()}-${d.getMonth()}`;
    const value = docs
      .filter((e) => e.status === 'Paid')
      .filter((e) => {
        const c = new Date(e.paidAt || e.createdAt);
        return `${c.getFullYear()}-${c.getMonth()}` === key;
      })
      .reduce((a, e) => a + num(e.amount), 0);
    return { label: d.toLocaleDateString('en-US', { month: 'short' }), value };
  });

  // Top destinations by total priced value.
  const destValue = priced.reduce<Record<string, number>>((acc, d) => {
    if (d.destination) acc[d.destination] = (acc[d.destination] || 0) + num(d.amount);
    return acc;
  }, {});
  const destinationsTop = Object.entries(destValue)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const recent = docs.slice(0, 6);

  // ── KPI cards ───────────────────────────────────────────
  const kpis: {
    label: string;
    value: string;
    href: string;
    sub?: string;
    accent?: 'brand';
  }[] = [
    { label: 'Total bookings', value: String(total), href: '/admin/collections/enquiries' },
    {
      label: 'New',
      value: String(newCount),
      href: '/admin/collections/enquiries?where[status][equals]=New',
      sub: newCount > 0 ? 'need pricing' : 'all handled',
      accent: newCount > 0 ? 'brand' : undefined,
    },
    {
      label: 'Confirmed',
      value: String(confirmedCount),
      href: '/admin/collections/enquiries?where[status][equals]=Confirmed',
      sub: confirmedValue > 0 ? `${fmtMoney(confirmedValue)} awaiting` : 'awaiting payment',
    },
    {
      label: 'Collected',
      value: fmtMoney(collected),
      href: '/admin/collections/enquiries?where[status][equals]=Paid',
      sub: `${paidCount} paid`,
      accent: 'brand',
    },
    { label: 'Pipeline value', value: fmtMoney(pipeline), href: '/admin/collections/enquiries', sub: 'open bookings' },
    { label: 'Avg booking', value: avgValue ? fmtMoney(avgValue) : '—', href: '/admin/collections/enquiries', sub: `${conversion}% conversion` },
  ];

  return (
    <div className="soulx-dashboard">
      {/* Hero */}
      <header className="soulx-dashboard__hero">
        <div>
          <p className="soulx-dashboard__eyebrow">
            <span className="soulx-dashboard__dot" aria-hidden="true" />
            Studio Admin
          </p>
          <h1 className="soulx-dashboard__title">
            Bookings &amp; revenue at <span className="soulx-dashboard__brandword">Zuri Travels</span>.
          </h1>
          <p className="soulx-dashboard__lede">
            Price new bookings, confirm to send a secure payment link, and track money as it
            moves from enquiry to paid.
          </p>
        </div>

        <Link
          href="/admin/collections/enquiries?where[status][equals]=New"
          className="soulx-dashboard__hero-cta"
        >
          <span className="soulx-dashboard__hero-cta-eyebrow">
            {newCount > 0 ? `${newCount} new ${newCount === 1 ? 'booking' : 'bookings'}` : 'Inbox'}
          </span>
          <span className="soulx-dashboard__hero-cta-label">Review bookings →</span>
        </Link>
      </header>

      {/* KPIs */}
      <section className="soulx-dashboard__section">
        <header className="soulx-dashboard__section-header">
          <span className="soulx-dashboard__rule" aria-hidden="true" />
          <span className="soulx-dashboard__section-label">Index · 01 — Money at a glance</span>
        </header>
        <ul className="soulx-dashboard__stats">
          {kpis.map((s) => (
            <li key={s.label}>
              <Link
                href={s.href}
                className={`soulx-dashboard__stat${s.accent === 'brand' ? ' soulx-dashboard__stat--brand' : ''}`}
              >
                <span className="soulx-dashboard__stat-value">{s.value}</span>
                <span className="soulx-dashboard__stat-label">{s.label}</span>
                {s.sub && <span className="soulx-dashboard__stat-sub">{s.sub}</span>}
                <span className="soulx-dashboard__stat-arrow" aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Charts */}
      <section className="soulx-dashboard__section">
        <header className="soulx-dashboard__section-header">
          <span className="soulx-dashboard__rule" aria-hidden="true" />
          <span className="soulx-dashboard__section-label">Index · 02 — Insights</span>
        </header>
        {total === 0 ? (
          <div className="soulx-dashboard__empty">Charts appear here once bookings start arriving.</div>
        ) : (
          <DashboardCharts
            slices={slices}
            total={total}
            revenue={revenue}
            destinations={destinationsTop}
            currencySymbol={sym}
          />
        )}
      </section>

      {/* Recent bookings */}
      <section className="soulx-dashboard__section">
        <header className="soulx-dashboard__section-header">
          <span className="soulx-dashboard__rule" aria-hidden="true" />
          <span className="soulx-dashboard__section-label">Index · 03 — Recent bookings</span>
          <Link href="/admin/collections/enquiries" className="soulx-dashboard__section-link">
            All bookings →
          </Link>
        </header>

        {recent.length === 0 ? (
          <div className="soulx-dashboard__empty">
            No bookings yet — the tour booking form is wired up and will land here.
          </div>
        ) : (
          <ul className="soulx-dashboard__enquiries">
            {recent.map((e: any) => (
              <li key={e.id}>
                <Link href={`/admin/collections/enquiries/${e.id}`} className="soulx-dashboard__enquiry">
                  <div className="soulx-dashboard__enquiry-main">
                    <p className="soulx-dashboard__enquiry-name">{e.name}</p>
                    <p className="soulx-dashboard__enquiry-meta">
                      {[e.destination, e.tour, e.tier].filter(Boolean).join(' · ') || 'No destination picked'}
                    </p>
                  </div>
                  <div className="soulx-dashboard__enquiry-side">
                    {num(e.amount) > 0 && (
                      <span className="soulx-dashboard__amount">
                        {(CURRENCY_SYMBOL[e.currency || 'USD'] ?? '')}
                        {Math.round(num(e.amount)).toLocaleString('en-US')}
                      </span>
                    )}
                    <span
                      className={`soulx-dashboard__pill soulx-dashboard__pill--${(e.status ?? 'new')
                        .toLowerCase()
                        .replace(/\s+/g, '-')}`}
                    >
                      {e.status ?? 'New'}
                    </span>
                    <span className="soulx-dashboard__enquiry-time">{since(e.createdAt)}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
