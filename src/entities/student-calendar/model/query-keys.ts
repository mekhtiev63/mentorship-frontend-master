import type { CalendarEventFilter, CalendarViewMode } from '@/entities/student-calendar/model/types'

export const calendarKeys = {
  all: ['student-calendar'] as const,
  page: (view: CalendarViewMode, anchorDate: string, filter: CalendarEventFilter, search: string) =>
    [...calendarKeys.all, 'page', view, anchorDate, filter, search] as const,
  upcoming: (limit: number) => [...calendarKeys.all, 'upcoming', limit] as const,
  detail: (eventId: string) => [...calendarKeys.all, 'detail', eventId] as const,
}
