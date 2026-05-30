import { Box, Button, Skeleton, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { useUpcomingCalendarEvents } from '@/entities/student-calendar'
import { ru } from '@/shared/i18n/ru'
import { PanelCard } from '@/widgets/student-dashboard/ui/PanelCard'
import { UpcomingEventRow } from '@/widgets/calendar-view/ui/UpcomingEventRow'

export function DashboardEventsPanel() {
  const { data, isLoading } = useUpcomingCalendarEvents(3)
  const events = data?.events ?? []

  return (
    <PanelCard
      title={ru.dashboard.eventsPanel}
      delay={0.26}
      action={
        <Button component={RouterLink} to="/student/calendar" size="small">
          {ru.common.calendar}
        </Button>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {isLoading ? (
          <>
            <Skeleton variant="rounded" height={64} animation="wave" />
            <Skeleton variant="rounded" height={64} animation="wave" />
          </>
        ) : events.length === 0 ? (
          <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
            {ru.common.nothingYet}
          </Typography>
        ) : (
          events.map((event, index) => <UpcomingEventRow key={event.id} event={event} index={index} />)
        )}
      </Box>
    </PanelCard>
  )
}
