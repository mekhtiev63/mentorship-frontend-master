import { mapCalendarEventFromApi, mapSyntheticEvent } from '@/entities/student-calendar/model/map-calendar-event'
import { mergeSyntheticEvents } from '@/entities/student-calendar/model/merge-synthetic-events'
import type { CalendarEventVM } from '@/entities/student-calendar/model/types'
import { addDays } from '@/shared/lib/datetime'
import { ru } from '@/shared/i18n/ru'

const t = ru.mock.events

export function buildMockCalendarEvents(): CalendarEventVM[] {
  const now = new Date()
  const base = [
    mapSyntheticEvent({
      id: 'ev-mock-1',
      title: t.mockInterview,
      description: 'Mock-собеседование по Go и system design.',
      startsAt: addDays(now, 1).toISOString(),
      endsAt: new Date(addDays(now, 1).getTime() + 3600000).toISOString(),
      uiType: 'interview',
      status: 'scheduled',
      relatedType: 'interview',
      relatedId: 'int-1',
    }),
    mapSyntheticEvent({
      id: 'ev-mock-2',
      title: t.oneOnOne,
      description: 'Встреча с бадди: разбор прогресса и вопросы.',
      startsAt: addDays(now, 3).toISOString(),
      endsAt: new Date(addDays(now, 3).getTime() + 1800000).toISOString(),
      uiType: 'one_on_one',
      status: 'scheduled',
      relatedType: 'one_on_one',
      relatedId: 'o1-1',
    }),
    mapSyntheticEvent({
      id: 'ev-mock-3',
      title: t.roadmapReview,
      description: 'Ревью итогового проекта блока.',
      startsAt: addDays(now, 6).toISOString(),
      endsAt: new Date(addDays(now, 6).getTime() + 5400000).toISOString(),
      uiType: 'project_review',
      status: 'scheduled',
      relatedType: 'other',
      relatedId: null,
    }),
  ]

  return mergeSyntheticEvents(base)
}

export function findMockEventById(eventId: string): CalendarEventVM | null {
  const all = buildMockCalendarEvents()
  return all.find((e) => e.id === eventId) ?? null
}

export function mockEventToApiDto(e: CalendarEventVM) {
  return mapCalendarEventFromApi({
    id: e.id,
    organizer_id: 'mock',
    title: e.title,
    description: e.description,
    starts_at: e.startsAt,
    ends_at: e.endsAt,
    related_type: e.relatedType,
    related_id: e.relatedId,
    attendee_ids: [],
    cancelled: e.status === 'cancelled',
    deleted: false,
    created_at: e.startsAt,
    updated_at: e.startsAt,
  })
}
