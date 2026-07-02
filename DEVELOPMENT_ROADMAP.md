# Portfolio BackTrack Development Roadmap

## Completed Phases
- **Phase 1**: App shell, Next.js setup, Tailwind, page layout, landing page, basic routing
- **Phase 2**: Mock NAV data layer and portfolio calculation utilities
- **Phase 3**: Portfolio builder UI, allocation validation, form state management
- **Phase 4**: Dashboard charts, metric summary, portfolio analytics, and comparisons
- **Phase 5**: Extended analytics, comparison controls, saved scenarios UI, theme toggle, command palette, and mobile UX polish

## Current Phase
- **Phase 6 – Review & Stabilize**
  - Code cleanup and lint stabilization
  - Feature validation and documentation
  - Saved scenario comparison wiring and route integration
  - Legend and UI messaging refinement

Recent progress:
- Allocation input binding and immediate validation fixes completed.
- The date calendar popup and allocation UI reposition were implemented.
- Temporary debug hooks have been removed and builds pass.

## High Priority Next Work
1. **Saved Scenario Comparison Page**
   - Improve the existing compare page with richer metrics, clearer scenario selection, and comparison chart layout
   - Include scenario selection, side-by-side metrics, and benchmark overlay
2. **SIP and Rebalance Accuracy**
   - Enhance `simulatePortfolioSeries` and `calculateAllocationTrendSeries`
   - Validate monthly/quarterly/yearly contribution and rebalance logic
3. **Export/Report Placeholders**
   - Add UI stubs for CSV, PDF, and image export
   - Connect placeholders to a future export service
4. **Mock Data Realism / API Swap**
   - Improve `data/mock-nav.ts` generation realism
   - Create a data abstraction layer to plug in API-backed series later
5. **Testing and Quality**
   - Add unit tests for `lib/portfolio.ts` utility functions
   - Add snapshot or integration tests for chart page rendering
   - Ensure `npm run lint -- --max-warnings=0` remains green

## Medium Priority Improvements
- Build a proper settings page for preferences and theme defaults
- Add loading skeletons or transitions for chart data
- Enhance the dashboard sidebar to include direct chart anchors
- Add more analytics metrics (win rate, best/worst year, recovery time)
- Improve mobile dashboard layout and chart stacking behavior

## Future Expansion
- Monte Carlo simulation page
- API/integration layer for historical price data
- Authentication and user accounts
- Report export generation (PDF/CSV/PNG)
- Scenario sharing and collaboration features

## Quick Wins for the Next AI
- Add `Scenario comparison` tab to `/saved`
- Create a dedicated dashboard `compare` query parser helper utility
- Improve `ThemeToggle` to support system preference on initial load
- Document `lib/portfolio.ts` formulas and any assumptions in code comments
- Add `app/builder/form-status.tsx` message area for analysis/save feedback
- Add Playwright e2e test for allocation typing/backspace scenario (50 -> backspace -> 5 -> type 2)
