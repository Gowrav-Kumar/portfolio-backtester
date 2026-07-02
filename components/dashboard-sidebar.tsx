'use client';

type SidebarItem = {
  label: string;
  href: '/' | '/dashboard' | '/dashboard#growth' | '/dashboard#performance' | '/dashboard#risk' | '/dashboard#comparisons';
};

const items: SidebarItem[] = [
  { label: 'Overview', href: '/dashboard' },
  { label: 'Growth', href: '/dashboard#growth' },
  { label: 'Performance', href: '/dashboard#performance' },
  { label: 'Risk', href: '/dashboard#risk' },
  { label: 'Comparisons', href: '/dashboard#comparisons' }
];

export function DashboardSidebar() {
  return (
    <aside className="hidden w-72 shrink-0 rounded-3xl p-6 xl:block" style={{ border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text)' }}>
      <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>Dashboard menu</p>
      <nav className="mt-6 space-y-3">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block rounded-2xl px-4 py-3 text-sm transition"
            style={{ color: 'var(--text)' }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
