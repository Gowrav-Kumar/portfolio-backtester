import { NavPoint } from '@/data/mock-nav';

export type TimeSeriesPoint = {
  date: string;
  value: number;
};

export type PortfolioSeriesOptions = {
  totalInvestment: number;
  investmentType: 'lumpSum' | 'sip';
  sipFrequency: 'monthly' | 'quarterly' | 'yearly';
  rebalance: 'none' | 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  endDate: string;
};

export function calculateAbsoluteReturn(startValue: number, endValue: number) {
  return (endValue / startValue - 1) * 100;
}

export function calculateCAGR(startValue: number, endValue: number, years: number) {
  if (years <= 0 || startValue <= 0) return 0;
  return (Math.pow(endValue / startValue, 1 / years) - 1) * 100;
}

export function calculateDrawdown(series: TimeSeriesPoint[]) {
  let peak = series[0]?.value ?? 0;
  let maxDrawdown = 0;

  for (const point of series) {
    peak = Math.max(peak, point.value);
    const drawdown = (point.value - peak) / peak;
    maxDrawdown = Math.min(maxDrawdown, drawdown);
  }

  return Math.abs(maxDrawdown) * 100;
}

export function calculateDrawdownSeries(series: TimeSeriesPoint[]) {
  let peak = series[0]?.value ?? 0;
  return series.map((point) => {
    peak = Math.max(peak, point.value);
    const drawdown = peak === 0 ? 0 : ((point.value - peak) / peak) * 100;
    return { date: point.date, value: Number(drawdown.toFixed(2)) };
  });
}

export function calculateRollingReturns(series: TimeSeriesPoint[], window = 12) {
  if (series.length <= window) return [];

  return series.slice(window).map((point, index) => {
    const prior = series[index].value;
    const rolling = prior <= 0 ? 0 : ((point.value - prior) / prior) * 100;
    return { date: point.date, value: Number(rolling.toFixed(2)) };
  });
}

const fundCategoryLabels: Record<string, 'Large Cap' | 'Mid Cap' | 'Small Cap'> = {
  'large-cap-a': 'Large Cap',
  'mid-cap-b': 'Mid Cap',
  'small-cap-c': 'Small Cap'
};

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function calculateAllocationTrendSeries(
  seriesList: { fundId: string; series: NavPoint[]; allocation: number }[],
  options: PortfolioSeriesOptions
) {
  if (!seriesList.length) return [];

  const dateSeries = seriesList[0].series
    .map((point) => point.date)
    .filter((date) => date >= options.startDate && date <= options.endDate);

  const shareCounts = seriesList.reduce<Record<string, number>>((acc, item) => {
    acc[item.fundId] = 0;
    return acc;
  }, {});

  const getNav = (fundId: string, date: string) =>
    seriesList.find((item) => item.fundId === fundId)?.series.find((point) => point.date === date)?.nav ?? 0;

  const allocationMap = seriesList.reduce<Record<string, number>>((acc, item) => {
    acc[item.fundId] = item.allocation / 100;
    return acc;
  }, {});

  const getTotalValue = (date: string) =>
    seriesList.reduce((sum, item) => sum + shareCounts[item.fundId] * getNav(item.fundId, date), 0);

  return dateSeries.map((date, index) => {
    const contribute = options.investmentType === 'sip' && periodMatches(index, options.sipFrequency);
    const rebalance = options.rebalance !== 'none' && periodMatches(index, options.rebalance);

    if (options.investmentType === 'lumpSum' && index === 0) {
      seriesList.forEach((item) => {
        const nav = getNav(item.fundId, date);
        if (nav > 0) {
          const contribution = options.totalInvestment * allocationMap[item.fundId];
          shareCounts[item.fundId] = contribution / nav;
        }
      });
    }

    if (contribute) {
      seriesList.forEach((item) => {
        const nav = getNav(item.fundId, date);
        if (nav > 0) {
          const contribution = options.totalInvestment * allocationMap[item.fundId];
          shareCounts[item.fundId] += contribution / nav;
        }
      });
    }

    if (rebalance) {
      const currentValue = getTotalValue(date);
      seriesList.forEach((item) => {
        const nav = getNav(item.fundId, date);
        const targetValue = currentValue * allocationMap[item.fundId];
        shareCounts[item.fundId] = nav > 0 ? targetValue / nav : 0;
      });
    }

    const values = seriesList.reduce<Record<string, number>>((acc, item) => {
      const nav = getNav(item.fundId, date);
      const fundValue = shareCounts[item.fundId] * nav;
      acc[fundCategoryLabels[item.fundId]] = fundValue;
      return acc;
    }, { 'Large Cap': 0, 'Mid Cap': 0, 'Small Cap': 0 });

    const totalValue = Object.values(values).reduce((sum, v) => sum + v, 0);
    return {
      date,
      'Large Cap': totalValue ? Number(((values['Large Cap'] / totalValue) * 100).toFixed(2)) : 0,
      'Mid Cap': totalValue ? Number(((values['Mid Cap'] / totalValue) * 100).toFixed(2)) : 0,
      'Small Cap': totalValue ? Number(((values['Small Cap'] / totalValue) * 100).toFixed(2)) : 0
    };
  });
}

