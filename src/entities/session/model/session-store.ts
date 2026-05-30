import { createJSONStorage, persist } from 'zustand/middleware'
import { create } from 'zustand'
import type { UserDto } from '@/entities/session/model/types'

type SessionState = {
  accessToken: string | null
  refreshToken: string | null
  user: UserDto | null
  setSession: (accessToken: string, refreshToken: string | null, user: UserDto) => void
  setUser: (user: UserDto) => void
  clearSession: () => void
  isAuthenticated: () => boolean
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      setSession: (accessToken, refreshToken, user) =>
        set({ accessToken, refreshToken, user }),
      setUser: (user) => set({ user }),
      clearSession: () => set({ accessToken: null, refreshToken: null, user: null }),
      isAuthenticated: () => Boolean(get().accessToken),
    }),
    {
      name: 'mentorship-session',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
    },
  ),
)
