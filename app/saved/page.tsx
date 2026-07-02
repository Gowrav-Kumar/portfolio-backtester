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
        <div className="rounded-[2rem] border p-10 shadow-glass" style={{ border: '1px solid var(--border)', background: 'var(--surface-2)' }}>
          <h1 className="text-4xl font-semibold" style={{ color: 'var(--text)' }}>Saved Scenarios</h1>
          <p className="mt-4 max-w-3xl text-base" style={{ color: 'var(--muted)' }}>
            You don't have any saved scenarios yet. Create one to compare performance over time.
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
          <div key={scenario.id} className="rounded-3xl border p-6" style={{ border: '1px solid var(--border)', background: 'var(--surface-2)' }}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>Scenario</p>
                <h2 className="mt-2 text-2xl font-semibold" style={{ color: 'var(--text)' }}>{scenario.name}</h2>
                <p className="mt-2 text-sm" style={{ color: 'var(--muted)' }}>Saved on {new Date(scenario.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="space-y-2 text-right">
                <button
                  type="button"
                  onClick={() => {
                    loadScenario(scenario.id);
                    router.push('/dashboard');
                  }}
                  className="inline-flex rounded-full px-4 py-2 text-sm font-semibold transition"
                  style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
                >
                  Load
                </button>
                <Link
                  href={`/dashboard?compare=${scenario.id}`}
                  className="inline-flex rounded-full px-4 py-2 text-sm font-semibold transition"
                  style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
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
              <div className="rounded-3xl p-4" style={{ background: 'var(--surface)', color: 'var(--text)' }}>
                <p className="text-xs uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>Investment</p>
                <p className="mt-2 text-xl font-semibold" style={{ color: 'var(--text)' }}>₹{scenario.portfolio.totalInvestment.toLocaleString('en-IN')}</p>
              </div>
              <div className="rounded-3xl p-4" style={{ background: 'var(--surface)', color: 'var(--text)' }}>
                <p className="text-xs uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>Date range</p>
                <p className="mt-2" style={{ color: 'var(--text)' }}>{scenario.portfolio.startDate} → {scenario.portfolio.endDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {savedScenarios.length > 1 ? (
        <div className="mt-10 rounded-3xl p-6" style={{ border: '1px solid var(--border)', background: 'var(--surface-2)' }}>
          <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>Compare saved scenarios</p>
          <p className="mt-3 text-sm" style={{ color: 'var(--muted)' }}>Compare two saved scenarios on the dedicated compare page.</p>
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
