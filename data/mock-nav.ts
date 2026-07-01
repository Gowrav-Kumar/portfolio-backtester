export type NavPoint = {
  date: string;
  nav: number;
};

export type FundDefinition = {
  id: string;
  name: string;
  category: 'Large Cap' | 'Mid Cap' | 'Small Cap';
  startingNav: number;
  annualDrift: number;
  monthlyVolatility: number;
};

const funds: FundDefinition[] = [
  {
    id: 'large-cap-a',
    name: 'Large Cap Fund A',
    category: 'Large Cap',
    startingNav: 100,
    annualDrift: 0.085,
    monthlyVolatility: 0.045
  },
  {
    id: 'mid-cap-b',
    name: 'Mid Cap Fund B',
    category: 'Mid Cap',
    startingNav: 100,
    annualDrift: 0.10,
    monthlyVolatility: 0.06
  },
  {
    id: 'small-cap-c',
    name: 'Small Cap Fund C',
    category: 'Small Cap',
    startingNav: 100,
    annualDrift: 0.115,
    monthlyVolatility: 0.08
  }
];

function monthIndex(start: Date, current: Date) {
  return current.getFullYear() * 12 + current.getMonth() - (start.getFullYear() * 12 + start.getMonth());
}

function deterministicNoise(seed: number) {
  return Math.sin(seed * 1.3) * Math.cos(seed * 0.8);
}

export function generateMonthlyNavSeries(startDate: string, endDate: string, fund: FundDefinition): NavPoint[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const series: NavPoint[] = [];
  let current = new Date(start);

  while (current <= end) {
    const index = monthIndex(start, current);
    const years = index / 12;
    const drift = fund.annualDrift * years;
    const noise = deterministicNoise(index) * fund.monthlyVolatility * Math.sqrt(index + 1);
    const nav = fund.startingNav * Math.exp(drift + noise);
    series.push({
      date: current.toISOString().slice(0, 10),
      nav: Number(nav.toFixed(2))
    });
    current = new Date(current.getFullYear(), current.getMonth() + 1, 1);
  }

  return series;
}

export const mockFunds = funds.map((fund) => ({
  ...fund,
  series: generateMonthlyNavSeries('2004-01-01', '2024-01-01', fund)
}));

export function getFundSeries(id: string) {
  return mockFunds.find((fund) => fund.id === id)?.series || [];
}
