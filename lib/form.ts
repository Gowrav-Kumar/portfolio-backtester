import { z } from 'zod';

export const allocationSchema = z.object({
  id: z.string(),
  name: z.string(),
  category: z.enum(['Large Cap', 'Mid Cap', 'Small Cap']),
  allocation: z.number().min(0).max(100)
});

export const formSchema = z.object({
  scenarioName: z.string().min(3, 'Scenario name is required'),
  totalInvestment: z.number().min(1000, 'Minimum investment is 1,000'),
  investmentType: z.enum(['lumpSum', 'sip']),
  sipFrequency: z.enum(['monthly', 'quarterly', 'yearly']),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  rebalance: z.enum(['none', 'monthly', 'quarterly', 'yearly']),
  allocations: z.array(allocationSchema).superRefine((allocations, ctx) => {
    const total = allocations.reduce((sum, item) => sum + item.allocation, 0);
    if (total !== 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Total allocation must equal 100%',
        path: ['allocations']
      });
    }
  })
});

export type Allocation = z.infer<typeof allocationSchema>;
export type FormValues = z.infer<typeof formSchema>;
