# Continue Project Prompt

The goal is to continue development on Portfolio BackTrack, a Next.js + TypeScript fintech portfolio backtesting web app. The app is already functional for building portfolios, simulating historical returns, saving scenarios, and viewing dashboard analytics.

## Read-This-First (one-shot checklist)
Start here before editing code — this ensures you follow project conventions and avoid duplicate work.

1. Open and read these files in order:
   - `CONTINUE_PROJECT_PROMPT.md` (this file)
   - `AI_CONTEXT.md` and `PROJECT_HANDOFF.md`
   - `CODEBASE_INDEX.md` and `DIRECTORY_GUIDE.md`
   - `CALCULATION_ENGINE.md` and `DATA_LAYER.md`
   - `UI_SYSTEM.md` and `ARCHITECTURE.md`
   - `DEVELOPMENT_ROADMAP.md` and `CHANGELOG.md`
2. Run quick verification locally:
   - `npm run lint -- --max-warnings=0`
   - `npm run build`
   - `npm run dev` and exercise `/builder` allocation typing/backspace scenario (see `README.md` steps)
3. Inspect these critical source files before coding:
   - `app/builder/builder-form.tsx`
   - `lib/portfolio.ts`
   - `data/mock-nav.ts`
   - `store/portfolio-store.ts`
   - `app/dashboard/page.tsx` and `app/saved/page.tsx`

Note: Avoid re-introducing temporary debug hooks and update existing docs in place when behavior or architecture changes.


## What you should do first
1. Read the existing docs: `README.md`, `PROJECT_SUMMARY.md`, `requirements_plan.txt`, and the new handoff docs in the repo root.
2. Inspect `app/builder/builder-form.tsx`, `app/dashboard/page.tsx`, `app/saved/page.tsx`, `lib/portfolio.ts`, and `store/portfolio-store.ts`.
3. Verify the app still builds and lints cleanly with:
   - `npm run lint -- --max-warnings=0`
   - `npm run build`
4. Identify the next user-facing improvement and implement it incrementally.

## Current implementation state

## Priority work items
1. Enhance the existing saved scenario comparison page and review compare UI flows.
2. Improve portfolio simulation accuracy for SIP and rebalancing.
3. Add export/report placeholders for CSV/PDF/PNG flows.
4. Extend historical nav data realism or add API abstraction.
5. Add test coverage for core utilities and pages.

## Quality constraints

## Useful references

## Key considerations for AI

The next AI should follow this basic onboarding flow:
 - Preserve the current app structure and path aliases when adding new files
 - Keep styles consistent with the existing dark fintech theme and use Tailwind utility variants
 - Extend the calculation engine using the existing `TimeSeriesPoint` type and fund series model
 - Prefer incremental improvements and avoid mixing placeholder features into MVP flows
 - Document any changes to phases in `requirements_plan.txt` and update `PROJECT_SUMMARY.md`

Additional immediate steps for the next AI (based on the current state):
1. Read the updated docs in this repo (`README.md`, `AI_CONTEXT.md`, `ARCHITECTURE.md`, `CHANGELOG.md`, `CALCULATION_ENGINE.md`, `DATA_LAYER.md`, `UI_SYSTEM.md`).
2. Inspect `app/builder/builder-form.tsx` to understand the current allocation input wiring (uses `Controller` with `onInput`) and calendar popup implementation.
3. Avoid re-introducing temporary debug hooks; they have been removed.
4. Add Playwright e2e tests for the allocation typing/backspace scenario and unit tests for `lib/portfolio.ts` formulas.
5. Prioritize completing Builder results rendering (ensuring Analyze reliably shows charts and metrics) before changing dashboard anchor behavior.

When ready, run a full build (`npm run build`) and the development server (`npm run dev`) and manually exercise the builder allocation flows before committing major refactors.
