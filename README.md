# Portfolio BackTrack

## Overview

Portfolio BackTrack is a Next.js app for building and analyzing custom index fund portfolios with historical performance analytics.

## Run Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run development server:
   ```bash
   npm run dev -- --hostname 127.0.0.1 --port 3000
   ```
3. Open in browser:
   ```
   http://127.0.0.1:3000
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm start` - Run production server after build
- `npm run lint` - Run ESLint checks

## Manual Test Flow

1. Open `/builder`.
2. Create a portfolio with a scenario name, total investment, and allocations that sum to 100%.
3. Choose `Lump Sum` or `SIP`, select dates, and set rebalance frequency.
4. Click `Analyze portfolio`.
5. Open `/dashboard` and verify charts render:
   - Growth chart
   - Allocation pie chart
   - Drawdown chart
   - Rolling returns chart
   - Allocation exposure stacked area chart
   - Monthly return heatmap
6. Test comparison selections:
   - Benchmark fund
   - Saved scenario
7. Open `/saved` and verify scenarios can be loaded and deleted.

## Notes

- `PROJECT_SUMMARY.md` contains the current project status and feature summary.
- `requirements_plan.txt` tracks phase progress and remaining goals.
