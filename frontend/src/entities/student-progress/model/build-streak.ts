import type { ActivityEntryApi } from '@/entities/profile-overview/model/api-types'

export function computeStreakDays(activityItems: ActivityEntryApi[], fallback = 12): number {
  if (activityItems.length === 0) return fallback

  const daySet = new Set<string>()
  for (const e of activityItems) {
    daySet.add(new Date(e.occurred_at).toISOString().slice(0, 10))
  }

  let streak = 0
  const cursor = new Date()
  cursor.setHours(0, 0, 0, 0)

  for (;;) {
    const key = cursor.toISOString().slice(0, 10)
    if (daySet.has(key)) {
      streak += 1
      cursor.setDate(cursor.getDate() - 1)
    } else {
      break
    }
  }

  return streak > 0 ? streak : fallback
}
