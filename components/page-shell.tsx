import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

export function PageShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen" style={{ background: 'var(--bg-gradient)', color: 'var(--text)' }}>
      <SiteHeader />
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 sm:px-8">
        <div className="rounded-[2rem] p-10 shadow-glass" style={{ border: '1px solid var(--border)', background: 'var(--surface-2)' }}>
          <h1 className="text-4xl font-semibold" style={{ color: 'var(--text)' }}>{title}</h1>
          <p className="mt-4 max-w-3xl text-base" style={{ color: 'var(--muted)' }}>{description}</p>
        </div>
        {children}
      </div>
      <SiteFooter />
    </main>
  );
}
