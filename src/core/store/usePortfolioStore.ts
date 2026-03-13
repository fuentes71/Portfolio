import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'pt' | 'en';

interface PortfolioState {
  lang: Language;
  setLang: (lang: Language) => void;
  isTerminalComplete: boolean;
  setTerminalComplete: (complete: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set) => ({
      lang: 'pt',
      setLang: (lang) => set({ lang }),
      isTerminalComplete: false,
      setTerminalComplete: (complete) => set({ isTerminalComplete: complete }),
    }),
    {
      name: 'portfolio-storage',
      partialize: (state) => ({ lang: state.lang }),
    }
  )
);
