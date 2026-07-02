export function SectionCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl p-8 shadow-glass backdrop-blur-xl" style={{ border: '1px solid var(--border)', background: 'var(--surface-2)' }}>
      <div className="mb-6 space-y-2">
        <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>{title}</p>
        <p className="text-2xl font-semibold" style={{ color: 'var(--text)' }}>{description}</p>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}
