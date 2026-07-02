# Portfolio BackTrack AI Handoff

## Purpose
This document is the primary AI handoff package for Portfolio BackTrack. It provides the current implementation state, the codebase architecture, routing and page behavior, the calculation and data model, and the remaining roadmap. Use this file together with the companion docs to onboard a new AI assistant.

## Current State
- **Next.js App Router** with `app/` pages and client components
- **Portfolio builder** with validation for allocations, SIP, and rebalance options
- **Saved scenarios** persisted to browser storage via Zustand
- **Dashboard analytics** including growth, allocation, drawdown, rolling returns, annual returns, allocation exposure, and monthly heatmap
- **Dedicated saved scenario compare page** at `app/saved/compare/page.tsx`
- **Dashboard comparison support** via benchmark funds, saved scenario compare mode, and query-param driven comparisons
- **UI polish** with theme toggle, command palette, breadcrumbs, dashboard sidebar, modern dark theme, and glassmorphism design
- **Quality validation**: `npm run build` passes after recent fixes
- **Recent fixes**: allocation inputs now update RHF state immediately while typing/backspacing, allocation total rounding/tolerance added, calendar popup implemented, theme toggle delay eliminated, and temporary debug hooks removed.

## Project Artifacts
- `README.md` — run instructions and manual verification steps
- `PROJECT_SUMMARY.md` — project status, phase, and next steps
- `requirements_plan.txt` — roadmap and phase definitions
- `package.json` — dependencies and scripts
- `tsconfig.json` — TypeScript path aliases and compiler settings
- `eslint.config.js` — project lint config
- `tailwind.config.ts` — theme, dark mode, and utility settings

## Primary Next Actions
1. Enhance the saved scenario comparison page with richer charts, metrics, and scenario selection feedback
2. Improve SIP/rebalancing simulation logic and portfolio engine accuracy
3. Add export/report placeholders for CSV, PDF, image output
4. Refine mock NAV realism or swap to API-driven historical data
5. Add test coverage for calculation utilities and key components

## Notes for the next AI assistant
- This project uses **Zustand persist** for saved scenarios only, not the current working portfolio state by default
- The dashboard uses client-side state and a `useEffect` query param hydration flow for saved scenario comparisons
- `lib/portfolio.ts` is the central analytics engine; extend it carefully using existing typed utility functions
- Avoid accidentally altering `.next/` contents; these are generated build files and should not be edited

---

## File references
- `app/builder/builder-form.tsx` — portfolio builder form and simulation
- `app/dashboard/page.tsx` — analytics dashboard
- `app/saved/page.tsx` — saved scenarios manager
- `app/saved/compare/page.tsx` — dedicated scenario compare page
- `app/page.tsx` — landing page
- `components/*` — shared UI and navigation components
- `charts/*` — reusable Recharts components
- `data/mock-nav.ts` — fund mock data and series generator
- `lib/portfolio.ts` — portfolio calculation utilities
- `store/portfolio-store.ts` — Zustand state store
- `types/portfolio.ts` — shared portfolio types
- `requirements_plan.txt` — current phase plan and handoff context
- `PROJECT_SUMMARY.md` — project summary status
