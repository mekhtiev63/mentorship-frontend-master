import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { ProgressPeriod } from '@/entities/student-progress'
import { isProgressPeriod } from '@/entities/student-progress/model/period'

const DEFAULT_PERIOD: ProgressPeriod = 'month'

export function useProgressPeriod() {
  const [searchParams, setSearchParams] = useSearchParams()

  const period = useMemo(() => {
    const raw = searchParams.get('period')
    return isProgressPeriod(raw) ? raw : DEFAULT_PERIOD
  }, [searchParams])

  const setPeriod = useCallback(
    (next: ProgressPeriod) => {
      setSearchParams(
        (prev) => {
          const p = new URLSearchParams(prev)
          p.set('period', next)
          return p
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  return { period, setPeriod }
}
