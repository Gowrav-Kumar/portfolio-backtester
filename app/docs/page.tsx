import Link from 'next/link';

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 sm:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-glass">
          <h1 className="text-4xl font-semibold text-white">Documentation</h1>
          <p className="mt-4 max-w-3xl text-base text-slate-300">
            Project documentation, analytics definitions, and usage guides will be available here.
          </p>
        </div>

        <div className="rounded-3xl border border-dashed border-slate-700/50 bg-slate-950/70 p-8 text-slate-300">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Placeholder</p>
          <p className="mt-3 text-base">This documentation page will host analytics definitions, metric explanations, and workflow help.</p>
          <Link href="/" className="mt-6 inline-flex rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