export function calculateMonthlyHeatmapData(series: TimeSeriesPoint[]) {
  const points: Array<{ month: string; year: string; value: number }> = [];

  for (let i = 1; i < series.length; i += 1) {
    const prev = series[i - 1].value;
    const current = series[i].value;
    const date = new Date(series[i].date);
    const value = prev <= 0 ? 0 : ((current - prev) / prev) * 100;
    points.push({
      month: monthNames[date.getMonth()],
      year: date.getFullYear().toString(),
      value: Number(value.toFixed(2))
    });
  }

  return points;
}

export function calculateAnnualReturns(series: TimeSeriesPoint[]) {
  const byYear = new Map<number, { first: number; last: number }>();

  for (const point of series) {
    const year = new Date(point.date).getFullYear();
    const entry = byYear.get(year);
    if (!entry) {
      byYear.set(year, { first: point.value, last: point.value });
    } else {
      entry.last = point.value;
    }
  }

  return Array.from(byYear.entries()).map(([year, values]) => ({
    year,
    returnPct: calculateAbsoluteReturn(values.first, values.last)
  }));
}

export function calculateMonthlyReturns(series: TimeSeriesPoint[]) {
  const returns: number[] = [];

  for (let i = 1; i < series.length; i += 1) {
    const prev = series[i - 1].value;
    const current = series[i].value;
    returns.push((current - prev) / prev);
  }

  return returns;
}

export function calculateVolatility(returns: number[]) {
  if (!returns.length) return 0;
  const mean = returns.reduce((sum, value) => sum + value, 0) / returns.length;
  const variance = returns.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / returns.length;
  return Math.sqrt(variance) * Math.sqrt(12) * 100;
}

export function calculateSharpeRatio(returns: number[], riskFreeRate = 0.03) {
  if (!returns.length) return 0;
  const avg = returns.reduce((sum, value) => sum + value, 0) / returns.length;
  const stdDev = Math.sqrt(
    returns.reduce((sum, value) => sum + Math.pow(value - avg, 2), 0) / returns.length
  );
  if (stdDev === 0) return 0;
  return ((avg * 12 - riskFreeRate) / (stdDev * Math.sqrt(12))).toFixed(2);
}

export function calculateSortinoRatio(returns: number[], riskFreeRate = 0.03) {
  if (!returns.length) return 0;
  const downsideReturns = returns.filter((value) => value < 0);
  const downsideDeviation = Math.sqrt(
    downsideReturns.reduce((sum, value) => sum + Math.pow(value, 2), 0) / returns.length
  );
  if (downsideDeviation === 0) return 0;
  const avgReturn = returns.reduce((sum, value) => sum + value, 0) / returns.length;
  return ((avgReturn * 12 - riskFreeRate) / downsideDeviation).toFixed(2);
}

export function calculateXIRR(cashFlows: { date: string; amount: number }[]) {
  if (cashFlows.length < 2) return 0;
  const dates = cashFlows.map((flow) => new Date(flow.date));
  const amounts = cashFlows.map((flow) => flow.amount);
  const dayCount = 1000 * 60 * 60 * 24;
  const yearsBetween = (date: Date) => (date.getTime() - dates[0].getTime()) / (dayCount * 365);

  const xnpv = (rate: number) =>
    amounts.reduce(
      (sum, amount, index) => sum + amount / Math.pow(1 + rate, yearsBetween(dates[index])),
      0
    );

  const dxnpv = (rate: number) =>
    amounts.reduce((sum, amount, index) => {
      const t = yearsBetween(dates[index]);
      return sum - (amount * t) / Math.pow(1 + rate, t + 1);
    }, 0);

  let rate = 0.1;
  for (let i = 0; i < 100; i += 1) {
    const value = xnpv(rate);
    if (Math.abs(value) < 1e-8) return rate * 100;
    const derivative = dxnpv(rate);
    if (derivative === 0) break;
    rate -= value / derivative;
  }

  return Number((rate * 100).toFixed(2));
}

