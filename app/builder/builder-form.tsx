'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { CalendarDays } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { PortfolioFormValues } from '@/types/portfolio';
import { allocationSchema, formSchema } from '@/lib/form';
import { getFundSeries } from '@/data/mock-nav';
import {
  simulatePortfolioSeries,
  TimeSeriesPoint,
  calculateAbsoluteReturn,
  calculateCAGR,
  calculateDrawdown,
  calculateMonthlyReturns,
  calculateVolatility,
  calculateSharpeRatio,
  calculateSortinoRatio,
  calculateXIRR,
  calculateAnnualReturns,
  calculateMonthlyHeatmapData,
  calculateAllocationTrendSeries
} from '@/lib/portfolio';
import { PortfolioLineChart } from '@/charts/line-chart';
import { PortfolioBarChart } from '@/charts/bar-chart';
import { PortfolioPieChart } from '@/charts/pie-chart';
import { PortfolioAreaChart } from '@/charts/area-chart';
import { HeatmapChart } from '@/charts/heatmap-chart';
import { MetricsSummary } from '@/components/metrics-summary';
import { usePortfolioStore } from '@/store/portfolio-store';

// formSchema and allocationSchema are imported from lib/form.ts

const defaultAllocations: PortfolioFormValues['allocations'] = [
  { id: 'large-1', name: 'Large Cap Fund A', category: 'Large Cap', allocation: 50 },
  { id: 'mid-1', name: 'Mid Cap Fund B', category: 'Mid Cap', allocation: 30 },
  { id: 'small-1', name: 'Small Cap Fund C', category: 'Small Cap', allocation: 20 }
];

