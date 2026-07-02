import { describe, it, expect } from 'vitest';
import { formSchema } from '../lib/form';

describe('builder form validation', () => {
  it('accepts a valid form payload', () => {
    const payload = {
      scenarioName: 'Valid scenario',
      totalInvestment: 500000,
      investmentType: 'lumpSum',
      sipFrequency: 'monthly',
      startDate: '2015-01-01',
      endDate: '2024-01-01',
      rebalance: 'none',
      allocations: [
        { id: 'a', name: 'Large Cap Fund A', category: 'Large Cap', allocation: 50 },
        { id: 'b', name: 'Mid Cap Fund B', category: 'Mid Cap', allocation: 30 },
        { id: 'c', name: 'Small Cap Fund C', category: 'Small Cap', allocation: 20 }
      ]
    };

    const result = formSchema.safeParse(payload);
    expect(result.success).toBe(true);
  });

  it('rejects when allocations do not sum to 100', () => {
    const payload = {
      scenarioName: 'Bad alloc',
      totalInvestment: 10000,
      investmentType: 'lumpSum',
      sipFrequency: 'monthly',
      startDate: '2020-01-01',
      endDate: '2020-12-31',
      rebalance: 'none',
      allocations: [
        { id: 'a', name: 'Large Cap Fund A', category: 'Large Cap', allocation: 40 },
        { id: 'b', name: 'Mid Cap Fund B', category: 'Mid Cap', allocation: 30 }
      ]
    };

    const result = formSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path?.[0] === 'allocations')).toBe(true);
    }
  });

  it('rejects short scenario name and low investment', () => {
    const payload = {
      scenarioName: 'AB',
      totalInvestment: 500,
      investmentType: 'lumpSum',
      sipFrequency: 'monthly',
      startDate: '2020-01-01',
      endDate: '2020-12-31',
      rebalance: 'none',
      allocations: [
        { id: 'a', name: 'Large Cap Fund A', category: 'Large Cap', allocation: 100 }
      ]
    };

    const result = formSchema.safeParse(payload);
    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((i) => i.message);
      expect(messages.some((m) => /Scenario name is required/.test(m))).toBe(true);
      expect(messages.some((m) => /Minimum investment/.test(m))).toBe(true);
    }
  });
});
