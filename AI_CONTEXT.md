# AI Context for Portfolio BackTrack

## Project Overview
Portfolio BackTrack is a fintech-style portfolio backtesting web app built with Next.js, React, TypeScript, Tailwind CSS, Recharts, React Hook Form, Zod, and Zustand. The app is designed to let investors build custom portfolios, simulate historical returns, and compare performance against benchmarks or saved scenarios.

## Architectural Style
- **App Router** with server and client components
- **Client state** managed by Zustand for portfolio data and scenario persistence
- **Component-driven UI** with reusable charts and layout components
- **Tailwind CSS** for styling with dark theme support and modern design
- **TypeScript** strict mode enabled
- **Analytics engine** in `lib/portfolio.ts`

## Key Code Areas
- `app/` — routing pages and layouts
- `components/` — shared UI building blocks (header, navigation, footer, metrics, etc.)
- `charts/` — Recharts wrappers for line, bar, area, pie, and heatmap charts
- `data/` — mock NAV generation and fund definitions
- `lib/portfolio.ts` — portfolio time series generation and metrics calculations
- `store/` — Zustand store for current portfolio, saved scenarios, and persistence
- `types/portfolio.ts` — domain types for portfolio inputs and saved scenarios

## Important Dependencies
- `next` — app framework
- `react` / `react-dom` — UI library
- `typescript` — static typing
- `tailwindcss` — styling utility library
- `react-hook-form` — form state management
- `zod` — schema validation
- `recharts` — data visualization
- `zustand` — client state management
- `eslint` — linting

## Current Implementation Notes
- The dashboard uses client-side query parsing in `useEffect` to support `?compare=<id>` behavior
- `saved` page supports loading and deleting scenarios, as well as direct compare links to the dashboard
- `builder-form` validates allocation totals with Zod and can save scenarios after analysis
- Some pages remain placeholder UIs (`/settings`, `/docs`, landing page content) and are not fully functional features

## Hand-off Guidance
- Preserve the current app structure and path aliases when adding new files
- Keep styles consistent with the existing dark fintech theme and use Tailwind utility variants
- Extend the calculation engine using the existing `TimeSeriesPoint` type and fund series model
- Prefer incremental improvements and avoid mixing placeholder features into MVP flows
- Document any changes to phases in `requirements_plan.txt` and update `PROJECT_SUMMARY.md`