export function BuilderForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<PortfolioFormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      scenarioName: 'My portfolio scenario',
      totalInvestment: 500000,
      investmentType: 'lumpSum',
      sipFrequency: 'monthly',
      startDate: '2015-01-01',
      endDate: '2024-01-01',
      rebalance: 'none',
      allocations: defaultAllocations
    }
  });

  const { fields } = useFieldArray({ control, name: 'allocations' });
  const watchedAllocations = watch('allocations');
  const investmentType = watch('investmentType');
  const allocationSum = Array.isArray(watchedAllocations)
    ? watchedAllocations.reduce((sum, item) => sum + Number(item.allocation || 0), 0)
    : fields.reduce((sum, item) => sum + Number(item.allocation || 0), 0);
  const allocationSumRounded = Math.round((allocationSum + Number.EPSILON) * 100) / 100;
  const isAllocationValid = Math.abs(allocationSumRounded - 100) < 0.01;
  // also derive a local form validity to ensure immediate responsiveness
  const [scName, scTotal, scStart, scEnd] = watch(['scenarioName', 'totalInvestment', 'startDate', 'endDate']);
  const localFieldsValid = (scName || '').toString().trim().length >= 3 && Number(scTotal) >= 1000 && !!scStart && !!scEnd;
  const canAnalyze = isAllocationValid && localFieldsValid;

  // debug hooks removed in cleanup

  const setPortfolio = usePortfolioStore((state) => state.setPortfolio);
  const saveScenario = usePortfolioStore((state) => state.saveScenario);
  const [currentSeries, setCurrentSeries] = useState<TimeSeriesPoint[] | null>(null);
  const [saved, setSaved] = useState(false);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [activeDateField, setActiveDateField] = useState<'start' | 'end' | null>(null);
  const [calendarReference, setCalendarReference] = useState(new Date('2024-01-01'));
  const datePanelRef = useRef<HTMLDivElement | null>(null);

  const startDateValue = watch('startDate');
  const endDateValue = watch('endDate');

  const formatDateLabel = (date?: string) => {
    if (!date) return 'Select date';
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return 'Select date';
    return parsed.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const monthDays = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const calendarYear = calendarReference.getFullYear();
  const calendarMonth = calendarReference.getMonth();
  const calendarStartDay = new Date(calendarYear, calendarMonth, 1).getDay();
  const calendarDays = Array.from({ length: monthDays(calendarYear, calendarMonth) }, (_, index) => index + 1);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const yearOptions = Array.from({ length: 41 }, (_, index) => 2000 + index);

  const applyCalendarDate = (day: number) => {
    if (!activeDateField) return;
    const date = new Date(calendarYear, calendarMonth, day);
    const iso = date.toISOString().slice(0, 10);
    setValue(activeDateField === 'start' ? 'startDate' : 'endDate', iso, { shouldValidate: true });
    if (activeDateField === 'start') {
      setCalendarReference(date);
    }
    setCalendarOpen(false);
  };

  const moveCalendar = (direction: 'prev' | 'next') => {
    setCalendarReference((current) => {
      const nextMonth = direction === 'prev' ? current.getMonth() - 1 : current.getMonth() + 1;
      return new Date(current.getFullYear(), nextMonth, 1);
    });
  };

  const onSubmit = (data: PortfolioFormValues) => {
    const fundMap: Record<PortfolioFormValues['allocations'][number]['category'], string> = {
      'Large Cap': 'large-cap-a',
      'Mid Cap': 'mid-cap-b',
      'Small Cap': 'small-cap-c'
    };

    const series = data.allocations
      .filter((allocation) => allocation.allocation > 0)
      .map((allocation) => {
        const fundId = fundMap[allocation.category];
        const fundSeries = getFundSeries(fundId).filter(
          (point) => point.date >= data.startDate && point.date <= data.endDate
        );

        return {
          fundId,
          series: fundSeries,
          allocation: allocation.allocation
        };
      });

    const combinedSeries: TimeSeriesPoint[] = simulatePortfolioSeries(series, {
      totalInvestment: data.totalInvestment,
      investmentType: data.investmentType,
      sipFrequency: data.sipFrequency,
      rebalance: data.rebalance,
      startDate: data.startDate,
      endDate: data.endDate
    });
    setPortfolio(data, combinedSeries);
    setCurrentSeries(combinedSeries);
    setSaved(false);
  };

  const getMetrics = (series: TimeSeriesPoint[], portfolio: PortfolioFormValues) => {
    const annualReturns = calculateAnnualReturns(series);
    const monthly = calculateMonthlyReturns(series);
    const absoluteReturn = calculateAbsoluteReturn(series[0]?.value ?? 0, series[series.length - 1]?.value ?? 0).toFixed(2);
    const cagr = calculateCAGR(series[0]?.value ?? 0, series[series.length - 1]?.value ?? 0, series.length / 12).toFixed(2);
    const drawdown = calculateDrawdown(series).toFixed(2);
    const volatility = calculateVolatility(monthly).toFixed(2);
    const sharpe = calculateSharpeRatio(monthly).toString();
    const sortino = calculateSortinoRatio(monthly).toString();
    const xirr = portfolio.investmentType === 'lumpSum'
      ? calculateXIRR([
          { date: series[0].date, amount: -Number(portfolio.totalInvestment) },
          { date: series[series.length - 1].date, amount: series[series.length - 1].value }
        ]).toFixed(2)
      : 'N/A';

    return {
      metrics: [
        { label: 'Absolute return', value: `${absoluteReturn}%` },
        { label: 'CAGR', value: `${cagr}%` },
        { label: 'Max drawdown', value: `${drawdown}%` },
        { label: 'Volatility', value: `${volatility}%` },
        { label: 'Sharpe ratio', value: sharpe },
        { label: 'Sortino ratio', value: sortino },
        { label: 'XIRR', value: xirr }
      ],
      annualReturns,
      allocationTrend: calculateAllocationTrendSeries(
        portfolio.allocations
          .filter((allocation) => allocation.allocation > 0)
          .map((allocation) => ({
            fundId: allocation.category === 'Large Cap' ? 'large-cap-a' : allocation.category === 'Mid Cap' ? 'mid-cap-b' : 'small-cap-c',
            series: getFundSeries(allocation.category === 'Large Cap' ? 'large-cap-a' : allocation.category === 'Mid Cap' ? 'mid-cap-b' : 'small-cap-c'),
            allocation: allocation.allocation
          })),
        {
          totalInvestment: portfolio.totalInvestment,
          investmentType: portfolio.investmentType,
          sipFrequency: portfolio.sipFrequency,
          rebalance: portfolio.rebalance,
          startDate: portfolio.startDate,
          endDate: portfolio.endDate
        }
      ),
      heatmapData: calculateMonthlyHeatmapData(series)
    };
  };

  const analysisData = currentSeries ? getMetrics(currentSeries, watch()) : null;
  const chartSeries = currentSeries ?? [];
  const allocationChartData = watchedAllocations?.map((allocation) => ({ name: allocation.name, value: allocation.allocation })) ?? [];

  useEffect(() => {
    const subscription = watch(() => {
      if (saved) {
        setSaved(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [saved, watch]);

  const onSave = (data: PortfolioFormValues) => {
    if (!currentSeries) return;
    saveScenario(data.scenarioName, data, currentSeries);
    setSaved(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarOpen && datePanelRef.current && !datePanelRef.current.contains(event.target as Node)) {
        setCalendarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [calendarOpen]);

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-200">
          <span className="font-medium">Scenario name</span>
          <input
            type="text"
            className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-brand-500"
            {...register('scenarioName')}
          />
          {errors.scenarioName && <p className="text-xs text-rose-400">{errors.scenarioName.message}</p>}
        </label>

        <label className="space-y-2 text-sm text-slate-200">
          <span className="font-medium">Total investment (₹)</span>
          <input
            type="number"
            step="1000"
            className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100 outline-none transition focus:border-brand-500"
            {...register('totalInvestment', { valueAsNumber: true })}
          />
          {errors.totalInvestment && <p className="text-xs text-rose-400">{errors.totalInvestment.message}</p>}
        </label>

        <label className="space-y-2 text-sm text-slate-200">
          <span className="font-medium">Investment type</span>
          <select className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-slate-100" {...register('investmentType')}>
            <option value="lumpSum">Lump Sum</option>
            <option value="sip">SIP</option>
          </select>
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 relative">
        <label className="relative space-y-2 text-sm text-slate-200">
          <span className="font-medium">Start date</span>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setCalendarOpen(true);
                setActiveDateField('start');
                setCalendarReference(startDateValue ? new Date(startDateValue) : new Date());
              }}
              className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-left text-slate-100 transition hover:border-brand-500"
            >
              <div className="flex items-center justify-between gap-2">
                <span>{formatDateLabel(startDateValue)}</span>
                <CalendarDays className="h-5 w-5 text-slate-400" />
              </div>
            </button>
            <input type="hidden" {...register('startDate')} />
            {calendarOpen && activeDateField === 'start' ? (
              <div
                ref={datePanelRef}
                className="absolute left-0 top-full z-20 mt-3 w-full max-w-md rounded-3xl border border-brand-500 bg-slate-950/95 p-3 shadow-[0_24px_60px_rgba(15,23,42,0.35)]"
              >
                <div className="mb-3 grid gap-2 rounded-3xl border border-slate-700 bg-slate-900/80 p-3 text-slate-200 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                  <button
                    type="button"
                    onClick={() => moveCalendar('prev')}
                    className="rounded-xl border border-slate-700 bg-slate-800/80 px-2 py-1.5 text-slate-300 hover:border-brand-500 hover:text-white"
                  >
                    ‹
                  </button>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={calendarMonth}
                        onChange={(event) => setCalendarReference(new Date(calendarYear, Number(event.target.value), 1))}
                        className="rounded-2xl border border-slate-700 bg-slate-900/80 px-2 py-1.5 text-xs text-slate-100 outline-none transition focus:border-brand-500"
                      >
                        {monthNames.map((name, index) => (
                          <option key={name} value={index} className="bg-slate-950 text-slate-100">
                            {name}
                          </option>
                        ))}
                      </select>
                      <select
                        value={calendarYear}
                        onChange={(event) => setCalendarReference(new Date(Number(event.target.value), calendarMonth, 1))}
                        className="rounded-2xl border border-slate-700 bg-slate-900/80 px-2 py-1.5 text-xs text-slate-100 outline-none transition focus:border-brand-500"
                      >
                        {yearOptions.map((year) => (
                          <option key={year} value={year} className="bg-slate-950 text-slate-100">
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="text-center text-xs uppercase tracking-[0.35em] text-slate-500">Choose month / year</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => moveCalendar('next')}
                    className="rounded-xl border border-slate-700 bg-slate-800/80 px-2 py-1.5 text-slate-300 hover:border-brand-500 hover:text-white"
                  >
                    ›
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.25em] text-slate-500">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day}>{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 pt-2 text-sm">
                  {Array.from({ length: calendarStartDay }).map((_, index) => (
                    <div key={`empty-${index}`} className="h-8" />
                  ))}
                  {calendarDays.map((day) => {
                    const dateStr = new Date(calendarYear, calendarMonth, day).toISOString().slice(0, 10);
                    const selected = dateStr === startDateValue || dateStr === endDateValue;
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => applyCalendarDate(day)}
                        className={`rounded-2xl px-2 py-1.5 text-xs transition ${
                          selected
                            ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                            : 'bg-slate-900/90 text-slate-200 hover:bg-slate-800/80 hover:text-white'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
          {errors.startDate && <p className="text-xs text-rose-400">{errors.startDate.message}</p>}
        </label>

        <label className="relative space-y-2 text-sm text-slate-200">
          <span className="font-medium">End date</span>
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setCalendarOpen(true);
                setActiveDateField('end');
                setCalendarReference(endDateValue ? new Date(endDateValue) : new Date());
              }}
              className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-left text-slate-100 transition hover:border-brand-500"
            >
              <div className="flex items-center justify-between gap-2">
                <span>{formatDateLabel(endDateValue)}</span>
                <CalendarDays className="h-5 w-5 text-slate-400" />
              </div>
            </button>
            <input type="hidden" {...register('endDate')} />
            {calendarOpen && activeDateField === 'end' ? (
              <div
                ref={datePanelRef}
                className="absolute left-0 top-full z-20 mt-3 w-full max-w-md rounded-3xl border border-brand-500 bg-slate-950/95 p-3 shadow-[0_24px_60px_rgba(15,23,42,0.35)]"
              >
                <div className="mb-3 grid gap-2 rounded-3xl border border-slate-700 bg-slate-900/80 p-3 text-slate-200 sm:grid-cols-[auto_1fr_auto] sm:items-center">
                  <button
                    type="button"
                    onClick={() => moveCalendar('prev')}
                    className="rounded-xl border border-slate-700 bg-slate-800/80 px-2 py-1.5 text-slate-300 hover:border-brand-500 hover:text-white"
                  >
                    ‹
                  </button>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={calendarMonth}
                        onChange={(event) => setCalendarReference(new Date(calendarYear, Number(event.target.value), 1))}
                        className="rounded-2xl border border-slate-700 bg-slate-900/80 px-2 py-1.5 text-xs text-slate-100 outline-none transition focus:border-brand-500"
                      >
                        {monthNames.map((name, index) => (
                          <option key={name} value={index} className="bg-slate-950 text-slate-100">
                            {name}
                          </option>
                        ))}
                      </select>
                      <select
                        value={calendarYear}
                        onChange={(event) => setCalendarReference(new Date(Number(event.target.value), calendarMonth, 1))}
                        className="rounded-2xl border border-slate-700 bg-slate-900/80 px-2 py-1.5 text-xs text-slate-100 outline-none transition focus:border-brand-500"
                      >
                        {yearOptions.map((year) => (
                          <option key={year} value={year} className="bg-slate-950 text-slate-100">
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="text-center text-xs uppercase tracking-[0.35em] text-slate-500">Choose month / year</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => moveCalendar('next')}
                    className="rounded-xl border border-slate-700 bg-slate-800/80 px-2 py-1.5 text-slate-300 hover:border-brand-500 hover:text-white"
                  >
                    ›
                  </button>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center text-xs uppercase tracking-[0.25em] text-slate-500">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div key={day}>{day}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 pt-2 text-sm">
                  {Array.from({ length: calendarStartDay }).map((_, index) => (
                    <div key={`empty-${index}`} className="h-8" />
                  ))}
                  {calendarDays.map((day) => {
                    const dateStr = new Date(calendarYear, calendarMonth, day).toISOString().slice(0, 10);
                    const selected = dateStr === startDateValue || dateStr === endDateValue;
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => applyCalendarDate(day)}
                        className={`rounded-2xl px-2 py-1.5 text-xs transition ${
                          selected
                            ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20'
                            : 'bg-slate-900/90 text-slate-200 hover:bg-slate-800/80 hover:text-white'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
          {errors.endDate && <p className="text-xs text-rose-400">{errors.endDate.message}</p>}
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {watch('investmentType') === 'sip' ? (
          <label className="space-y-1 text-sm text-slate-200">
            <span className="font-medium">SIP frequency</span>
            <select className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100" {...register('sipFrequency')}>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </select>
          </label>
        ) : (
          <div className="space-y-1 text-sm text-slate-400">
            <span className="font-medium">SIP frequency</span>
            <p className="mt-2 rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-400">Not applicable for Lump Sum</p>
          </div>
        )}

        <label className="space-y-1 text-sm text-slate-200">
          <span className="font-medium">Rebalance</span>
          <select className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100" {...register('rebalance')}>
            <option value="none">None</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </label>

        {/* Allocation total moved below into the Fund allocations header for tighter layout */}
      </div>

      <div className="space-y-4 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold text-white">Fund allocations</p>
            <p className="text-sm text-slate-400">Adjust weights to total 100%</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2">
              <div className="text-center">
                <p className="text-xs font-medium text-slate-300">Allocation total</p>
                <p className="mt-1 text-lg font-semibold text-white">{allocationSumRounded}%</p>
                {errors.allocations ? (
                  <p className="mt-1 text-[10px] text-rose-400">{errors.allocations.message}</p>
                ) : !isAllocationValid ? (
                  <p className="mt-1 text-[10px] text-amber-300">Total must equal 100%</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-950/80 p-3 sm:grid-cols-[1fr_0.8fr_0.6fr]">
              <div className="space-y-1">
                <p className="font-medium text-slate-100">{field.name}</p>
                <p className="text-sm text-slate-500">{field.category}</p>
              </div>
              <Controller
                control={control}
                name={`allocations.${index}.allocation` as const}
                defaultValue={field.allocation}
                render={({ field: ctrlField }) => (
                  <input
                    type="number"
                    step="1"
                    className="w-full rounded-3xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-slate-100"
                    name={ctrlField.name}
                    ref={ctrlField.ref}
                    value={ctrlField.value ?? ''}
                    onInput={(e) => {
                      const v = (e.target as HTMLInputElement).value;
                      // on each keystroke update form state; empty = 0 so allocation math reflects typing
                      ctrlField.onChange(v === '' ? 0 : Number(v));
                    }}
                    onBlur={ctrlField.onBlur}
                  />
                )}
              />
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Allocation</p>
                <p className="text-sm text-slate-300">{(watchedAllocations?.[index]?.allocation ?? field.allocation)}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          disabled={!canAnalyze}
          className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Analyze portfolio
        </button>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={handleSubmit(onSave)}
            disabled={!currentSeries}
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:border-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saved ? 'Saved' : 'Save scenario'}
          </button>
          {saved ? <span className="text-sm text-emerald-400">Scenario saved.</span> : null}
        </div>
      </div>
    </form>
    {analysisData ? (
      <div className="space-y-8 rounded-3xl border border-white/10 bg-slate-950/90 p-6">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Analysis results</p>
          <p className="mt-2 text-slate-300">These metrics are generated from mock historical NAV data for the selected funds and date range.</p>
        </div>

        <MetricsSummary metrics={analysisData.metrics} />

        <div className="grid gap-8 xl:grid-cols-[1fr_0.8fr]">
          <PortfolioLineChart data={chartSeries.map((point) => ({ date: point.date, value: point.value }))} label="Portfolio growth" />
          <PortfolioPieChart data={allocationChartData} label="Allocation split" />
        </div>

        <div className="grid gap-8 xl:grid-cols-[1fr_0.8fr]">
          <PortfolioBarChart data={analysisData.annualReturns} label="Annual returns" />
          <PortfolioAreaChart data={analysisData.allocationTrend} label="Allocation exposure" keys={['Large Cap', 'Mid Cap', 'Small Cap']} />
        </div>

        <div className="grid gap-8 xl:grid-cols-[1fr_0.8fr]">
          <HeatmapChart data={analysisData.heatmapData} label="Monthly return heatmap" />
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Portfolio summary</p>
            <p className="mt-4 text-sm text-slate-300">Investment type: {investmentType === 'sip' ? 'SIP' : 'Lump Sum'}</p>
            <p className="mt-2 text-sm text-slate-300">Rebalance: {watch('rebalance')}</p>
            <p className="mt-2 text-sm text-slate-300">Allocation total: {allocationSumRounded}%</p>
          </div>
        </div>
      </div>
    ) : null}
  </div>
  );
}
