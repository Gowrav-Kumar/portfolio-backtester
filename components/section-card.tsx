export function SectionCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-glass backdrop-blur-xl">
      <div className="mb-6 space-y-2">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{title}</p>
        <p className="text-2xl font-semibold text-slate-100">{description}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
