import Link from 'next/link';

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 sm:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-glass">
          <h1 className="text-4xl font-semibold text-white">Settings</h1>
          <p className="mt-4 max-w-3xl text-base text-slate-300">
            App settings, dark/light mode, and user preferences will be managed from this page.
          </p>
        </div>

        <div className="rounded-3xl border border-dashed border-slate-700/50 bg-slate-950/70 p-8 text-slate-300">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500">Placeholder</p>
          <p className="mt-3 text-base">This page is reserved for theming, user defaults, and command palette preferences.</p>
          <Link href="/" className="mt-6 inline-flex rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-400">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
