import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import type { CalendarEventVM } from '@/entities/student-calendar'
import { formatRuTimeRange } from '@/shared/lib/datetime'
import { ru } from '@/shared/i18n/ru'
import { glassSurface } from '@/shared/theme/palette'
import { CalendarEventTypeIcon } from '@/widgets/calendar-view/ui/CalendarEventTypeIcon'

type CalendarEventDetailCardProps = {
  event: CalendarEventVM
}

export function CalendarEventDetailCard({ event }: CalendarEventDetailCardProps) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{
        ...glassSurface,
        p: 3,
        borderRadius: 3,
        borderLeft: `4px solid ${event.color}`,
        boxShadow: `0 0 28px ${event.color}33`,
      }}
    >
      <Button
        component={RouterLink}
        to="/student/calendar"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
        size="small"
      >
        {ru.calendarPage.detail.back}
      </Button>

      <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start', mb: 2 }}>
        <CalendarEventTypeIcon uiType={event.uiType} size={26} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            {event.title}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
            <Chip label={ru.calendarPage.type[event.uiType]} size="small" sx={{ borderColor: event.color }} />
            <Chip label={ru.calendarPage.status[event.status]} size="small" variant="outlined" />
          </Stack>
        </Box>
      </Stack>

      <Stack spacing={2}>
        <Box>
          <Typography variant="overline" color="text.secondary">
            {ru.calendarPage.detail.date}
          </Typography>
          <Typography variant="body1">{formatRuTimeRange(event.startsAt, event.endsAt)}</Typography>
        </Box>
        <Box>
          <Typography variant="overline" color="text.secondary">
            {ru.calendarPage.detail.description}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {event.description || '—'}
          </Typography>
        </Box>
      </Stack>
    </Box>
  )
}
