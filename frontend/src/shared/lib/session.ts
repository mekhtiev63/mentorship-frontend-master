import { useSessionStore } from '@/entities/session'

export function isApiSessionActive(): boolean {
  return Boolean(useSessionStore.getState().accessToken)
}
