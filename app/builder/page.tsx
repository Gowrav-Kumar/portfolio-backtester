import Link from 'next/link';
import { BuilderForm } from './builder-form';
import { PageShell } from '@/components/page-shell';

export default function BuilderPage() {
  return (
    <PageShell title="Portfolio Builder" description="Configure your total investment in ₹, fund allocations, and historical date range.">
      <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-glass">
        <BuilderForm />
      </div>
      <div className="rounded-3xl border border-dashed border-slate-700/50 bg-slate-950/70 p-8 text-slate-300">
        <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Next</p>
        <p className="mt-3 text-base">Submit the form to generate portfolio analytics using ₹ formatting and Indian number style.</p>
        <Link href="/dashboard" className="mt-6 inline-flex rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400">
          View dashboard preview
        </Link>
      </div>
    </PageShell>
  );
}
