export {
  useCalendarPage,
  useUpcomingCalendarEvents,
  useCalendarEventDetail,
} from '@/entities/student-calendar/model/useCalendarQueries'
export type {
  CalendarEventVM,
  CalendarPageVM,
  CalendarEventFilter,
  CalendarViewMode,
  UiCalendarEventType,
  UiCalendarEventStatus,
} from '@/entities/student-calendar/model/types'
export { calendarKeys } from '@/entities/student-calendar/model/query-keys'
export { colorForEventType } from '@/entities/student-calendar/config/event-type-theme'
