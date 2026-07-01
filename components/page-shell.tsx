import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

export function PageShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <SiteHeader />
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-20 sm:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 shadow-glass">
          <h1 className="text-4xl font-semibold text-white">{title}</h1>
          <p className="mt-4 max-w-3xl text-base text-slate-300">{description}</p>
        </div>
        {children}
      </div>
      <SiteFooter />
    </main>
  );
}
