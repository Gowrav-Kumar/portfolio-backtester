'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio-backtrack-theme';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  // On mount only, read persisted preference and apply classes.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as 'light' | 'dark' | null;
      const initialTheme = stored ?? (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
      setTheme(initialTheme);
      document.documentElement.classList.toggle('light', initialTheme === 'light');
      document.documentElement.classList.toggle('dark', initialTheme === 'dark');
      setMounted(true);
    } catch (e) {
      setMounted(true);
    }
  }, []);

  // Persist and apply when the user toggles theme after mount.
  useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
      document.documentElement.classList.toggle('light', theme === 'light');
      document.documentElement.classList.toggle('dark', theme === 'dark');
    } catch (e) {
      /* ignore */
    }
  }, [theme, mounted]);

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-brand-500 dark:border-slate-200 dark:bg-slate-100 dark:text-slate-950"
    >
      {!mounted ? 'Toggle theme' : theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    </button>
  );
}
