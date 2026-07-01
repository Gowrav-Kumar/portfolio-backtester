'use client';

import { useEffect, useState } from 'react';

type CommandItem = {
  label: string;
  href: '/' | '/builder' | '/dashboard' | '/saved' | '/docs' | '/settings';
};

const items: CommandItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Builder', href: '/builder' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Saved Scenarios', href: '/saved' },
  { label: 'Docs', href: '/docs' },
  { label: 'Settings', href: '/settings' }
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, []);

  const filteredItems = items.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-brand-500"
      >
        Cmd + K
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-slate-950/95 p-6 shadow-glass">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Command palette</p>
                <p className="mt-1 text-sm text-slate-300">Type to filter commands and navigate quickly.</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-slate-900/80 px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
              >
                Close
              </button>
            </div>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search commands..."
              className="mt-6 w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none focus:border-brand-500"
            />
            <div className="mt-4 space-y-3 max-h-72 overflow-y-auto">
              {filteredItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 transition hover:border-brand-500 hover:bg-slate-900"
                >
                  {item.label}
                </a>
              ))}
              {filteredItems.length === 0 ? (
                <p className="rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-slate-400">No commands found.</p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
