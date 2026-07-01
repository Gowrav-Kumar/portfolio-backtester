'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

type PieChartProps = {
  data: Array<{ name: string; value: number }>;
  label: string;
};

const COLORS = ['#818cf8', '#38bdf8', '#f472b6', '#22c55e', '#eab308'];

export function PortfolioPieChart({ data, label }: PieChartProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{label}</p>
        <p className="text-base font-semibold text-slate-100">Allocation breakdown</p>
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
              fill="#38bdf8"
              label={({ name, value }) => `${name}: ${value}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