export function comparePortfolioWithBenchmark(
  portfolioSeries: TimeSeriesPoint[],
  benchmarkSeries: TimeSeriesPoint[]
) {
  if (!portfolioSeries.length || !benchmarkSeries.length) return [];
  const benchmarkMap = new Map(benchmarkSeries.map((point) => [point.date, point.value]));
  const multiplier =
    benchmarkSeries[0]?.value !== 0 ? portfolioSeries[0].value / benchmarkSeries[0].value : 1;

  return portfolioSeries.map((point) => ({
    date: point.date,
    value: point.value,
    comparisonValue: Number(((benchmarkMap.get(point.date) ?? 0) * multiplier).toFixed(2))
  }));
}

export function combinePortfolioSeries(
  seriesList: { fundId: string; series: NavPoint[]; allocation: number }[],
  totalInvestment: number
) {
  if (!seriesList.length) return [];

  const portfolioSeriesByDate = seriesList[0].series.map((point) => point.date);
  return portfolioSeriesByDate.map((date) => {
    const value = seriesList.reduce((sum, item) => {
      const currentPoint = item.series.find((seriesPoint) => seriesPoint.date === date);
      const initialNav = item.series[0]?.nav ?? 0;
      if (initialNav === 0 || !currentPoint) return sum;
      const allocationValue = (item.allocation / 100) * totalInvestment;
      const shareCount = allocationValue / initialNav;
      return sum + shareCount * currentPoint.nav;
    }, 0);

    return { date, value: Number(value.toFixed(2)) };
  });
}

function periodMatches(index: number, frequency: 'monthly' | 'quarterly' | 'yearly') {
  if (frequency === 'monthly') return true;
  if (frequency === 'quarterly') return index % 3 === 0;
  return index % 12 === 0;
}

export function simulatePortfolioSeries(
  seriesList: { fundId: string; series: NavPoint[]; allocation: number }[],
  options: PortfolioSeriesOptions
) {
  if (!seriesList.length) return [];

  const dateSeries = seriesList[0].series
    .map((point) => point.date)
    .filter((date) => date >= options.startDate && date <= options.endDate);
  if (!dateSeries.length) return [];

  const shareCounts = seriesList.reduce<Record<string, number>>((acc, item) => {
    acc[item.fundId] = 0;
    return acc;
  }, {});

  const getNav = (fundId: string, date: string) =>
    seriesList.find((item) => item.fundId === fundId)?.series.find((point) => point.date === date)?.nav ?? 0;

  const allocationMap = seriesList.reduce<Record<string, number>>((acc, item) => {
    acc[item.fundId] = item.allocation / 100;
    return acc;
  }, {});

  const getTotalValue = (date: string) =>
    seriesList.reduce((sum, item) => sum + shareCounts[item.fundId] * getNav(item.fundId, date), 0);

  const points: TimeSeriesPoint[] = [];

  dateSeries.forEach((date, index) => {
    const contribute = options.investmentType === 'sip' && periodMatches(index, options.sipFrequency);
    const rebalance = options.rebalance !== 'none' && periodMatches(index, options.rebalance);

    if (options.investmentType === 'lumpSum' && index === 0) {
      seriesList.forEach((item) => {
        const nav = getNav(item.fundId, date);
        if (nav > 0) {
          const contribution = options.totalInvestment * allocationMap[item.fundId];
          shareCounts[item.fundId] = contribution / nav;
        }
      });
    }

    if (contribute) {
      seriesList.forEach((item) => {
        const nav = getNav(item.fundId, date);
        if (nav > 0) {
          const contribution = options.totalInvestment * allocationMap[item.fundId];
          shareCounts[item.fundId] += contribution / nav;
        }
      });
    }

    if (rebalance) {
      const currentValue = getTotalValue(date);
      seriesList.forEach((item) => {
        const nav = getNav(item.fundId, date);
        const targetValue = currentValue * allocationMap[item.fundId];
        shareCounts[item.fundId] = nav > 0 ? targetValue / nav : 0;
      });
    }

    points.push({ date, value: Number(getTotalValue(date).toFixed(2)) });
  });

  return points;
}
