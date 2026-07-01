'use client';

import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

type BarChartProps = {
  data: Array<{ year: number; returnPct: number }>;
  label: string;
};

export function PortfolioBarChart({ data, label }: BarChartProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{label}</p>
        <p className="text-base font-semibold text-slate-100">Annual returns</p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 20, left: -12, bottom: 0 }}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <XAxis dataKey="year" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip formatter={(value) => [`${Number(value ?? 0).toFixed(2)}%`, 'Return']} />
            <Bar dataKey="returnPct" fill="#38bdf8" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
