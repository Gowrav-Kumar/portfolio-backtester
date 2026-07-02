# Portfolio BackTrack Codebase Index

## Root Files
- `package.json` — dependency list and scripts
- `tsconfig.json` — TypeScript compiler options and path aliases
- `eslint.config.js` — ESLint flat config for TypeScript/React
- `tailwind.config.ts` — Tailwind CSS content paths and theme extensions
- `next.config.mjs` — Next.js configuration
- `README.md` — local run instructions and manual test flow
- `PROJECT_SUMMARY.md` — current project summary and status
- `requirements_plan.txt` — phased plan, roadmap, and future goals
- `PROJECT_HANDOFF.md` — primary handoff document
- `AI_CONTEXT.md` — AI-specific context and architecture notes
- `CODEBASE_INDEX.md` — this file
- `ARCHITECTURE.md` — architecture overview
- `DIRECTORY_GUIDE.md` — folder descriptions
- `DEVELOPMENT_ROADMAP.md` — implementation roadmap
- `CONTINUE_PROJECT_PROMPT.md` — prompt for the next AI assistant
- `PROJECT_MAP.md` — project navigation and decision map

## App Folder
- `app/page.tsx` — landing page with project overview and quick links
- `app/builder/page.tsx` — portfolio builder page shell with form component
- `app/builder/builder-form.tsx` — portfolio builder form, validation, simulation, and save logic
- `app/dashboard/page.tsx` — analytics dashboard with chart panels, comparison controls, and summary cards
- `app/saved/page.tsx` — saved scenario list, load, compare, and delete actions
- `app/settings/page.tsx` — placeholder settings page
- `app/docs/page.tsx` — documentation page placeholder
- `app/layout.tsx` — root layout and HTML metadata
- `app/not-found.tsx` — custom 404 page
- `app/globals.css` — global CSS imports and base styles

## Components Folder
- `components/site-header.tsx` — navigation header with command palette and theme toggle
- `components/site-footer.tsx` — footer content
- `components/page-shell.tsx` — page wrapper with header and footer
- `components/section-card.tsx` — card wrapper for landing page sections
- `components/metrics-summary.tsx` — metric summary grid
- `components/dashboard-sidebar.tsx` — dashboard section navigation
- `components/breadcrumbs.tsx` — breadcrumb navigation component
- `components/command-palette.tsx` — keyboard-triggered command palette overlay
- `components/theme-toggle.tsx` — theme toggle with localStorage persistence

## Charts Folder
- `charts/line-chart.tsx` — growth and metric line chart wrapper
- `charts/bar-chart.tsx` — annual returns bar chart wrapper
- `charts/area-chart.tsx` — allocation exposure stacked area chart
- `charts/pie-chart.tsx` — allocation breakdown pie chart
- `charts/heatmap-chart.tsx` — monthly return heatmap chart

## Data Folder
- `data/mock-nav.ts` — mock fund definitions, deterministic NAV series generation, and series lookup helper

## Lib Folder
- `lib/portfolio.ts` — portfolio calculation utilities, simulation engine, benchmark comparison, and metric helpers

- `CHANGELOG.md` — project change log and session summaries (added)
- `CALCULATION_ENGINE.md` — documentation for the calculation utilities (added)
- `DATA_LAYER.md` — documentation for mock data and recommended data layer changes (added)
- `UI_SYSTEM.md` — documentation for UI components and theme (added)

## Store Folder
- `store/portfolio-store.ts` — Zustand store for current portfolio, saved scenarios, and persistence middleware

## Types Folder
- `types/portfolio.ts` — domain types for portfolio inputs, allocations, saved scenarios, and investment/rebalance options

## Notes
- `.next/` and `node_modules/` are generated artifacts and should not be included in edits unless absolutely necessary
- This codebase uses path aliases via `tsconfig.json` so imports are absolute from `@/` paths
- `app/` pages are mostly client-side React components and rely on `use client` where hooks are used
