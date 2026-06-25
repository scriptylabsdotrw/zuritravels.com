/* Lightweight, dependency-free SVG charts for the admin dashboard.
   Presentational — all data is computed in Dashboard.tsx and passed in. */

type Slice = { label: string; value: number; color: string };
type Bar = { label: string; value: number };

const compactMoney = (n: number, sym: string) => {
  if (n >= 1_000_000) return `${sym}${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${sym}${(n / 1_000).toFixed(1)}k`;
  return `${sym}${Math.round(n).toLocaleString('en-US')}`;
};

/* ── Donut: bookings by status ──────────────────────────── */
function StatusDonut({ slices, total }: { slices: Slice[]; total: number }) {
  const r = 56;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="soulx-chart soulx-chart--donut">
      <div className="soulx-chart__head">
        <span className="soulx-chart__title">Bookings by status</span>
      </div>
      <div className="soulx-donut">
        <svg viewBox="0 0 140 140" className="soulx-donut__svg" role="img" aria-label="Bookings by status">
          <circle cx="70" cy="70" r={r} className="soulx-donut__track" />
          {total > 0 &&
            slices.map((s) => {
              const len = (s.value / total) * c;
              const seg = (
                <circle
                  key={s.label}
                  cx="70"
                  cy="70"
                  r={r}
                  className="soulx-donut__seg"
                  stroke={s.color}
                  strokeDasharray={`${len} ${c - len}`}
                  strokeDashoffset={-offset}
                />
              );
              offset += len;
              return seg;
            })}
          <text x="70" y="64" className="soulx-donut__total">
            {total.toLocaleString('en-US')}
          </text>
          <text x="70" y="82" className="soulx-donut__caption">
            bookings
          </text>
        </svg>
        <ul className="soulx-legend">
          {slices.map((s) => (
            <li key={s.label}>
              <span className="soulx-legend__dot" style={{ background: s.color }} aria-hidden="true" />
              <span className="soulx-legend__label">{s.label}</span>
              <span className="soulx-legend__value">{s.value}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── Column chart: revenue collected per month ──────────── */
function RevenueBars({ bars, sym }: { bars: Bar[]; sym: string }) {
  const max = Math.max(1, ...bars.map((b) => b.value));
  return (
    <div className="soulx-chart soulx-chart--trend">
      <div className="soulx-chart__head">
        <span className="soulx-chart__title">Revenue collected</span>
        <span className="soulx-chart__hint">last 6 months</span>
      </div>
      <div className="soulx-bars">
        {bars.map((b) => (
          <div key={b.label} className="soulx-bars__col">
            <div className="soulx-bars__track">
              <div
                className="soulx-bars__fill"
                style={{ height: `${(b.value / max) * 100}%` }}
                title={compactMoney(b.value, sym)}
              >
                {b.value > 0 && <span className="soulx-bars__value">{compactMoney(b.value, sym)}</span>}
              </div>
            </div>
            <span className="soulx-bars__label">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Horizontal bars: top destinations by booking value ── */
function TopList({ bars, sym }: { bars: Bar[]; sym: string }) {
  const max = Math.max(1, ...bars.map((b) => b.value));
  return (
    <div className="soulx-chart soulx-chart--top">
      <div className="soulx-chart__head">
        <span className="soulx-chart__title">Top destinations by value</span>
      </div>
      {bars.length === 0 ? (
        <p className="soulx-chart__empty">No priced bookings yet.</p>
      ) : (
        <ul className="soulx-hbars">
          {bars.map((b) => (
            <li key={b.label} className="soulx-hbars__row">
              <span className="soulx-hbars__label">{b.label}</span>
              <span className="soulx-hbars__track">
                <span className="soulx-hbars__fill" style={{ width: `${(b.value / max) * 100}%` }} />
              </span>
              <span className="soulx-hbars__value">{compactMoney(b.value, sym)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function DashboardCharts({
  slices,
  total,
  revenue,
  destinations,
  currencySymbol,
}: {
  slices: Slice[];
  total: number;
  revenue: Bar[];
  destinations: Bar[];
  currencySymbol: string;
}) {
  return (
    <div className="soulx-charts">
      <StatusDonut slices={slices} total={total} />
      <RevenueBars bars={revenue} sym={currencySymbol} />
      <TopList bars={destinations} sym={currencySymbol} />
    </div>
  );
}
