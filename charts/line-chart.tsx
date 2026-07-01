'use client';

import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { formatRupee } from '@/lib/format';

type LineChartProps = {
  data: Array<{ date: string; value: number; comparisonValue?: number }>;
  label: string;
  comparisonLabel?: string;
  valueFormatter?: (value: number) => string;
};

export function PortfolioLineChart({ data, label, comparisonLabel, valueFormatter }: LineChartProps) {
  const subtitle = label === 'Growth' || label === 'Portfolio growth'
    ? 'Portfolio value in ₹ over time'
    : label === 'Drawdown'
    ? 'Portfolio drawdown over time'
    : label === 'Rolling returns'
    ? 'Trailing returns over time'
    : 'Portfolio performance over time';

  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{label}</p>
          <p className="text-base font-semibold text-slate-100">{subtitle}</p>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 20, left: -12, bottom: 0 }}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} minTickGap={20} />
            <YAxis
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => (valueFormatter ? valueFormatter(Number(value ?? 0)) : formatRupee(Number(value ?? 0)))}
            />
            <Tooltip
              formatter={(value) => [
                valueFormatter ? valueFormatter(Number(value ?? 0)) : formatRupee(Number(value ?? 0)),
                'Value'
              ]}
              labelFormatter={(label) => `Date: ${label}`}
            />
            <Line type="monotone" dataKey="value" stroke="#818cf8" strokeWidth={3} dot={false} />
            {comparisonLabel ? (
              <Line
                type="monotone"
                dataKey="comparisonValue"
                stroke="#38bdf8"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name={comparisonLabel}
              />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
