'use client';

import { Cell, ResponsiveContainer, Tooltip, XAxis, YAxis, ZAxis, ScatterChart, Scatter } from 'recharts';

type HeatmapChartProps = {
  data: Array<{ month: string; year: string; value: number }>;
  label: string;
};

const COLORS = ['#0f172a', '#1e293b', '#334155', '#475569', '#64748b', '#94a3b8', '#cbd5e1'];

export function HeatmapChart({ data, label }: HeatmapChartProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{label}</p>
        <p className="text-base font-semibold text-slate-100">Monthly return heatmap</p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 20, left: -12, bottom: 0 }}>
            <XAxis dataKey="month" type="category" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis dataKey="year" type="category" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <ZAxis dataKey="value" range={[100, 1000]} />
            <Tooltip formatter={(value) => [`${Number(value ?? 0).toFixed(2)}%`, 'Monthly']} />
            <Scatter data={data} fill="#38bdf8">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[Math.min(Math.floor(entry.value / 2) + 1, COLORS.length - 1)]} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
