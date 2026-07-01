# Portfolio BackTrack — Review Checklist

Use this checklist to verify the current implementation. For each item mark: PASS / FAIL — one-line note if FAIL.

Quick setup
- Install deps: `npm install`
- Start dev: `npm run dev -- --hostname 127.0.0.1 --port 3000`
- Open: http://127.0.0.1:3000

Sanity checks
- Lint: `npm run lint -- --max-warnings=0` — Expected: no warnings/errors
- Build: `npm run build` — Expected: successful build and prerendered routes

Pages & Navigation
- Root page (`/`) loads and header/nav visible
- Builder page (`/builder`) loads with form controls
- Dashboard page (`/dashboard`) loads with metrics and charts
- Saved page (`/saved`) lists saved scenarios
- Settings/docs placeholders open without runtime errors

Builder — Form & Simulation
- Allocation inputs visible and editable (Large/Mid/Small or custom funds)
- Allocation validation: prevent analysis when allocations ≠ 100% (error shown)
- Date pickers: start and end date selection works
- Investment type selector: `Lump Sum` and `SIP` available
- Lump Sum analyze: enter total amount, click `Analyze portfolio` → Expected: series and metrics displayed
- SIP analyze: enter periodic amount + frequency (Monthly/Quarterly/Yearly) → Expected: contributions reflected in series and metrics
- Rebalance options: `None`, `Monthly`, `Quarterly`, `Yearly` toggle → Expected: allocation trend/series changes when rebalancing is applied
- Simulate: charts and numeric metrics populate after analysis (no NaN/undefined)
- Save scenario: after analysis, `Save scenario` persists scenario with given name and shows confirmation

Saved scenarios
- `/saved` shows list of scenarios persisted via browser localStorage (Zustand persist)
- Load: clicking `Load` restores builder fields and series
- Delete: clicking `Delete` removes the scenario and persists change
- Compare link: `Compare` (if present) navigates to `/dashboard?compare=<id>`

Dashboard — Analytics & Comparison
- Default dashboard loads meaningful metrics or friendly empty state
- Growth chart (line) renders portfolio series
- Allocation chart (pie or area) shows allocation breakdown
- Drawdown chart renders drawdown series
- Rolling returns chart renders rolling window returns
- Annual returns chart (bar) renders yearly returns
- Allocation trend/exposure (stacked area) renders over time
- Monthly heatmap renders monthly return grid
- Compare mode: loading `/dashboard?compare=<savedId>` overlays the saved scenario or sets compare mode
- Benchmark overlay: benchmark series can be selected and shown alongside portfolio

Charts & Interactivity
- Tooltips show values on hover
- Legends show series names and toggles (where applicable)
- Axes labels and formats are readable
- No console errors during chart interactions

UI / UX
- Theme toggle in header switches light/dark and persists selection across reloads
- Command palette (Ctrl+K) opens and can navigate to main pages
- Save confirmation (toast or message) appears after saving a scenario
- Loading indicators appear during analysis

Data & Calculation
- Mock NAV data exists (`data/mock-nav.ts`) and provides monthly series (approx 20+ years)
- Series values are finite and plausible (no Inf/NaN)
- `lib/portfolio.ts` functions produce numeric metrics: CAGR, XIRR, max drawdown, volatility, Sharpe, Sortino
- Rebalance and SIP contributions follow expected timing (verify and confirm whether contributions are treated start/end of period)

Export & Placeholders
- Export/Download controls (CSV/PDF/PNG) are present as placeholders or disabled buttons with explanatory text

Accessibility & Mobile
- Basic keyboard navigation: tab order reaches form inputs and primary actions
- Inputs have visible focus states
- Mobile layout (devtools mobile viewport): builder and dashboard remain usable and charts stack vertically

Persistence & Storage
- Saved scenarios persisted in `localStorage` via Zustand persist
- After refresh, saved scenarios remain available

Developer checks
- No leftover `console.log` or `alert()` in production code
- No `any` types that break TypeScript build (build already passed)

How to report results
- Reply with lines like: `Builder — allocation validation: PASS` or `Saved — delete: FAIL — delete button disabled (see console error X)`

If you want, I can:
- Run the dev server here and programmatically check some items (headless browser), or
- Add unit tests for `lib/portfolio.ts` to validate calculation outputs automatically.

Notes / Decisions required
- SIP timing (start vs end of period) and rebalance ordering (before/after contributions) are design decisions that affect results — if you have a preference, note it when reporting checks.
