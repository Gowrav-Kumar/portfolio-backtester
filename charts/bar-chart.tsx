'use client';

import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type BarChartProps = {
  data: Array<{ year: number; returnPct: number }>;
  label: string;
};

export function PortfolioBarChart({ data, label }: BarChartProps) {
  return (
    <div className="rounded-3xl p-6" style={{ border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text)' }}>
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>{label}</p>
        <p className="text-base font-semibold" style={{ color: 'var(--text)' }}>Annual returns</p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -12, bottom: 0 }}>
            <CartesianGrid stroke="var(--grid, #334155)" strokeDasharray="3 3" />
            <XAxis dataKey="year" tick={{ fill: 'var(--muted)', fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: 'var(--muted)', fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip formatter={(value) => [`${Number(value ?? 0).toFixed(2)}%`, 'Return']} />
            <Bar dataKey="returnPct" fill="var(--chart-comparison, #38bdf8)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
