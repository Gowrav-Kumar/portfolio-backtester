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
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader />

      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4 rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-glass">
              <p className="text-sm uppercase tracking-[0.35em] text-brand-200">Portfolio BackTrack</p>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Historical portfolio backtesting for modern investors.
              </h1>
              <p className="max-w-2xl text-base text-slate-300 sm:text-lg">
                Build allocation scenarios, test them over any historical window, and explore analytics in a polished fintech dashboard.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <a className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-400" href="/builder">
                  Start building
                </a>
                <a className="inline-flex items-center justify-center rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500" href="/dashboard">
                  View dashboard
                </a>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {features.map((feature) => (
                <div key={feature} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-200">
                  <p className="text-sm text-brand-300">Feature</p>
                  <p className="mt-3 text-base font-medium">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/70 p-8 shadow-glass backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Live preview</p>
            <div className="mt-8 space-y-6">
              <div className="rounded-3xl bg-slate-950/80 p-6 text-slate-300 shadow-inner shadow-slate-950/50">
                <p className="text-sm text-brand-200">Portfolio summary</p>
                <div className="mt-4 grid gap-4 text-sm text-slate-200 sm:grid-cols-2">
                  <div className="rounded-3xl bg-white/5 p-4">Total value</div>
                  <div className="rounded-3xl bg-white/5 p-4">CAGR</div>
                  <div className="rounded-3xl bg-white/5 p-4">Max drawdown</div>
                  <div className="rounded-3xl bg-white/5 p-4">Sharpe ratio</div>
                </div>
              </div>

              <div className="rounded-3xl border border-dashed border-slate-700/50 bg-slate-950/70 p-6 text-slate-400">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Dashboard preview</p>
                <p className="mt-4 text-sm">Charts, analytics cards, and portfolio tests will appear here as Phase 1 expands into the data engine.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="builder" className="mx-auto max-w-6xl px-6 pb-20 sm:px-8">
        <SectionCard title="Portfolio Builder" description="Start with the core workflow">
          <p className="text-slate-300">
            Build a portfolio with allocations, choose lump sum or SIP, select a historical date range, and validate 100% allocation.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-950/80 p-6 text-slate-300">Investment type selector</div>
            <div className="rounded-3xl bg-slate-950/80 p-6 text-slate-300">Fund allocation controls</div>
          </div>
        </SectionCard>
      </section>

      <section id="dashboard" className="mx-auto max-w-6xl px-6 pb-20 sm:px-8">
        <SectionCard title="Analysis Dashboard" description="Analytics are coming next">
          <p className="text-slate-300">
            This section will host portfolio metrics, chart cards, and historical performance analytics once the calculation engine is in place.
          </p>
        </SectionCard>
      </section>

      <section id="about" className="mx-auto max-w-6xl px-6 pb-20 sm:px-8">
        <SectionCard title="About" description="Modern design with future expansion">
          <p className="text-slate-300">
            Phase 1 establishes the app shell, responsive layout, and UI architecture ready for mock data, analytics, and extended pages.
          </p>
        </SectionCard>
      </section>

      <SiteFooter />
    </main>
  );
}
