import { create } from 'zustand';
import { Theme } from '../utils/themeStants';
interface ThemeStore {
  currentTheme: Theme,
  setCurrentTheme:(theme: ThemeStore['currentTheme']) => void,
}

const useTheme = create<ThemeStore>((set) => ({
  currentTheme:'light',
  setCurrentTheme: (currentTheme: ThemeStore['currentTheme']) => set({ currentTheme }),
}));

export default useTheme;