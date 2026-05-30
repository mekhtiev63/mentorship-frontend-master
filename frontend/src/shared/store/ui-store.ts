import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ThemeMode = 'light' | 'dark'
export type UiLocale = 'ru'

type UiState = {
  sidebarOpen: boolean
  themeMode: ThemeMode
  locale: UiLocale
  setSidebarOpen: (open: boolean) => void
  toggleSidebar: () => void
  setThemeMode: (mode: ThemeMode) => void
  setLocale: (locale: UiLocale) => void
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      themeMode: 'dark',
      locale: 'ru',
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setThemeMode: (mode) => set({ themeMode: mode }),
      setLocale: (locale) => set({ locale }),
    }),
    {
      name: 'go-mentorship-ui',
      partialize: (s) => ({ themeMode: s.themeMode, locale: s.locale }),
    },
  ),
)
