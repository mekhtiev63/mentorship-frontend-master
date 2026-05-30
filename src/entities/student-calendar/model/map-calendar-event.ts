import { colorForEventType } from '@/entities/student-calendar/config/event-type-theme'
import { deriveEventStatus } from '@/entities/student-calendar/model/derive-event-status'
import { deriveUiEventTypeFromApi } from '@/entities/student-calendar/model/derive-ui-event-type'
import type { CalendarEventApiDto, CalendarEventVM } from '@/entities/student-calendar/model/types'

export function mapCalendarEventFromApi(dto: CalendarEventApiDto): CalendarEventVM {
  const uiType = deriveUiEventTypeFromApi(dto)
  const status = deriveEventStatus(dto.starts_at, dto.ends_at, dto.cancelled)
  return {
    id: dto.id,
    title: dto.title.replace(/^\[deadline\]\s*/i, ''),
    description: dto.description,
    startsAt: dto.starts_at,
    endsAt: dto.ends_at,
    uiType,
    status,
    relatedType: dto.related_type,
    relatedId: dto.related_id ?? null,
    href: `/student/calendar/events/${dto.id}`,
    color: colorForEventType(uiType),
    source: 'api',
  }
}

export function mapSyntheticEvent(
  partial: Omit<CalendarEventVM, 'source' | 'color' | 'href'> & { id: string },
): CalendarEventVM {
  return {
    ...partial,
    href: `/student/calendar/events/${partial.id}`,
    color: colorForEventType(partial.uiType),
    source: 'synthetic',
  }
}
