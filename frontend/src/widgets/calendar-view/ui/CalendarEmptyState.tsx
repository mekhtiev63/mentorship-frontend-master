import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import { Box, Button, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { ru } from '@/shared/i18n/ru'
import { glassSurface } from '@/shared/theme/palette'

export function CalendarEmptyState() {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{ ...glassSurface, p: 4, borderRadius: 3, textAlign: 'center', maxWidth: 440, mx: 'auto' }}
    >
      <CalendarMonthIcon sx={{ fontSize: 48, color: 'primary.light', mb: 1 }} />
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
        {ru.calendarPage.empty}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {ru.calendarPage.subtitle}
      </Typography>
      <Button variant="outlined" onClick={() => window.location.reload()}>
        Обновить
      </Button>
    </Box>
  )
}
