import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PortfolioFormValues, SavedScenario } from '@/types/portfolio';
import { TimeSeriesPoint } from '@/lib/portfolio';

type PortfolioState = {
  portfolio?: PortfolioFormValues;
  series?: TimeSeriesPoint[];
  savedScenarios: SavedScenario[];
  setPortfolio: (portfolio: PortfolioFormValues, series: TimeSeriesPoint[]) => void;
  resetPortfolio: () => void;
  saveScenario: (scenarioName: string, portfolio: PortfolioFormValues, series: TimeSeriesPoint[]) => void;
  deleteScenario: (id: string) => void;
  loadScenario: (id: string) => void;
  loadSavedScenarios: (scenarios: SavedScenario[]) => void;
};

const createScenarioId = () =>
  typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 11);

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      portfolio: undefined,
      series: undefined,
      savedScenarios: [],
      setPortfolio: (portfolio, series) => set({ portfolio, series }),
      resetPortfolio: () => set({ portfolio: undefined, series: undefined }),
      saveScenario: (scenarioName, portfolio, series) =>
        set((state) => ({
          savedScenarios: [
            ...state.savedScenarios,
            {
              id: createScenarioId(),
              name: scenarioName,
              createdAt: new Date().toISOString(),
              portfolio,
              series
            }
          ]
        })),
      deleteScenario: (id) =>
        set((state) => ({
          savedScenarios: state.savedScenarios.filter((scenario) => scenario.id !== id) })),
      loadScenario: (id) =>
        set((state) => {
          const found = state.savedScenarios.find((scenario) => scenario.id === id);
          return found ? { portfolio: found.portfolio, series: found.series } : {};
        }),
      loadSavedScenarios: (scenarios) => set({ savedScenarios: scenarios })
    }),
    {
      name: 'portfolio-storage',
      partialize: (state) => ({ savedScenarios: state.savedScenarios })
    }
  )
);
