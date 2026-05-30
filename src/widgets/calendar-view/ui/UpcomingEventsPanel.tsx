import { Stack, Typography } from '@mui/material'
import type { CalendarEventVM } from '@/entities/student-calendar'
import { ru } from '@/shared/i18n/ru'
import { PanelCard } from '@/widgets/student-dashboard/ui/PanelCard'
import { UpcomingEventRow } from '@/widgets/calendar-view/ui/UpcomingEventRow'

type UpcomingEventsPanelProps = {
  events: CalendarEventVM[]
  title?: string
}

export function UpcomingEventsPanel({
  events,
  title = ru.calendarPage.upcomingTitle,
}: UpcomingEventsPanelProps) {
  return (
    <PanelCard title={title} delay={0.15}>
      {events.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
          {ru.common.nothingYet}
        </Typography>
      ) : (
        <Stack spacing={1.5}>
          {events.map((e, i) => (
            <UpcomingEventRow key={e.id} event={e} index={i} />
          ))}
        </Stack>
      )}
    </PanelCard>
  )
}
