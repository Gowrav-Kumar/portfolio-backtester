'use client';

import Link from 'next/link';
import { CommandPalette } from './command-palette';
import { ThemeToggle } from './theme-toggle';

type NavItem = {
  label: string;
  href: '/' | '/builder' | '/dashboard' | '/saved' | '/docs' | '/settings';
};

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Builder', href: '/builder' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Saved', href: '/saved' },
  { label: 'Docs', href: '/docs' },
  { label: 'Settings', href: '/settings' }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/70 bg-slate-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-4 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-lg font-semibold text-white">
            Portfolio BackTrack
          </Link>
          <CommandPalette />
        </div>
        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
