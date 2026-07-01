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
    <div className="rounded-3xl border border-white/10 bg-slate-950/90 p-6">
      <div className="mb-4">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{label}</p>
        <p className="text-base font-semibold text-slate-100">Allocation over time</p>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 20, left: -12, bottom: 0 }}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} minTickGap={20} />
            <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} />
            <Tooltip formatter={(value) => [`${Number(value ?? 0).toFixed(2)}%`, 'Allocation']} />
            {keys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stackId="1"
                stroke={COLORS[index % COLORS.length]}
                fill={COLORS[index % COLORS.length]}
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
