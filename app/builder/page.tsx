import Link from 'next/link';
import { BuilderForm } from './builder-form';
import { PageShell } from '@/components/page-shell';

export default function BuilderPage() {
  return (
    <PageShell title="Portfolio Builder" description="Configure your total investment in ₹, fund allocations, and historical date range.">
      <div className="rounded-3xl border p-8 shadow-glass" style={{ border: '1px solid var(--border)', background: 'var(--surface-2)' }}>
        <BuilderForm />
      </div>
      <div className="rounded-3xl border border-dashed p-8" style={{ borderColor: 'rgba(15,23,42,0.08)', background: 'var(--surface)' }}>
        <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>Next</p>
        <p className="mt-3 text-base" style={{ color: 'var(--text)' }}>Submit the form to generate portfolio analytics using ₹ formatting and Indian number style.</p>
        <Link href="/dashboard" className="mt-6 inline-flex rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400">
          View dashboard preview
        </Link>
      </div>
    </PageShell>
  );
}
