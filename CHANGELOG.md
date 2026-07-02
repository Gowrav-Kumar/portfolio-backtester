# Changelog

## Session Summary (2026-07-01)
- Fixed allocation input binding in `app/builder/builder-form.tsx` so allocation values update immediately while typing/backspacing (switched `Controller` usage to register `name`/`ref` and use `onInput`).
- Implemented tolerant allocation total computation (rounded to 2 decimals) and robust validity gating so `Analyze portfolio` enables only when allocations sum to 100% and required fields are valid.
- Replaced native date inputs with a themed compact calendar popup supporting quick month/year selection.
- Repositioned the Allocation total UI into the Fund allocations header and tightened layout.
- Removed temporary debug exports used during troubleshooting and verified successful builds.
- Added local QA/Playwright plan and updated documentation files to reflect current state.

All changes were tested via local build and interactive page checks. Further automated tests (Playwright e2e and unit tests) are recommended in the roadmap.

## Unreleased (2026-07-02)
- Add dedicated saved scenario comparison page (`app/saved/compare`) with aligned overlay series and disabled self-selection.
- Improve series alignment and comparison scaling in `lib/portfolio.ts` (`alignSeriesByDate`, `comparePortfolioWithBenchmark`).
- Fix chart tooltip rendering for zero-valued comparisons in `charts/line-chart.tsx`.
- Wire saved scenarios management UI to surface compare CTA on `app/saved/page.tsx`.
- Add unit tests covering date-alignment and comparison utilities (`tests/portfolio.test.ts`).

