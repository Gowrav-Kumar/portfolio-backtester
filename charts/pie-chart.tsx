'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

type PieChartProps = {
  data: Array<{ name: string; value: number }>;
  label: string;
};

const COLORS = ['#818cf8', '#38bdf8', '#f472b6', '#22c55e', '#eab308'];

export function PortfolioPieChart({ data, label }: PieChartProps) {
  return (
    <div className="rounded-3xl p-6" style={{ border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text)' }}>
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>{label}</p>
        <p className="text-base font-semibold" style={{ color: 'var(--text)' }}>Allocation breakdown</p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={48}
              outerRadius={88}
              fill="var(--chart-comparison, #38bdf8)"
              label={({ name, value }) => `${name}: ${value}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={`var(--chart-palette-${index}, ${COLORS[index % COLORS.length]})`} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
