import { InfoTooltip } from '@/components/info-tooltip';

const metricDefinitions: Record<string, string> = {
  'Absolute return': 'Total percentage gain or loss relative to the starting portfolio value.',
  CAGR: 'Compound annual growth rate reflecting the average annual growth over the measurement period.',
  'Max drawdown': 'Largest peak-to-trough drop in portfolio value, expressed as a percentage.',
  Volatility: 'Standard deviation of monthly returns annualized to show portfolio variability.',
  'Sharpe ratio': 'Risk-adjusted return compared to a risk-free benchmark.',
  'Sortino ratio': 'Risk-adjusted return using only downside volatility as the risk measure.',
  XIRR: 'Extended internal rate of return for irregular cash flows, shown as an annual percentage.'
};

export function MetricsSummary({ metrics }: { metrics: Array<{ label: string; value: string }> }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-200">
          <div className="flex items-center gap-2">
            <p className="text-sm text-slate-400">{metric.label}</p>
            <InfoTooltip message={metricDefinitions[metric.label] ?? 'Metric explanation not available.'} />
          </div>
          <p className="mt-4 text-2xl font-semibold text-white">{metric.value}</p>
        </div>
      ))}
    </div>
  );
}
