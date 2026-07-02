'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePortfolioStore } from '@/store/portfolio-store';
import { PageShell } from '@/components/page-shell';

export default function SavedPage() {
  const router = useRouter();
  const savedScenarios = usePortfolioStore((state) => state.savedScenarios);
  const deleteScenario = usePortfolioStore((state) => state.deleteScenario);
  const loadScenario = usePortfolioStore((state) => state.loadScenario);

  if (!savedScenarios.length) {
    return (
      <PageShell title="Saved Scenarios" description="Portfolio scenarios saved in browser storage.">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-glass">
          <h1 className="text-4xl font-semibold text-white">Saved Scenarios</h1>
          <p className="mt-4 max-w-3xl text-base text-slate-300">
            You don't have any saved scenarios yet. Save a portfolio from the builder to see it here.
          </p>
          <Link href="/builder" className="mt-8 inline-flex rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400">
            Build a new scenario
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title="Saved Scenarios" description="Portfolio scenarios saved in browser storage.">
      <div className="grid gap-6 lg:grid-cols-2">
        {savedScenarios.map((scenario) => (
          <div key={scenario.id} className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Scenario</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">{scenario.name}</h2>
                <p className="mt-2 text-sm text-slate-400">Saved on {new Date(scenario.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="space-y-2 text-right">
                <button
                  type="button"
                  onClick={() => {
                    loadScenario(scenario.id);
                    router.push('/dashboard');
                  }}
                  className="inline-flex rounded-full bg-slate-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  Load
                </button>
                <Link
                  href={`/dashboard?compare=${scenario.id}`}
                  className="inline-flex rounded-full bg-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-600"
                >
                  Compare
                </Link>
                <button
                  type="button"
                  onClick={() => deleteScenario(scenario.id)}
                  className="inline-flex rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-500"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-900/80 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Investment</p>
                <p className="mt-2 text-xl font-semibold text-white">₹{scenario.portfolio.totalInvestment.toLocaleString('en-IN')}</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-4">
                <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Date range</p>
                <p className="mt-2 text-white">{scenario.portfolio.startDate} → {scenario.portfolio.endDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {savedScenarios.length > 1 ? (
        <div className="mt-10 rounded-3xl border border-white/10 bg-slate-950/90 p-6">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Compare saved scenarios</p>
          <p className="mt-3 text-sm text-slate-400">Compare two saved scenarios on the dedicated compare page.</p>
          <Link href="/saved/compare" className="mt-4 inline-flex rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400">
            Compare scenarios
          </Link>
        </div>
      ) : null}
      <div className="mt-10">
        <Link href="/builder" className="inline-flex rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400">
          Build another scenario
        </Link>
      </div>
    </PageShell>
  );
}
