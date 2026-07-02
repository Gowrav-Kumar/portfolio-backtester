# Project Map

## Core Entry Points
- `app/page.tsx` — Landing page and product overview
- `app/builder/page.tsx` — Portfolio builder flow
- `app/dashboard/page.tsx` — Analytics dashboard and comparison view
- `app/saved/page.tsx` — Saved scenarios and compare actions

## Utility Layers
- `lib/portfolio.ts` — Simulation engine and financial metrics
- `data/mock-nav.ts` — Mock NAV data generation for funds
- `store/portfolio-store.ts` — Zustand state persistence for scenarios
- `types/portfolio.ts` — Domain types and form models

## UI Components
- `components/site-header.tsx` — Navigation bar and command palette trigger
- `components/theme-toggle.tsx` — Dark/light theme control
- `charts/*` — Reusable chart components for line, bar, area, pie, heatmap

## Documentation and Handoff Files
- `PROJECT_SUMMARY.md` — current project status and focus
- `ARCHITECTURE.md` — system architecture overview
- `DEVELOPMENT_ROADMAP.md` — recommended next steps
- `DIRECTORY_GUIDE.md` — folder structure reference
- `CONTINUE_PROJECT_PROMPT.md` — AI continuation prompt
- `PROJECT_HANDOFF.md` — handoff narrative
- `AI_CONTEXT.md` — additional AI-specific context notes

## Suggested Navigation
1. Read the root-level docs first
2. Review the builder form and portfolio utility methods
3. Validate saved scenario state persistence and compare flow
4. Open dashboard charts to understand derived data and compare logic
5. Extend or refine analytics with a new page or chart component

## High-Level Dependencies
- Next.js 16 App Router
- React 19 / TypeScript
- Tailwind CSS
- Zustand with `persist`
- Recharts for charting
- React Hook Form + Zod for validation

Recent session delta:
- Builder form: allocation immediate-update fixes, calendar popup, allocation total moved into header, and improved gating for `Analyze`.
- Temporary debug hooks were used and then removed after verification.

## Known Gaps / Opportunity Areas
- A dedicated saved-scenario compare page exists at `app/saved/compare/page.tsx`; improve layout and scenario selection
- Portfolio export/report generation is placeholder-worthy
- Data layer is currently mock-only and should be abstracted for later API integration
- Testing coverage is minimal or absent
