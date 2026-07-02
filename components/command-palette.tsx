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
        className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition"
        style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
      >
        Cmd + K
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm" style={{ background: 'rgba(2,6,23,0.85)' }}>
          <div className="w-full max-w-xl rounded-3xl p-6 shadow-glass" style={{ border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text)' }}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>Command palette</p>
                <p className="mt-1 text-sm" style={{ color: 'var(--muted)' }}>Type to filter commands and navigate quickly.</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full px-3 py-2 text-sm transition"
                style={{ background: 'var(--surface)', color: 'var(--text)' }}
              >
                Close
              </button>
            </div>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search commands..."
              className="mt-6 w-full rounded-3xl px-4 py-3 outline-none"
              style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
            />
            <div className="mt-4 space-y-3 max-h-72 overflow-y-auto">
              {filteredItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-sm transition"
                  style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--text)' }}
                >
                  {item.label}
                </a>
              ))}
              {filteredItems.length === 0 ? (
                <p className="rounded-2xl px-4 py-3 text-sm" style={{ border: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--muted)' }}>No commands found.</p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
