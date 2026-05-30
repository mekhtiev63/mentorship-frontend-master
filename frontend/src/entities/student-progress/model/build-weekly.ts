import type { ActivityEntryApi } from '@/entities/profile-overview/model/api-types'
import type { WeeklyProgressPoint } from '@/entities/student-progress/model/types'
import { isWithinPeriod } from '@/entities/student-progress/model/period'
import { ru } from '@/shared/i18n/ru'

export function buildWeeklyProgress(
  activityItems: ActivityEntryApi[],
  period: import('@/entities/student-progress/model/types').ProgressPeriod,
): WeeklyProgressPoint[] {
  const now = new Date()
  const weeks = Object.values(ru.charts.weeks)
  const filtered = activityItems.filter((e) => isWithinPeriod(e.occurred_at, period, now))

  if (period === 'all' && filtered.length === 0) {
    return weeks.map((weekLabel, i) => ({
      weekLabel,
      completedUnits: [3, 4, 5, 2, 4, 6][i] ?? 3,
      targetUnits: 5,
    }))
  }

  const bucketCount = period === 'week' ? 1 : period === 'month' ? 4 : 6
  const labels = weeks.slice(0, bucketCount)
  const counts = labels.map(() => 0)

  for (const entry of filtered) {
    const d = new Date(entry.occurred_at)
    const daysAgo = Math.floor((now.getTime() - d.getTime()) / 86400000)
    const weekIndex = Math.min(counts.length - 1, Math.floor(daysAgo / 7))
    counts[counts.length - 1 - weekIndex] += 1
  }

  return labels.map((weekLabel, i) => ({
    weekLabel,
    completedUnits: counts[i] ?? 0,
    targetUnits: 5,
  }))
}
