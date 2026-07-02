'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio-backtrack-theme';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  const applyTheme = (value: 'light' | 'dark') => {
    document.documentElement.classList.toggle('light', value === 'light');
    document.documentElement.classList.toggle('dark', value === 'dark');
  };

  // On mount only, read persisted preference and apply classes.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as 'light' | 'dark' | null;
      const initialTheme = stored ?? (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      setTheme(initialTheme);
      applyTheme(initialTheme);
    } catch {
      /* ignore */
    } finally {
      setMounted(true);
    }
  }, []);

  // Persist theme selection after mount.
  useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme, mounted]);

  return (
    <button
      type="button"
      onClick={() => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        setTheme(nextTheme);
        try {
          window.localStorage.setItem(STORAGE_KEY, nextTheme);
        } catch {
          /* ignore */
        }
      }}
      className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition hover:border-brand-500"
      style={{ border: '1px solid var(--border)', background: 'var(--surface-2)', color: 'var(--text)' }}
    >
      {!mounted ? 'Toggle theme' : theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    </button>
  );
}
