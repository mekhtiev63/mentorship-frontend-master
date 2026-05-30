import { useEffect, useRef } from 'react'
import { fireCelebrationConfetti } from '@/shared/lib/confetti'

type UseCelebrationOptions = {
  enabled: boolean
  storageKey?: string
}

/** Fires confetti once per storage key when enabled (e.g. new achievement). */
export function useCelebration({ enabled, storageKey = 'celebration-fired' }: UseCelebrationOptions): void {
  const fired = useRef(false)

  useEffect(() => {
    if (!enabled || fired.current) return
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem(storageKey)) return

    fired.current = true
    fireCelebrationConfetti()
    try {
      sessionStorage.setItem(storageKey, '1')
    } catch {
      /* ignore */
    }
  }, [enabled, storageKey])
}
