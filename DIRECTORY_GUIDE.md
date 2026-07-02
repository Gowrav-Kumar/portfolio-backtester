# Portfolio BackTrack Directory Guide

## Root
- `.eslintrc.cjs` — ESLint configuration for the repository
- `eslint.config.js` — flat ESLint config for TypeScript and React
- `package.json` — scripts, dependencies, and devDependencies
- `tsconfig.json` — TypeScript compiler configuration and path aliases
- `tailwind.config.ts` — Tailwind CSS theme settings and content paths
- `next.config.mjs` — Next.js runtime options
- `README.md` — how to run and manually test the app
- `PROJECT_SUMMARY.md` — current project status and known focus areas
- `requirements_plan.txt` — implementation phase plan and future scope
- `PROJECT_HANDOFF.md` — primary handoff artifact
- `AI_CONTEXT.md` — AI-specific context notes
- `CODEBASE_INDEX.md` — index listing of main source files
- `ARCHITECTURE.md` — architecture overview
- `DIRECTORY_GUIDE.md` — this folder guide
- `DEVELOPMENT_ROADMAP.md` — roadmap for future work
- `CONTINUE_PROJECT_PROMPT.md` — prompt for the next AI assistant
- `PROJECT_MAP.md` — suggested project navigation map

## app/
This folder contains route-driven pages implemented with Next.js App Router.
- `layout.tsx` — root HTML structure and metadata
- `page.tsx` — home/landing page
- `builder/page.tsx` — portfolio builder route
- `builder/builder-form.tsx` — builder form and simulation logic
- `dashboard/page.tsx` — analytics dashboard route
- `saved/page.tsx` — saved scenario manager route
- `saved/compare/page.tsx` — saved scenario comparison route
- `settings/page.tsx` — placeholder settings route
- `docs/page.tsx` — placeholder docs route
- `not-found.tsx` — custom 404 page

## components/
Reusable UI pieces that are shared across pages.
- `site-header.tsx` — top navigation and command palette trigger
- `site-footer.tsx` — footer content
- `page-shell.tsx` — wrapper for pages that need header + footer
- `section-card.tsx` — landing page section card
- `metrics-summary.tsx` — metrics grid used in dashboard
- `dashboard-sidebar.tsx` — dashboard navigation sidebar
- `breadcrumbs.tsx` — breadcrumb trail component
- `command-palette.tsx` — command palette overlay
- `theme-toggle.tsx` — dark/light mode toggle with persistence

## charts/
Reusable chart components that wrap Recharts types.
- `line-chart.tsx` — line chart for growth and risk series
- `bar-chart.tsx` — annual returns bar chart
- `area-chart.tsx` — allocation exposure stacked area chart
- `pie-chart.tsx` — allocation distribution pie chart
- `heatmap-chart.tsx` — monthly heatmap visualization

## data/
Mock data generation and fund series definitions.
- `mock-nav.ts` — fund definitions and deterministic monthly NAV series generator

## lib/
Business logic and analytics utilities.
- `portfolio.ts` — portfolio simulation engine and financial calculation helper library

Notes:
- Keep business logic in `lib/portfolio.ts`. The Builder UI (`app/builder/builder-form.tsx`) wires form inputs to these utilities — avoid duplicating formulas in UI code.

## store/
Client state and persistence store.
- `portfolio-store.ts` — Zustand store for current portfolio, saved scenarios, and persistence

## types/
Type definitions and domain models.
- `portfolio.ts` — portfolio inputs, allocations, scenario data, and investment type definitions

## Notes
- Keep generated or build artifacts outside this structure
- Use path aliases defined in `tsconfig.json` to import from `@/` paths
- New modules should follow the existing directory grouping: UI in components, charts in charts, data in data, business logic in lib, state in store, and domain types in types
