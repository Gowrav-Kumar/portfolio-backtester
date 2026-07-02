# Calculation Engine (lib/portfolio.ts)

This document describes the calculation utilities implemented in `lib/portfolio.ts` and how to extend or audit them.

Key exports and responsibilities:
- `simulatePortfolioSeries(series, options)` — combines fund series according to allocations, payment schedules (Lump Sum vs SIP), and rebalance rules to produce a time series of portfolio value.
- `calculateAbsoluteReturn(startValue, endValue)` — simple percentage change over period.
- `calculateCAGR(startValue, endValue, years)` — compound annual growth rate calculation.
- `calculateDrawdown(series)` — maximum drawdown percentage.
- `calculateMonthlyReturns(series)` / `calculateAnnualReturns(series)` — period returns used by volatility calculations.
- `calculateVolatility(monthlyReturns)` — annualized volatility.
- `calculateSharpeRatio(monthlyReturns)` — uses risk-free rate assumption (documented in code) to compute Sharpe.
- `calculateSortinoRatio(monthlyReturns)` — downside-sortino variant implementation.
- `calculateXIRR(cashFlows)` — irregular IRR calculation for lump sum and SIP flows.
- `calculateAllocationTrendSeries(...)` — creates time-varying allocation exposure series for stacked area charts.

Notes & Recommendations:
- Keep all financial formulas centralized in `lib/portfolio.ts`. If performance becomes a concern, extract pure functions for unit testing and optimization.
- Add unit tests for edge cases: zero-length series, all-zero allocations, monthly vs yearly SIP timing, and rebalance rounding.
- Document assumptions inline (e.g., whether SIP contributions happen at period start or end, rebalancing rounding strategy, risk-free rate used for Sharpe).