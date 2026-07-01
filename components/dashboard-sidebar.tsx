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
    <aside className="hidden w-72 shrink-0 rounded-3xl border border-white/10 bg-slate-950/90 p-6 xl:block">
      <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Dashboard menu</p>
      <nav className="mt-6 space-y-3">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="block rounded-2xl px-4 py-3 text-sm text-slate-200 transition hover:bg-slate-900 hover:text-white"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
