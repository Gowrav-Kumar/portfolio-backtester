import { describe, it, expect } from 'vitest';
import {
  calculateCAGR,
  calculateDrawdown,
  simulatePortfolioSeries,
  alignSeriesByDate,
  comparePortfolioWithBenchmark,
  TimeSeriesPoint
} from '../lib/portfolio';

describe('portfolio utils', () => {
  it('calculates CAGR correctly', () => {
    const start = 100;
    const end = 200;
    const years = 3;
    const cagr = calculateCAGR(start, end, years);
    // (2)^(1/3)-1 -> ~0.259921, *100 -> ~25.9921
    expect(Number(cagr.toFixed(2))).toBeCloseTo(25.99, 2);
  });

  it('calculates max drawdown correctly', () => {
    const series: TimeSeriesPoint[] = [
      { date: '2020-01-01', value: 100 },
      { date: '2020-02-01', value: 80 },
      { date: '2020-03-01', value: 120 }
    ];

    const dd = calculateDrawdown(series);
    expect(Number(dd.toFixed(2))).toBeCloseTo(20, 2);
  });

  it('simulates simple lump sum portfolio correctly', () => {
    const seriesList = [
      {
        fundId: 'f1',
        series: [
          { date: '2020-01-01', nav: 10 },
          { date: '2020-02-01', nav: 12 },
          { date: '2020-03-01', nav: 14 }
        ],
        allocation: 100
      }
    ];

    const options = {
      totalInvestment: 1000,
      investmentType: 'lumpSum' as const,
      sipFrequency: 'monthly' as const,
      rebalance: 'none' as const,
      startDate: '2020-01-01',
      endDate: '2020-03-01'
    };

    const result = simulatePortfolioSeries(seriesList, options);
    expect(result).toHaveLength(3);
    expect(result[0].value).toBeCloseTo(1000, 2);
    expect(result[1].value).toBeCloseTo(1200, 2);
    expect(result[2].value).toBeCloseTo(1400, 2);
  });

  it('aligns series by date and fills gaps', () => {
    const left = [
      { date: '2020-01-01', value: 100 },
      { date: '2020-03-01', value: 120 }
    ];
    const right = [
      { date: '2020-02-01', value: 80 },
      { date: '2020-03-01', value: 90 }
    ];

    const [alignedLeft, alignedRight] = alignSeriesByDate(left, right);
    expect(alignedLeft).toEqual([
      { date: '2020-01-01', value: 100 },
      { date: '2020-02-01', value: 100 },
      { date: '2020-03-01', value: 120 }
    ]);
    expect(alignedRight).toEqual([
      { date: '2020-01-01', value: 0 },
      { date: '2020-02-01', value: 80 },
      { date: '2020-03-01', value: 90 }
    ]);
  });

  it('compares portfolio with benchmark using aligned dates', () => {
    const portfolioSeries = [
      { date: '2020-01-01', value: 100 },
      { date: '2020-03-01', value: 120 }
    ];
    const benchmarkSeries = [
      { date: '2020-02-01', value: 80 },
      { date: '2020-03-01', value: 90 }
    ];

    const result = comparePortfolioWithBenchmark(portfolioSeries, benchmarkSeries);
    expect(result).toEqual([
      { date: '2020-01-01', value: 100, comparisonValue: 0 },
      { date: '2020-02-01', value: 100, comparisonValue: 80 * (100 / 80) },
      { date: '2020-03-01', value: 120, comparisonValue: 90 * (100 / 80) }
    ].map((item) => ({ ...item, comparisonValue: Number(item.comparisonValue.toFixed(2)) })));
  });
});
