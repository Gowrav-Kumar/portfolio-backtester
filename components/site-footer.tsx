export function SiteFooter() {
  return (
    <footer className="px-6 py-8 text-sm backdrop-blur sm:px-8" style={{ borderTop: '1px solid var(--border)', background: 'var(--surface)', color: 'var(--muted)' }}>
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between">
        <p style={{ color: 'var(--muted)' }}>© {new Date().getFullYear()} Portfolio BackTrack. Built for data-driven investors.</p>
        <p style={{ color: 'var(--muted)' }}>Designed with modern fintech polish and clean analytics.</p>
      </div>
    </footer>
  );
}
