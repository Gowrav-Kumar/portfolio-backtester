# Data Layer

Current implementation:
- `data/mock-nav.ts` generates deterministic monthly NAV series used by the calculation engine for development and testing. The data generator is intentionally synthetic and suitable for UI development and algorithm validation only.

Recommendations:
- Add a data abstraction layer (e.g., `lib/data-source.ts`) that can switch between the mock generator and a real API provider.
- Normalize series shape to `TimeSeriesPoint[]` with `{ date: 'YYYY-MM-DD', value: number }` so `lib/portfolio.ts` receives consistent input regardless of source.
- Store a small static snapshot of historical NAVs in `data/static/` for deterministic CI testing.

Notes:
- The current mock generator covers 1995–2024 synthetic series and should be clearly annotated in `README.md` and `AI_CONTEXT.md`.