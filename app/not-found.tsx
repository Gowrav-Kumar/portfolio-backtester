import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-24 text-center sm:px-8">
        <p className="text-sm uppercase tracking-[0.35em] text-brand-200">404</p>
        <h1 className="text-5xl font-semibold text-white">Page not found</h1>
        <p className="text-base text-slate-400">
          The route you are looking for doesn’t exist yet. Return to the landing page or navigate to the builder.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/" className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-400">
            Home
          </Link>
          <Link href="/builder" className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-slate-500">
            Portfolio Builder
          </Link>
        </div>
      </div>
    </main>
  );
}
