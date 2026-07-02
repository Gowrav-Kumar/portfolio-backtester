import Link from 'next/link';

export default function SettingsPage() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 sm:px-8">
        <div className="rounded-[2rem] border p-10 shadow-glass" style={{ border: '1px solid var(--border)', background: 'var(--surface-2)' }}>
          <h1 className="text-4xl font-semibold" style={{ color: 'var(--text)' }}>Settings</h1>
          <p className="mt-4 max-w-3xl text-base" style={{ color: 'var(--muted)' }}>
            App settings, dark/light mode, and user preferences will be managed from this page.
          </p>
        </div>

        <div className="rounded-3xl border border-dashed p-8" style={{ borderColor: 'rgba(15,23,42,0.08)', background: 'var(--surface)' }}>
          <p className="text-sm uppercase tracking-[0.35em]" style={{ color: 'var(--muted)' }}>Placeholder</p>
          <p className="mt-3 text-base" style={{ color: 'var(--text)' }}>This page is reserved for theming, user defaults, and command palette preferences.</p>
          <Link href="/" className="mt-6 inline-flex rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
