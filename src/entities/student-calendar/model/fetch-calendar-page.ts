import type {
  CalendarEventFilter,
  CalendarPageVM,
  CalendarViewMode,
} from '@/entities/student-calendar/model/types'
import {
  getCalendarEventApi,
  listCalendarEventsApi,
  listUpcomingCalendarEventsApi,
} from '@/entities/student-calendar/api/calendar.api'
import {
  filterEventsBySearch,
  filterEventsByType,
  pickUpcoming,
} from '@/entities/student-calendar/model/filter-events'
import { mapCalendarEventFromApi } from '@/entities/student-calendar/model/map-calendar-event'
import {
  buildMockCalendarEvents,
  findMockEventById,
} from '@/entities/student-calendar/model/mock-calendar-events'
import { computeRangeForView } from '@/shared/lib/datetime'
import { meApi } from '@/entities/session/api/session.api'
import { isApiSessionActive } from '@/shared/lib/session'

export type FetchCalendarPageParams = {
  anchorDate: string
  view: CalendarViewMode
  filter: CalendarEventFilter
  search: string
}

function buildVmFromEvents(
  events: import('@/entities/student-calendar/model/types').CalendarEventVM[],
  params: FetchCalendarPageParams,
  dataSource: CalendarPageVM['dataSource'],
  partialError: boolean,
): CalendarPageVM {
  let filtered = filterEventsByType(events, params.filter)
  filtered = filterEventsBySearch(filtered, params.search)
  const upcoming = pickUpcoming(events, 8)
  return {
    anchorDate: params.anchorDate,
    view: params.view,
    filter: params.filter,
    events: filtered,
    upcoming,
    partialError,
    dataSource,
  }
}

export async function fetchCalendarPage(params: FetchCalendarPageParams): Promise<CalendarPageVM> {
  const { from, to } = computeRangeForView(params.anchorDate, params.view)

  const me = await meApi().catch(() => null)
  if (!me) {
    return buildVmFromEvents(buildMockCalendarEvents(), params, 'mock', false)
  }

  try {
    const items = await listCalendarEventsApi({ from, to, perPage: 200 })
    const events = items.map(mapCalendarEventFromApi)
    return buildVmFromEvents(events, params, 'api', false)
  } catch {
    const mock = buildMockCalendarEvents()
    return buildVmFromEvents(mock, params, 'mock', true)
  }
}

export async function fetchUpcomingCalendarEvents(limit = 8) {
  const me = await meApi().catch(() => null)
  if (!me) {
    return { events: pickUpcoming(buildMockCalendarEvents(), limit), dataSource: 'mock' as const }
  }
  try {
    const items = await listUpcomingCalendarEventsApi({ perPage: limit * 2 })
    const events = items.map(mapCalendarEventFromApi)
    return { events: pickUpcoming(events, limit), dataSource: 'api' as const }
  } catch {
    return { events: pickUpcoming(buildMockCalendarEvents(), limit), dataSource: 'mock' as const }
  }
}

export async function fetchCalendarEventDetail(eventId: string) {
  if (!isApiSessionActive()) {
    const mockHit = findMockEventById(eventId)
    if (mockHit) return { event: mockHit, dataSource: 'mock' as const }
  }

  const dto = await getCalendarEventApi(eventId)
  return { event: mapCalendarEventFromApi(dto), dataSource: 'api' as const }
}
