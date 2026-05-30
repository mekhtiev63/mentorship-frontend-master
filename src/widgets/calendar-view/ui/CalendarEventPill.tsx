import { Box, Typography } from '@mui/material'
import type { CalendarEventVM } from '@/entities/student-calendar'
import { ru } from '@/shared/i18n/ru'

type CalendarEventPillProps = {
  event: CalendarEventVM
}

export function CalendarEventPill({ event }: CalendarEventPillProps) {
  const muted = event.status === 'cancelled' || event.status === 'completed'
  return (
    <Box
      sx={{
        opacity: muted ? 0.55 : 1,
        textDecoration: event.status === 'cancelled' ? 'line-through' : 'none',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }}
      title={event.title}
    >
      <Typography component="span" variant="caption" sx={{ fontWeight: 700 }}>
        {event.title}
      </Typography>
      <Typography component="span" variant="caption" sx={{ ml: 0.5, opacity: 0.85 }}>
        · {ru.calendarPage.type[event.uiType]}
      </Typography>
    </Box>
  )
}
