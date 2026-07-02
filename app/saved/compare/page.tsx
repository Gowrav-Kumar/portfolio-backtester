'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { PageShell } from '@/components/page-shell';
import { usePortfolioStore } from '@/store/portfolio-store';
import { PortfolioLineChart } from '@/charts/line-chart';
import { PortfolioPieChart } from '@/charts/pie-chart';
import { alignSeriesByDate } from '@/lib/portfolio';

export default function SavedComparePage() {
  const savedScenarios = usePortfolioStore((s) => s.savedScenarios);
  const [primaryId, setPrimaryId] = useState<string>('');
  const [compareId, setCompareId] = useState<string>('');

  useEffect(() => {
    if (!savedScenarios.length) return;
    const primaryDefault = savedScenarios[0]?.id ?? '';
    const compareDefault = savedScenarios.length > 1 ? (savedScenarios[1]?.id ?? savedScenarios[0]?.id ?? '') : '';
    setPrimaryId((current) => (current ? current : primaryDefault));
    setCompareId((current) => (current ? current : compareDefault));
  }, [savedScenarios]);

  const primary = useMemo(
    () => savedScenarios.find((s) => s.id === primaryId),
    [savedScenarios, primaryId]
  );
  const compare = useMemo(
    () => savedScenarios.find((s) => s.id === compareId),
    [savedScenarios, compareId]
  );

  const primarySeries = primary?.series?.map((p) => ({ date: p.date, value: p.value })) ?? [];
  const compareSeries = compare?.series?.map((p) => ({ date: p.date, value: p.value })) ?? [];

  const [alignedPrimary, alignedCompare] = useMemo(() => {
    if (!primarySeries.length) return [primarySeries, []] as const;
    if (!compareSeries.length) return [primarySeries, []] as const;
    return alignSeriesByDate(primarySeries, compareSeries) as [typeof primarySeries, typeof compareSeries];
  }, [primarySeries, compareSeries]);

  const overlaySeries = useMemo(() => {
    if (!alignedPrimary.length) return [];
    return alignedPrimary.map((point, index) => ({
      date: point.date,
      value: point.value,
      comparisonValue: alignedCompare[index]?.value
    }));
  }, [alignedPrimary, alignedCompare]);

  const primaryLast = overlaySeries[overlaySeries.length - 1]?.value ?? 0;
  const compareLast = overlaySeries[overlaySeries.length - 1]?.comparisonValue ?? 0;
  const relative = compareLast ? ((primaryLast - compareLast) / compareLast) * 100 : 0;

  const primaryAlloc = primary?.portfolio?.allocations?.map((a) => ({ name: a.name, value: a.allocation })) ?? [];
  const compareAlloc = compare?.portfolio?.allocations?.map((a) => ({ name: a.name, value: a.allocation })) ?? [];

  if (!savedScenarios.length) {
    return (
      <PageShell title="Compare saved scenarios" description="Create and save scenarios to compare them side-by-side.">
        <div className="rounded-[2rem] border p-10" style={{ border: '1px solid var(--border)', background: 'var(--surface-2)' }}>
          <h1 className="text-4xl font-semibold" style={{ color: 'var(--text)' }}>Compare saved scenarios</h1>
          <p className="mt-4 text-base" style={{ color: 'var(--muted)' }}>You don't have any saved scenarios yet. Save an analysis from the builder to compare scenarios.</p>
          <Link href="/builder" className="mt-8 inline-flex rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400">
            Build a new scenario
          </Link>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell title="Compare saved scenarios" description="Side-by-side scenario comparison.">
      <div className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl p-6" style={{ border: '1px solid var(--border)', background: 'var(--surface-2)' }}>
          <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>Primary scenario</p>
          <label className="mt-3 block">
            <select
              aria-label="Primary scenario"
              value={primaryId}
              onChange={(e) => setPrimaryId(e.target.value)}
              className="mt-2 w-full rounded-3xl px-4 py-3 outline-none transition"
              style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
            >
              {savedScenarios.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </label>

          <div className="mt-6">
            <PortfolioLineChart data={overlaySeries} label="Portfolio growth" comparisonLabel={compare ? compare.name : undefined} />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl p-4" style={{ background: 'var(--surface)', color: 'var(--text)' }}>
              <p className="text-xs uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>Investment</p>
              <p className="mt-2 text-xl font-semibold" style={{ color: 'var(--text)' }}>₹{primary?.portfolio?.totalInvestment?.toLocaleString('en-IN') ?? '—'}</p>
            </div>
            <div className="rounded-2xl p-4" style={{ background: 'var(--surface)', color: 'var(--text)' }}>
              <p className="text-xs uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>Allocation</p>
              <PortfolioPieChart data={primaryAlloc} label="Allocation" />
            </div>
          </div>
        </div>

        <div className="rounded-3xl p-6" style={{ border: '1px solid var(--border)', background: 'var(--surface-2)' }}>
          <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>Comparison scenario</p>
          <label className="mt-3 block">
            <select
              aria-label="Comparison scenario"
              value={compareId}
              onChange={(e) => setCompareId(e.target.value)}
              className="mt-2 w-full rounded-3xl px-4 py-3 outline-none transition"
              style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
            >
              <option value="">Select scenario</option>
              {savedScenarios.map((s) => (
                <option key={s.id} value={s.id} disabled={s.id === primaryId}>
                  {s.id === primaryId ? `${s.name} (primary)` : s.name}
                </option>
              ))}
            </select>
          </label>

          <div className="mt-6">
            <PortfolioLineChart data={overlaySeries} label="Portfolio growth" comparisonLabel={compare ? compare.name : undefined} />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl p-4" style={{ background: 'var(--surface)', color: 'var(--text)' }}>
              <p className="text-xs uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>Investment</p>
              <p className="mt-2 text-xl font-semibold" style={{ color: 'var(--text)' }}>₹{compare?.portfolio?.totalInvestment?.toLocaleString('en-IN') ?? '—'}</p>
            </div>
            <div className="rounded-2xl p-4" style={{ background: 'var(--surface)', color: 'var(--text)' }}>
              <p className="text-xs uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>Allocation</p>
              <PortfolioPieChart data={compareAlloc} label="Allocation" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl p-4" style={{ background: 'var(--surface)', color: 'var(--text)' }}>
          <p className="text-xs uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>Primary value</p>
          <p className="mt-2 text-lg font-semibold" style={{ color: 'var(--text)' }}>₹{primaryLast.toLocaleString('en-IN')}</p>
        </div>
        <div className="rounded-2xl p-4" style={{ background: 'var(--surface)', color: 'var(--text)' }}>
          <p className="text-xs uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>Comparison value</p>
          <p className="mt-2 text-lg font-semibold" style={{ color: 'var(--text)' }}>₹{compareLast ? compareLast.toLocaleString('en-IN') : '—'}</p>
        </div>
        <div className="rounded-2xl p-4" style={{ background: 'var(--surface)', color: 'var(--text)' }}>
          <p className="text-xs uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>Relative</p>
          <p className={`mt-2 text-lg font-semibold ${relative >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{relative ? `${relative.toFixed(2)}%` : '—'}</p>
        </div>
      </div>
      </div>
    </PageShell>
  );
}
