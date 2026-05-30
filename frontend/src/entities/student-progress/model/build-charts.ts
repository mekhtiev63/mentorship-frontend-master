import type { ActivityEntryApi } from '@/entities/profile-overview/model/api-types'
import type { ActivityByDayPoint, ProgressPeriod } from '@/entities/student-progress/model/types'
import { isWithinPeriod, periodStartDate } from '@/entities/student-progress/model/period'
import { ru } from '@/shared/i18n/ru'

const MINUTES_PER_ACTIVITY = 15

function formatDayLabel(d: Date): string {
  return d.toLocaleDateString('ru-RU', { weekday: 'short', day: 'numeric' })
}

function dateKey(d: Date): string {
  return d.toISOString().slice(0, 10)
}

export function buildActivityByDay(
  items: ActivityEntryApi[],
  period: ProgressPeriod,
): ActivityByDayPoint[] {
  const now = new Date()
  const start = periodStartDate(period, now)
  const filtered = items.filter((e) => isWithinPeriod(e.occurred_at, period, now))

  if (period === 'all' && filtered.length === 0) {
    return Object.values(ru.charts.days).map((label, i) => ({
      label,
      dateKey: `demo-${i}`,
      minutes: [45, 62, 28, 90, 55, 120, 40][i] ?? 30,
      sessions: 2,
    }))
  }

  const bucket = new Map<string, { minutes: number; sessions: number; label: string }>()

  if (start) {
    const cursor = new Date(start)
    while (cursor <= now) {
      const key = dateKey(cursor)
      bucket.set(key, { minutes: 0, sessions: 0, label: formatDayLabel(cursor) })
      cursor.setDate(cursor.getDate() + 1)
    }
  }

  for (const entry of filtered) {
    const d = new Date(entry.occurred_at)
    const key = dateKey(d)
    const prev = bucket.get(key) ?? { minutes: 0, sessions: 0, label: formatDayLabel(d) }
    prev.minutes += MINUTES_PER_ACTIVITY
    prev.sessions += 1
    bucket.set(key, prev)
  }

  if (bucket.size === 0) {
    return [{ label: formatDayLabel(now), dateKey: dateKey(now), minutes: 0, sessions: 0 }]
  }

  return [...bucket.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([dateKeyVal, v]) => ({
      label: v.label,
      dateKey: dateKeyVal,
      minutes: v.minutes,
      sessions: v.sessions,
    }))
}

export function sumLearningMinutes(points: ActivityByDayPoint[]): number {
  return points.reduce((s, p) => s + p.minutes, 0)
}
