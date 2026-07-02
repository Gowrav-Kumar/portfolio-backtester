'use client';

import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type AreaChartProps = {
  data: Array<Record<string, string | number>>;
  label: string;
  keys: string[];
};

const COLORS = ['#818cf8', '#38bdf8', '#f472b6', '#22c55e', '#eab308'];

export function PortfolioAreaChart({ data, label, keys }: AreaChartProps) {
  return (
    <div className="rounded-3xl p-6" style={{ border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text)' }}>
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>{label}</p>
        <p className="text-base font-semibold" style={{ color: 'var(--text)' }}>Allocation over time</p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: -12, bottom: 0 }}>
            <CartesianGrid stroke="var(--grid, #334155)" strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fill: 'var(--muted)', fontSize: 12 }} tickLine={false} axisLine={false} minTickGap={20} />
            <YAxis tick={{ fill: 'var(--muted)', fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip formatter={(value) => [`${Number(value ?? 0).toFixed(2)}%`, 'Allocation']} />
            {keys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stackId="1"
                stroke={`var(--chart-palette-${index}, ${COLORS[index % COLORS.length]})`}
                fill={`var(--chart-palette-${index}, ${COLORS[index % COLORS.length]})`}
                fillOpacity={0.25}
                strokeWidth={2}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
