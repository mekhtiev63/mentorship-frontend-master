import { apiClient } from '@/shared/api/client'
import type { ApiEnvelope } from '@/shared/api/types'
import type { CalendarEventApiDto } from '@/entities/student-calendar/model/types'

type ListPayload = { items: CalendarEventApiDto[]; meta?: unknown }

export async function listCalendarEventsApi(params: {
  from: string
  to: string
  relatedType?: string
  page?: number
  perPage?: number
}): Promise<CalendarEventApiDto[]> {
  const { data } = await apiClient.get<ApiEnvelope<ListPayload>>('/calendar/events', {
    params: {
      from: params.from,
      to: params.to,
      related_type: params.relatedType,
      page: params.page ?? 1,
      per_page: params.perPage ?? 100,
    },
  })
  return data.data.items ?? []
}

export async function listUpcomingCalendarEventsApi(params: {
  page?: number
  perPage?: number
} = {}): Promise<CalendarEventApiDto[]> {
  const { data } = await apiClient.get<ApiEnvelope<ListPayload>>('/calendar/events/upcoming', {
    params: { page: params.page ?? 1, per_page: params.perPage ?? 20 },
  })
  return data.data.items ?? []
}

export async function getCalendarEventApi(eventId: string): Promise<CalendarEventApiDto> {
  const { data } = await apiClient.get<ApiEnvelope<CalendarEventApiDto>>(
    `/calendar/events/${eventId}`,
  )
  return data.data
}
