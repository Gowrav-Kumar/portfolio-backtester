'use client';

type InfoTooltipProps = {
  message: string;
};

export function InfoTooltip({ message }: InfoTooltipProps) {
  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        aria-label={message}
        className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-700 bg-slate-900/95 text-xs font-semibold text-slate-300 transition hover:border-brand-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-400"
      >
        i
      </button>
      <div className="pointer-events-none absolute bottom-full left-1/2 z-10 hidden w-64 -translate-x-1/2 -translate-y-3 rounded-3xl border border-slate-700 bg-slate-950/95 px-4 py-3 text-xs text-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.45)] group-hover:block group-focus-within:block">
        {message}
      </div>
    </span>
  );
}
