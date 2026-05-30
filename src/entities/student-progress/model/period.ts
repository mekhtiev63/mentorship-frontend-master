import type { ProgressPeriod } from '@/entities/student-progress/model/types'

export const PROGRESS_PERIODS: ProgressPeriod[] = ['week', 'month', 'all']

export function isProgressPeriod(value: string | null): value is ProgressPeriod {
  return value === 'week' || value === 'month' || value === 'all'
}

export function periodStartDate(period: ProgressPeriod, now = new Date()): Date | null {
  if (period === 'all') return null
  const d = new Date(now)
  d.setHours(0, 0, 0, 0)
  if (period === 'week') {
    d.setDate(d.getDate() - 6)
    return d
  }
  d.setDate(d.getDate() - 29)
  return d
}

export function isWithinPeriod(isoDate: string, period: ProgressPeriod, now = new Date()): boolean {
  const start = periodStartDate(period, now)
  if (!start) return true
  const t = new Date(isoDate).getTime()
  return t >= start.getTime() && t <= now.getTime()
}
