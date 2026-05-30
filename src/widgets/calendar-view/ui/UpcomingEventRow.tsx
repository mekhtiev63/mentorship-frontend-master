import { Box, Chip, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import type { CalendarEventVM } from '@/entities/student-calendar'
import { formatRuDateTime } from '@/shared/lib/datetime'
import { ru } from '@/shared/i18n/ru'
import { glassSurface, motionCardHover } from '@/shared/theme/palette'
import { CalendarEventTypeIcon } from '@/widgets/calendar-view/ui/CalendarEventTypeIcon'

type UpcomingEventRowProps = {
  event: CalendarEventVM
  index?: number
}

export function UpcomingEventRow({ event, index = 0 }: UpcomingEventRowProps) {
  return (
    <Box
      component={RouterLink}
      to={event.href}
      sx={{
        ...glassSurface,
        p: 1.5,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'row',
        gap: 1.25,
        alignItems: 'center',
        textDecoration: 'none',
        color: 'inherit',
        borderLeft: `3px solid ${event.color}`,
        opacity: event.status === 'cancelled' ? 0.5 : 1,
        transition: 'box-shadow 0.25s ease',
        '&:hover': { boxShadow: '0 12px 40px rgba(0,0,0,0.35)' },
      }}
    >
      <motion.div
        initial={{ opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        whileHover={motionCardHover}
        style={{ display: 'flex', gap: 10, alignItems: 'center', width: '100%' }}
      >
        <CalendarEventTypeIcon uiType={event.uiType} />
        <Stack spacing={0.25} sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }} noWrap>
            {event.title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatRuDateTime(event.startsAt)}
          </Typography>
        </Stack>
        <Chip
          size="small"
          label={ru.calendarPage.status[event.status]}
          sx={{ borderColor: event.color, color: event.color }}
          variant="outlined"
        />
      </motion.div>
    </Box>
  )
}
