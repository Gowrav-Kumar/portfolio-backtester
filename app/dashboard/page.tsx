'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { PortfolioLineChart } from '@/charts/line-chart';
import { PortfolioBarChart } from '@/charts/bar-chart';
import { PortfolioPieChart } from '@/charts/pie-chart';
import { PortfolioAreaChart } from '@/charts/area-chart';
import { HeatmapChart } from '@/charts/heatmap-chart';
import { MetricsSummary } from '@/components/metrics-summary';
import { PageShell } from '@/components/page-shell';
import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { Breadcrumbs } from '@/components/breadcrumbs';
import {
  calculateAbsoluteReturn,
  calculateCAGR,
  calculateDrawdown,
  calculateDrawdownSeries,
  calculateAnnualReturns,
  calculateAllocationTrendSeries,
  calculateMonthlyHeatmapData,
  calculateMonthlyReturns,
  calculateRollingReturns,
  calculateSortinoRatio,
  calculateVolatility,
  calculateSharpeRatio,
  calculateXIRR,
  comparePortfolioWithBenchmark,
  TimeSeriesPoint
} from '@/lib/portfolio';
import { usePortfolioStore } from '@/store/portfolio-store';
import { getFundSeries, mockFunds } from '@/data/mock-nav';

const defaultSeries = mockFunds[0].series.map((point) => ({ date: point.date, value: point.nav * 1000 }));

