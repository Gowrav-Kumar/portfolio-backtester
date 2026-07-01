export function SiteFooter() {
  return (
    <footer className="border-t border-slate-800/70 bg-slate-950/95 px-6 py-8 text-sm text-slate-500 backdrop-blur sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Portfolio BackTrack. Built for data-driven investors.</p>
        <p className="text-slate-400">Designed with modern fintech polish and clean analytics.</p>
      </div>
    </footer>
  );
}
