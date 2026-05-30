import { Box } from '@mui/material'
import { format, getDay, parse, startOfWeek } from 'date-fns'
import { ru as ruLocale } from 'date-fns/locale'
import { useMemo } from 'react'
import { Calendar, dateFnsLocalizer, type EventProps, type View } from 'react-big-calendar'
import { useNavigate } from 'react-router-dom'
import type { CalendarEventVM, CalendarViewMode } from '@/entities/student-calendar'
import { ru } from '@/shared/i18n/ru'
import { CalendarEventPill } from '@/widgets/calendar-view/ui/CalendarEventPill'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import '@/widgets/calendar-view/ui/calendar-dark.css'

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales: { ru: ruLocale },
})

export type CalendarRbcEvent = {
  title: string
  start: Date
  end: Date
  resource: CalendarEventVM
}

type StudentBigCalendarProps = {
  events: CalendarEventVM[]
  view: CalendarViewMode
  anchorDate: string
  onViewChange: (view: CalendarViewMode) => void
  onDateChange: (isoDate: string) => void
}

function EventComponent({ event }: EventProps<CalendarRbcEvent>) {
  return <CalendarEventPill event={event.resource} />
}

export function StudentBigCalendar({
  events,
  view,
  anchorDate,
  onViewChange,
  onDateChange,
}: StudentBigCalendarProps) {
  const navigate = useNavigate()

  const rbcEvents = useMemo(
    () =>
      events.map(
        (e): CalendarRbcEvent => ({
          title: e.title,
          start: new Date(e.startsAt),
          end: new Date(
            Math.max(new Date(e.endsAt).getTime(), new Date(e.startsAt).getTime() + 30 * 60 * 1000),
          ),
          resource: e,
        }),
      ),
    [events],
  )

  const date = useMemo(() => new Date(anchorDate), [anchorDate])

  return (
    <Box className="rbc-calendar-dark" sx={{ minHeight: 520 }}>
      <Calendar
        localizer={localizer}
        culture="ru"
        events={rbcEvents}
        view={view as View}
        date={date}
        onView={(v) => onViewChange(v as CalendarViewMode)}
        onNavigate={(d) => onDateChange(d.toISOString().slice(0, 10))}
        onSelectEvent={(ev) => navigate(ev.resource.href)}
        eventPropGetter={(ev) => ({
          style: {
            backgroundColor: ev.resource.color,
            boxShadow: `0 0 12px ${ev.resource.color}55`,
            borderLeft: `3px solid ${ev.resource.color}`,
          },
        })}
        components={{ event: EventComponent }}
        messages={{
          today: ru.calendarPage.toolbar.today,
          previous: ru.calendarPage.toolbar.back,
          next: ru.calendarPage.toolbar.next,
          month: ru.calendarPage.view.month,
          week: ru.calendarPage.view.week,
          day: ru.calendarPage.view.day,
          agenda: ru.calendarPage.view.month,
        }}
        style={{ height: 560 }}
      />
    </Box>
  )
}
