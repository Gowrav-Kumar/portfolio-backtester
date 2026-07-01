# Continue Project Prompt

The goal is to continue development on Portfolio BackTrack, a Next.js + TypeScript fintech portfolio backtesting web app. The app is already functional for building portfolios, simulating historical returns, saving scenarios, and viewing dashboard analytics.

## What you should do first
1. Read the existing docs: `README.md`, `PROJECT_SUMMARY.md`, `requirements_plan.txt`, and the new handoff docs in the repo root.
2. Inspect `app/builder/builder-form.tsx`, `app/dashboard/page.tsx`, `app/saved/page.tsx`, `lib/portfolio.ts`, and `store/portfolio-store.ts`.
3. Verify the app still builds and lints cleanly with:
   - `npm run lint -- --max-warnings=0`
   - `npm run build`
4. Identify the next user-facing improvement and implement it incrementally.

## Current implementation state
- Portfolio builder supports lump sum and SIP form inputs
- Dashboard shows portfolio growth, allocation, drawdown, rolling returns, annual returns, allocation exposure, and heatmap
- Saved scenarios page allows load, compare, and delete actions
- Comparison uses benchmark or scenario selections in the dashboard
- Theme toggle and command palette exist

## Priority work items
1. Build a dedicated saved scenario comparison page or dashboard tab.
2. Improve portfolio simulation accuracy for SIP and rebalancing.
3. Add export/report placeholders for CSV/PDF/PNG flows.
4. Extend historical nav data realism or add API abstraction.
5. Add test coverage for core utilities and pages.

## Quality constraints
- Keep the existing folder structure and import alias conventions
- Avoid editing generated `.next/` contents
- Preserve the dark fintech UI and Tailwind utility patterns
- Update documentation files when making architecture or roadmap changes

## Useful references
- `types/portfolio.ts`
- `data/mock-nav.ts`
- `lib/portfolio.ts`
- `store/portfolio-store.ts`
- `app/dashboard/page.tsx`
- `components/*`
- `charts/*`
- `tailwind.config.ts`

## Key considerations for AI
- The codebase currently has a clean build and lint state
- Saved scenarios are persisted in local storage using Zustand persist
- Query param compare flows are done client-side
- Extend analytics only after verifying the current metrics and chart data paths
- Document any new feature or phase advancement clearly in `PROJECT_SUMMARY.md` and `requirements_plan.txt`
