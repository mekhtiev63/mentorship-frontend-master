import { useQuery } from '@tanstack/react-query'
import {
  fetchCalendarEventDetail,
  fetchCalendarPage,
  fetchUpcomingCalendarEvents,
  type FetchCalendarPageParams,
} from '@/entities/student-calendar/model/fetch-calendar-page'
import { calendarKeys } from '@/entities/student-calendar/model/query-keys'
import { useSessionStore } from '@/entities/session'

export function useCalendarPage(params: FetchCalendarPageParams) {
  const userId = useSessionStore((s) => s.user?.id)
  return useQuery({
    queryKey: calendarKeys.page(params.view, params.anchorDate, params.filter, params.search),
    queryFn: () => fetchCalendarPage(params),
    enabled: Boolean(userId),
    staleTime: 60_000,
  })
}

export function useUpcomingCalendarEvents(limit = 8) {
  const userId = useSessionStore((s) => s.user?.id)
  return useQuery({
    queryKey: calendarKeys.upcoming(limit),
    queryFn: async () => {
      const res = await fetchUpcomingCalendarEvents(limit)
      return res
    },
    enabled: Boolean(userId),
    staleTime: 60_000,
  })
}

export function useCalendarEventDetail(eventId: string) {
  const userId = useSessionStore((s) => s.user?.id)
  return useQuery({
    queryKey: calendarKeys.detail(eventId),
    queryFn: () => fetchCalendarEventDetail(eventId),
    enabled: Boolean(userId) && Boolean(eventId),
    staleTime: 60_000,
  })
}
