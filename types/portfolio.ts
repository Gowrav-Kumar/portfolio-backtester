import type { TimeSeriesPoint } from '@/lib/portfolio';

export type InvestmentType = 'lumpSum' | 'sip';
export type SipFrequency = 'monthly' | 'quarterly' | 'yearly';
export type RebalanceFrequency = 'none' | 'monthly' | 'quarterly' | 'yearly';

export type AllocationItem = {
  id: string;
  name: string;
  category: 'Large Cap' | 'Mid Cap' | 'Small Cap';
  allocation: number;
};

export type PortfolioFormValues = {
  scenarioName: string;
  totalInvestment: number;
  investmentType: InvestmentType;
  sipFrequency: SipFrequency;
  startDate: string;
  endDate: string;
  rebalance: RebalanceFrequency;
  allocations: AllocationItem[];
};

export type SavedScenario = {
  id: string;
  name: string;
  createdAt: string;
  portfolio: PortfolioFormValues;
  series: TimeSeriesPoint[];
};
