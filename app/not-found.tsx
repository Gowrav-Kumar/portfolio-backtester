import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <div className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-24 text-center sm:px-8">
        <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--brand-200, #c7d2fe)' }}>404</p>
        <h1 className="text-5xl font-semibold" style={{ color: 'var(--text)' }}>Page not found</h1>
        <p className="text-base" style={{ color: 'var(--muted)' }}>
          The route you are looking for doesn’t exist yet. Return to the landing page or navigate to the builder.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link href="/" className="rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-400">
            Home
          </Link>
          <Link href="/builder" className="rounded-full px-6 py-3 text-sm font-semibold transition" style={{ border: '1px solid var(--border)', color: 'var(--text)' }}>
            Portfolio Builder
          </Link>
        </div>
      </div>
    </main>
  );
}
