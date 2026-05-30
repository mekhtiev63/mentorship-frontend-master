export type UiCalendarEventType =
  | 'interview'
  | 'one_on_one'
  | 'block_deadline'
  | 'project_review'
  | 'reminder'

export type UiCalendarEventStatus = 'scheduled' | 'live' | 'completed' | 'cancelled'

export type CalendarEventFilter = 'all' | 'interviews' | 'meetings' | 'deadlines'

export type CalendarViewMode = 'month' | 'week' | 'day'

export type CalendarEventApiDto = {
  id: string
  organizer_id: string
  title: string
  description: string
  starts_at: string
  ends_at: string
  related_type: string
  related_id?: string | null
  attendee_ids: string[]
  cancelled: boolean
  deleted: boolean
  cancelled_at?: string | null
  created_at: string
  updated_at: string
}

export type CalendarEventVM = {
  id: string
  title: string
  description: string
  startsAt: string
  endsAt: string
  uiType: UiCalendarEventType
  status: UiCalendarEventStatus
  relatedType: string
  relatedId: string | null
  href: string
  color: string
  source: 'api' | 'synthetic'
}

export type CalendarPageVM = {
  anchorDate: string
  view: CalendarViewMode
  filter: CalendarEventFilter
  events: CalendarEventVM[]
  upcoming: CalendarEventVM[]
  partialError: boolean
  dataSource: 'api' | 'mock' | 'mixed'
}
