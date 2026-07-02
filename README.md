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
7. Open `/saved` and verify scenarios can be loaded, compared, and deleted.
8. Open `/saved/compare` and verify saved scenarios can be selected and compared side-by-side.

## Notes

- `PROJECT_SUMMARY.md` contains the current project status and feature summary.
- `requirements_plan.txt` tracks phase progress and remaining goals.
 
## Important notes about data and current behaviors

- The app uses synthetic mock NAV data from `data/mock-nav.ts` for development and testing. This is not production market data — see `DATA_LAYER.md` for guidance on adding a real data source.

## Quick verification steps (allocation behavior)

To verify the allocation input behavior (typing/backspace), open the builder and perform this sequence:

1. Navigate to `/builder`.
2. For the first allocation input (Large Cap), change the value from `50` to `5` by deleting the last digit, and confirm the `Allocation total` updates to reflect `5,30,20` (should show `55%`) and `Analyze portfolio` is disabled.
3. Type `2` to make the first allocation `52` and confirm the total updates to `102%` and `Analyze portfolio` remains disabled.

These checks validate the immediate update behavior implemented in the recent session.
