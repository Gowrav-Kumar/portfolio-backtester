# Portfolio BackTrack Action Plan

## Summary of current issues
1. **Builder analysis flow is incomplete**
   - `Analyze portfolio` executes simulation but the Builder page does not show results, charts, or metrics.
   - The builder form keeps `SIP frequency` visible even when `Lump Sum` is selected.
   - Allocation validation exists in code, but the user report suggests the UI is not making the validation obvious.

2. **Dashboard navigation and empty state gaps**
   - Dashboard sidebar links target anchors like `#growth`, `#performance`, `#risk`, `#comparisons`, but the page does not include matching section IDs.
   - The dashboard can render default synthetic data, making it unclear where values come from.
   - No clear empty state or instruction when no scenario has been analyzed or loaded.

3. **Theme support is partial**
   - Theme toggle writes `dark` class to `html`, but global CSS forces dark mode via `:root { color-scheme: dark; }` and the app has no complete light-mode styles.
   - This makes light theme appear broken or ineffective.

4. **Data source is mock/synthetic**
   - Current `data/mock-nav.ts` generates deterministic synthetic NAV series for Large Cap, Mid Cap, Small Cap.
   - This is fine for development, but it is not actual historical fund data and should be replaced with a static dataset later.

5. **Home page builder preview is placeholder-like**
   - The home page shows a builder section with labels but no functional form controls.
   - This can confuse users into thinking the builder is absent or broken.

## Immediate fixes (Phase 1)
1. **Fix Builder UX and validation**
   - Add a results panel to `app/builder/builder-form.tsx` that shows:
     - portfolio growth chart
     - key metrics (Absolute return, CAGR, drawdown, volatility, Sharpe, Sortino, XIRR)
     - current allocation breakdown
   - Hide `SIP frequency` when `investmentType === 'lumpSum'`.
   - Add a visible error badge/message when allocations total is not 100%.
   - Disable the Analyze button until the form is valid or show inline guidance.
   - Show a clear save confirmation message after `Save scenario`.

2. **Improve Dashboard clarity**
   - Add anchor IDs to the dashboard sections so sidebar links work.
   - Add a friendly empty state when there is no current portfolio series:
     - e.g. "Analyze a portfolio in /builder or load a saved scenario to see charts." 
   - Make comparison mode more transparent with labels and selected series details.
   - Add a short note near metrics explaining they are generated from mock historical NAV series.

3. **Restore proper theme support**
   - Remove or make `color-scheme` dynamic in `app/globals.css`.
   - Add a `light` CSS variant or Tailwind classes to support both themes.
   - Ensure the `ThemeToggle` button actually changes page background/text and persists across reloads.

4. **Document/mock data origin**
   - Add a clear note in `README.md` or `AI_CONTEXT.md` that fund data is currently synthetic and must be replaced with static 1995–2024 historical NAV data.
   - Flag `data/mock-nav.ts` as mock-only.

## Secondary fixes (Phase 2)
1. **Build proper financial validation and explanation**
   - Audit `lib/portfolio.ts` formulas for
     - drawdown calculations
     - rolling returns
     - volatility annualization
     - Sharpe and Sortino ratio assumptions
     - XIRR cash flow timing
   - Add code comments documenting how each metric is calculated.
   - Confirm whether SIP contributions are treated at the beginning or end of each payment period.

2. **Add saved-scenario and compare UX polish**
   - Improve `/saved` with explicit scenario compare controls.
   - Add compare buttons/links to `/dashboard` that load a saved scenario into compare mode.
   - Add a dedicated compare page or comparison tab as future work.

3. **Add tests**
   - Add unit tests for `lib/portfolio.ts` metrics and simulation flows.
   - Add a smoke test for builder analysis and dashboard rendering if time allows.

4. **Improve home page content**
   - Replace placeholder builder preview text with actual feature highlights or a direct CTA to `/builder`.
   - If the homepage should show a mini builder, implement it separately.

## Suggested immediate next actions
1. Fix Builder form result display and validation.
2. Fix Dashboard anchor navigation and add a helpful empty state.
3. Fix theme toggle and global styling for light mode.
4. Add a documentation note that the app currently uses synthetic mock NAV data.

## Proposed file updates
- `app/builder/builder-form.tsx`
- `app/dashboard/page.tsx`
- `app/globals.css`
- `components/theme-toggle.tsx`
- `README.md` or `AI_CONTEXT.md`
- `ACTION_PLAN.md` (this file)

## Notes for implementation
- The current implementation does not yet produce visible builder analytics output in the builder page.
- The dashboard metrics are based on synthetic data from `data/mock-nav.ts`, not live market data.
- The dashboard menu items are currently non-functional anchor links because matching section IDs are missing.
- Light theme support is intended but not fully implemented.

---

If you want, I can start by fixing the Builder page output and validation first, then move to dashboard anchors and theme support.