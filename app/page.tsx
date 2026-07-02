import { SectionCard } from '@/components/section-card';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

const features = [
  'Portfolio Builder with lump sum and SIP workflows',
  'Historical date range selection and fund allocation',
  'Advanced analytics with CAGR, XIRR, drawdown and risk metrics',
  'Responsive charts with Recharts and animation polish'
];

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ color: 'var(--text)' }}>
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4 rounded-[2rem] p-8 shadow-glass" style={{ border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text)' }}>
              <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--brand-200, #8b5cf6)' }}>Portfolio BackTrack</p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl" style={{ color: 'var(--text)' }}>
                Historical portfolio backtesting for modern investors.
              </h1>
              <p className="max-w-2xl text-base sm:text-lg" style={{ color: 'var(--muted)' }}>
                Build allocation scenarios, test them over any historical window, and explore analytics in a polished fintech dashboard.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold shadow-lg transition hover:opacity-95" href="/builder" style={{ background: 'var(--brand-500, #6366f1)', color: 'var(--brand-text, #fff)', boxShadow: '0 12px 30px rgba(99,102,241,0.14)' }}>
                  Start building
                </a>
                <a className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition" href="/dashboard" style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}>
                  View dashboard
                </a>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature} className="rounded-3xl p-6" style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}>
                  <p className="text-sm" style={{ color: 'var(--brand-300, #c4b5fd)' }}>Feature</p>
                  <p className="mt-3 text-base font-medium" style={{ color: 'var(--text)' }}>{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] p-8 shadow-glass backdrop-blur-xl" style={{ border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text)' }}>
            <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>Live preview</p>
            <div className="mt-8 space-y-6">
              <div className="rounded-3xl p-6 shadow-inner" style={{ background: 'var(--surface)', color: 'var(--text)', boxShadow: 'inset 0 8px 24px rgba(2,6,23,0.35)' }}>
                <p className="text-sm" style={{ color: 'var(--brand-200, #c7d2fe)' }}>Portfolio summary</p>
                <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                  <div className="rounded-3xl p-4" style={{ background: 'var(--surface-2)', color: 'var(--text)' }}>Total value</div>
                  <div className="rounded-3xl p-4" style={{ background: 'var(--surface-2)', color: 'var(--text)' }}>CAGR</div>
                  <div className="rounded-3xl p-4" style={{ background: 'var(--surface-2)', color: 'var(--text)' }}>Max drawdown</div>
                  <div className="rounded-3xl p-4" style={{ background: 'var(--surface-2)', color: 'var(--text)' }}>Sharpe ratio</div>
                </div>
              </div>

              <div className="rounded-3xl p-6" style={{ border: '1px dashed rgba(15,23,42,0.08)', background: 'var(--surface)', color: 'var(--muted)' }}>
                <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>Dashboard preview</p>
                <p className="mt-4 text-sm">Charts, analytics cards, and portfolio tests will appear here as Phase 1 expands into the data engine.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="builder" className="mx-auto max-w-6xl px-6 pb-20 sm:px-8">
        <SectionCard title="Portfolio Builder" description="Start with the core workflow">
          <p style={{ color: 'var(--muted)' }}>
            Build a portfolio with allocations, choose lump sum or SIP, select a historical date range, and validate 100% allocation.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl p-6" style={{ background: 'var(--surface)', color: 'var(--text)' }}>Investment type selector</div>
            <div className="rounded-3xl p-6" style={{ background: 'var(--surface)', color: 'var(--text)' }}>Fund allocation controls</div>
          </div>
        </SectionCard>
      </section>

      <section id="dashboard" className="mx-auto max-w-6xl px-6 pb-20 sm:px-8">
        <SectionCard title="Analysis Dashboard" description="Analytics are coming next">
          <p style={{ color: 'var(--muted)' }}>
            This section will host portfolio metrics, chart cards, and historical performance analytics once the calculation engine is in place.
          </p>
        </SectionCard>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 pb-20 sm:px-8">
        <SectionCard title="About" description="Modern design with future expansion">
          <p style={{ color: 'var(--muted)' }}>
            The app is designed to expand with portfolio analytics, saved scenarios, and a polished planning experience for modern investors.
          </p>
        </SectionCard>
      </section>

      <SiteFooter />
    </main>
  );
}
