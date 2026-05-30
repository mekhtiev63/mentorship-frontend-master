import type { UiCalendarEventStatus } from '@/entities/student-calendar/model/types'

export function deriveEventStatus(
  startsAt: string,
  endsAt: string,
  cancelled: boolean,
  now = new Date(),
): UiCalendarEventStatus {
  if (cancelled) return 'cancelled'
  const start = new Date(startsAt).getTime()
  const end = new Date(endsAt).getTime()
  const t = now.getTime()
  if (t > end) return 'completed'
  if (t >= start && t <= end) return 'live'
  return 'scheduled'
}
