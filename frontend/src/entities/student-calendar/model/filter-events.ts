import type { CalendarEventFilter, CalendarEventVM } from '@/entities/student-calendar/model/types'

export function filterEventsByType(
  events: CalendarEventVM[],
  filter: CalendarEventFilter,
): CalendarEventVM[] {
  switch (filter) {
    case 'interviews':
      return events.filter((e) => e.uiType === 'interview')
    case 'meetings':
      return events.filter((e) => e.uiType === 'one_on_one')
    case 'deadlines':
      return events.filter((e) => e.uiType === 'block_deadline' || e.uiType === 'reminder')
    default:
      return events
  }
}

export function filterEventsBySearch(events: CalendarEventVM[], query: string): CalendarEventVM[] {
  const q = query.trim().toLowerCase()
  if (!q) return events
  return events.filter(
    (e) =>
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q),
  )
}

export function pickUpcoming(events: CalendarEventVM[], limit: number, now = new Date()): CalendarEventVM[] {
  const t = now.getTime()
  return events
    .filter((e) => e.status !== 'cancelled' && new Date(e.startsAt).getTime() >= t)
    .sort((a, b) => a.startsAt.localeCompare(b.startsAt))
    .slice(0, limit)
}
