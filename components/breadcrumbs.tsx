'use client';

import Link from 'next/link';

type BreadcrumbItem = {
  href: '/' | '/builder' | '/dashboard' | '/saved' | '/docs' | '/settings';
  label: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav className="text-sm text-slate-400" aria-label="Breadcrumb">
      <ol className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            <Link href={item.href} className="hover:text-white transition">
              {item.label}
            </Link>
            {index < items.length - 1 ? <span aria-hidden="true">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