export default function DashboardPage() {
  const [benchmarkId, setBenchmarkId] = useState('large-cap-a');
  const [primaryMode, setPrimaryMode] = useState<'current' | 'scenario'>('current');
  const [primaryScenarioId, setPrimaryScenarioId] = useState('');
  const [comparisonMode, setComparisonMode] = useState<'benchmark' | 'scenario'>('benchmark');
  const [comparisonScenarioId, setComparisonScenarioId] = useState('');
  const portfolioSeries = usePortfolioStore((state) => state.series);
  const portfolio = usePortfolioStore((state) => state.portfolio);
  const savedScenarios = usePortfolioStore((state) => state.savedScenarios);

  const hasCurrentPortfolio = Boolean(portfolioSeries && portfolioSeries.length > 0);
  const currentSeries = hasCurrentPortfolio ? portfolioSeries! : defaultSeries;
  const primaryScenario = useMemo(
    () => savedScenarios.find((scenario) => scenario.id === primaryScenarioId),
    [savedScenarios, primaryScenarioId]
  );
  const comparisonScenario = useMemo(
    () => savedScenarios.find((scenario) => scenario.id === comparisonScenarioId),
    [savedScenarios, comparisonScenarioId]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const primary = params.get('primary');
    const compare = params.get('compare');

    if (primary) {
      setPrimaryMode('scenario');
      setPrimaryScenarioId(primary);
    }

    if (compare) {
      setComparisonMode('scenario');
      setComparisonScenarioId(compare);
    }
  }, []);

  const primarySeries = primaryMode === 'scenario' && primaryScenario?.series?.length ? primaryScenario.series : currentSeries;

  const primaryPortfolio = useMemo(
    () =>
      primaryMode === 'scenario' && primaryScenario?.portfolio
        ? primaryScenario.portfolio
        : portfolio,
    [primaryMode, primaryScenario, portfolio]
  );

  const primaryLabel = primaryMode === 'scenario' && primaryScenario ? primaryScenario.name : 'Current portfolio';

  const allocationData = useMemo(
    () =>
      primaryPortfolio?.allocations?.map((allocation) => ({
        name: allocation.name,
        value: allocation.allocation
      })) ?? [],
    [primaryPortfolio]
  );

  const benchmarkSeries = useMemo<TimeSeriesPoint[]>(() => {
    const rawBenchmark = getFundSeries(benchmarkId).filter(
      (point) => point.date >= primarySeries[0].date && point.date <= primarySeries[primarySeries.length - 1].date
    );

    return rawBenchmark.map((point) => ({ date: point.date, value: point.nav }));
  }, [benchmarkId, primarySeries]);

  const comparisonData = useMemo(() => {
    const comparisonSeries = comparisonMode === 'scenario' && comparisonScenario?.series?.length
      ? comparisonScenario.series
      : benchmarkSeries;

    return comparePortfolioWithBenchmark(primarySeries, comparisonSeries);
  }, [primarySeries, benchmarkSeries, comparisonMode, comparisonScenario]);

  const comparisonLabel = comparisonMode === 'scenario' && comparisonScenario
    ? `Scenario: ${comparisonScenario.name}`
    : `Benchmark: ${mockFunds.find((fund) => fund.id === benchmarkId)?.name ?? 'Benchmark'}`;

  const drawdownSeries = useMemo(() => calculateDrawdownSeries(primarySeries), [primarySeries]);
  const rollingReturnsSeries = useMemo(() => calculateRollingReturns(primarySeries), [primarySeries]);

  const allocationTrendData = useMemo(
    () =>
      primaryPortfolio
        ? calculateAllocationTrendSeries(
            primaryPortfolio.allocations
              .filter((allocation) => allocation.allocation > 0)
              .map((allocation) => ({
                fundId:
                  allocation.category === 'Large Cap'
                    ? 'large-cap-a'
                    : allocation.category === 'Mid Cap'
                    ? 'mid-cap-b'
                    : 'small-cap-c',
                series: getFundSeries(
                  allocation.category === 'Large Cap'
                    ? 'large-cap-a'
                    : allocation.category === 'Mid Cap'
                    ? 'mid-cap-b'
                    : 'small-cap-c'
                ),
                allocation: allocation.allocation
              })),
            {
              totalInvestment: primaryPortfolio.totalInvestment,
              investmentType: primaryPortfolio.investmentType,
              sipFrequency: primaryPortfolio.sipFrequency,
              rebalance: primaryPortfolio.rebalance,
              startDate: primaryPortfolio.startDate,
              endDate: primaryPortfolio.endDate
            }
          )
        : [],
    [primaryPortfolio]
  );

  const heatmapData = useMemo(() => calculateMonthlyHeatmapData(primarySeries), [primarySeries]);

  const comparisonSummary = useMemo(() => {
    const primaryValue = primarySeries[primarySeries.length - 1]?.value ?? 0;
    const comparisonValue = comparisonData[comparisonData.length - 1]?.comparisonValue ?? 0;
    const relative = comparisonValue
      ? ((primaryValue - comparisonValue) / comparisonValue) * 100
      : 0;

    return {
      primaryValue,
      comparisonValue,
      relative
    };
  }, [primarySeries, comparisonData]);

  const { metrics, annualReturns } = useMemo(() => {
    const annual = calculateAnnualReturns(primarySeries);
    const monthly = calculateMonthlyReturns(primarySeries);
    const cagr = calculateCAGR(primarySeries[0].value, primarySeries[primarySeries.length - 1].value, primarySeries.length / 12).toFixed(2);
    const absoluteReturn = calculateAbsoluteReturn(primarySeries[0].value, primarySeries[primarySeries.length - 1].value).toFixed(2);
    const drawdown = calculateDrawdown(primarySeries).toFixed(2);
    const volatility = calculateVolatility(monthly).toFixed(2);
    const sharpe = calculateSharpeRatio(monthly).toString();
    const sortino = calculateSortinoRatio(monthly).toString();
    const xirr = primaryMode === 'current' && portfolio?.investmentType === 'lumpSum'
      ? calculateXIRR([
          { date: primarySeries[0].date, amount: -Number(portfolio.totalInvestment) },
          { date: primarySeries[primarySeries.length - 1].date, amount: primarySeries[primarySeries.length - 1].value }
        ]).toFixed(2)
      : 'N/A';

    return {
      metrics: [
        { label: 'Absolute return', value: `${absoluteReturn}%` },
        { label: 'CAGR', value: `${cagr}%` },
        { label: 'Max drawdown', value: `${drawdown}%` },
        { label: 'Volatility', value: `${volatility}%` },
        { label: 'Sharpe ratio', value: sharpe },
        { label: 'Sortino ratio', value: sortino },
        { label: 'XIRR', value: xirr }
      ],
      annualReturns: annual
    };
  }, [primarySeries, portfolio, primaryMode]);

  return (
    <PageShell title="Analysis Dashboard" description="Portfolio metrics, charts, and performance analytics.">
      <MetricsSummary metrics={metrics} />
      {!hasCurrentPortfolio ? (
        <div className="rounded-3xl border border-amber-400/20 bg-amber-500/5 p-6 text-amber-100">
          <p className="text-sm font-semibold text-amber-200">No analyzed portfolio found yet</p>
          <p className="mt-3 text-sm text-slate-300">
            Run an analysis in the <Link href="/builder" className="font-semibold text-amber-200 underline hover:text-amber-100">
              Portfolio Builder
            </Link> to load live portfolio results here. The charts below currently show a default preview.
          </p>
        </div>
      ) : null}
      <div className="grid gap-8 xl:grid-cols-[240px_1fr]">
        <DashboardSidebar />
        <div className="space-y-8">
          {savedScenarios.length > 0 ? (
            <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_1.4fr]">
              <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Saved scenarios</p>
                <p className="mt-3 text-3xl font-semibold text-white">{savedScenarios.length}</p>
                <p className="mt-2 text-sm text-slate-400">Your saved portfolio scenarios are available here.</p>
                <Link href="/saved" className="mt-4 inline-flex rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-400">
                  Manage saved scenarios
                </Link>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Comparison target</p>
                <p className="mt-3 text-xl font-semibold text-white">{comparisonLabel}</p>
                <p className="mt-2 text-sm text-slate-400">{comparisonMode === 'benchmark' ? 'Current portfolio vs benchmark' : 'Current portfolio vs saved scenario'}</p>
              </div>
            </div>
          ) : null}
          <div className="mb-6">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Home' },
            { href: '/dashboard', label: 'Dashboard' }
          ]}
        />
      </div>
      <div className="mb-8 grid gap-4 rounded-3xl border border-white/10 bg-slate-950/90 p-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Primary series</p>
            <p className="mt-1 text-sm text-slate-500">Select the portfolio to analyze.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm text-slate-200">
              <span className="sr-only">Primary source</span>
              <select
                value={primaryMode}
                onChange={(event) => {
                  setPrimaryMode(event.target.value as 'current' | 'scenario');
                  setPrimaryScenarioId('');
                }}
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-brand-500"
              >
                <option value="current">Current portfolio</option>
                <option value="scenario">Saved scenario</option>
              </select>
            </label>

            {primaryMode === 'scenario' ? (
              <label className="block text-sm text-slate-200">
                <span className="sr-only">Primary saved scenario</span>
                <select
                  value={primaryScenarioId}
                  onChange={(event) => setPrimaryScenarioId(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-brand-500"
                >
                  <option value="">Select saved scenario</option>
                  {savedScenarios.map((scenario) => (
                    <option key={scenario.id} value={scenario.id}>
                      {scenario.name}
                    </option>
                  ))}
                </select>
              </label>
            ) : null}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Comparison series</p>
            <p className="mt-1 text-sm text-slate-500">Choose a benchmark fund or another saved scenario to compare.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-sm text-slate-200">
              <span className="sr-only">Comparison source</span>
              <select
                value={comparisonMode}
                onChange={(event) => {
                  setComparisonMode(event.target.value as 'benchmark' | 'scenario');
                  setComparisonScenarioId('');
                }}
                className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-brand-500"
              >
                <option value="benchmark">Benchmark fund</option>
                <option value="scenario">Saved scenario</option>
              </select>
            </label>

            {comparisonMode === 'scenario' ? (
              <label className="block text-sm text-slate-200">
                <span className="sr-only">Comparison saved scenario</span>
                <select
                  value={comparisonScenarioId}
                  onChange={(event) => setComparisonScenarioId(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-brand-500"
                >
                  <option value="">Select saved scenario</option>
                  {savedScenarios.map((scenario) => (
                    <option key={scenario.id} value={scenario.id}>
                      {scenario.name}
                    </option>
                  ))}
                </select>
              </label>
            ) : (
              <label className="block text-sm text-slate-200">
                <span className="sr-only">Benchmark fund</span>
                <select
                  value={benchmarkId}
                  onChange={(event) => setBenchmarkId(event.target.value)}
                  className="mt-2 w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-brand-500"
                >
                  {mockFunds.map((fund) => (
                    <option key={fund.id} value={fund.id}>
                      {fund.name}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
        </div>
      </div>

      <section id="growth" className="grid gap-8 xl:grid-cols-[1fr_0.8fr]">
        <PortfolioLineChart data={comparisonData} label="Growth" comparisonLabel={comparisonLabel} />
        <PortfolioPieChart data={allocationData} label={`${primaryLabel} allocation`} />
      </section>
      <section id="performance" className="mt-8 grid gap-8 xl:grid-cols-[1fr_0.8fr]">
        <PortfolioBarChart data={annualReturns} label="Annual returns" />
        <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Performance comparison</p>
          <p className="mt-3 text-3xl font-semibold text-white">{comparisonSummary.relative.toFixed(2)}%</p>
          <p className="mt-2 text-sm text-slate-400">Relative versus selected comparison series.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Primary value</p>
              <p className="mt-2 text-lg font-semibold text-white">₹{comparisonSummary.primaryValue.toLocaleString('en-IN')}</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-4">
              <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Comparison value</p>
              <p className="mt-2 text-lg font-semibold text-white">₹{comparisonSummary.comparisonValue.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      </section>
      <section id="risk" className="mt-8 grid gap-8 xl:grid-cols-[1fr_0.8fr]">
        <PortfolioLineChart
          data={drawdownSeries}
          label="Drawdown"
          valueFormatter={(value) => `${value.toFixed(2)}%`}
        />
        <PortfolioLineChart
          data={rollingReturnsSeries}
          label="Rolling returns"
          valueFormatter={(value) => `${value.toFixed(2)}%`}
        />
      </section>
      <section id="comparisons" className="mt-8 grid gap-8 xl:grid-cols-[1fr_0.8fr]">
        <PortfolioAreaChart
          data={allocationTrendData}
          label="Allocation exposure"
          keys={['Large Cap', 'Mid Cap', 'Small Cap']}
        />
        <HeatmapChart data={heatmapData} label="Monthly return heatmap" />
      </section>
    </div>
  </div>
    </PageShell>
  );
}
