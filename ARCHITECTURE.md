# Portfolio BackTrack Architecture

## Overview
Portfolio BackTrack is built as a modern single-page financial analytics app using Next.js App Router, TypeScript, and Tailwind CSS. The architecture separates UI components, chart wrappers, calculation utilities, data models, and client state.

## App Router Structure
- `app/layout.tsx` — root HTML layout and metadata
- `app/page.tsx` — landing page
- `app/builder/page.tsx` — portfolio builder shell
- `app/dashboard/page.tsx` — analytics dashboard
- `app/saved/page.tsx` — saved scenarios manager
- `app/docs/page.tsx` — documentation placeholder
- `app/settings/page.tsx` — settings placeholder
- `app/not-found.tsx` — custom 404 page

## Client State & Persistence
- `store/portfolio-store.ts` uses Zustand with `persist` middleware
- Stores:
  - `portfolio` — current portfolio form values
  - `series` — current simulated portfolio series
  - `savedScenarios` — array of persisted portfolio scenario snapshots
- Actions:
  - `setPortfolio(portfolio, series)`
  - `resetPortfolio()`
  - `saveScenario(name, portfolio, series)`
  - `deleteScenario(id)`
  - `loadScenario(id)`

## Data Model
- `types/portfolio.ts` defines domain model types
  - `PortfolioFormValues` includes investment type, SIP frequency, rebalance frequency, allocations, dates, total investment, scenario name
  - `SavedScenario` includes scenario metadata and stored portfolio series
- `data/mock-nav.ts` provides mock historical fund data and generation logic

## Analytics Engine
- `lib/portfolio.ts` is the calculation core
- Provides reusable utilities:
  - `calculateAbsoluteReturn`
  - `calculateCAGR`
  - `calculateDrawdown`
  - `calculateDrawdownSeries`
  - `calculateRollingReturns`
  - `calculateAllocationTrendSeries`
  - `calculateMonthlyHeatmapData`
  - `calculateAnnualReturns`
  - `calculateMonthlyReturns`
  - `calculateVolatility`
  - `calculateSharpeRatio`
  - `calculateSortinoRatio`
  - `calculateXIRR`
  - `comparePortfolioWithBenchmark`
  - `combinePortfolioSeries`
  - `simulatePortfolioSeries`

## UI Layer
- Shared layout and navigation components in `components/`
- Charts are isolated in `charts/` and wrap Recharts primitives
- Form state uses `react-hook-form` and Zod validation in `app/builder/builder-form.tsx`
- Dashboard uses memoized series derivations and chart data preparation

## Styling and Theme
- Tailwind CSS configured with dark mode class strategy
- Custom glass shadow and brand color palette present in `tailwind.config.ts`
- Theme state stored in `localStorage` via `ThemeToggle`

## Routing and Navigation
- Top-level pages are linked from `components/site-header.tsx`
- Command palette allows quick route navigation without router hooks
- Dashboard supports query param driven compare mode via `window.location.search`
- Saved page offers direct compare links back to dashboard

## Design Goals
- Modular reusable components, charts, and utilities
- Clean separation of UI, data, and business logic
- Low-friction phase expansion for analytics, data sources, and export features
- Preserve a dark fintech aesthetic with responsive cards and modern spacing
