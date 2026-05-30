import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined'
import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { ru } from '@/shared/i18n/ru'
import { glassSurface } from '@/shared/theme/palette'

type EmptyMeetingsStateProps = {
  filtered?: boolean
}

export function EmptyMeetingsState({ filtered = false }: EmptyMeetingsStateProps) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{
        ...glassSurface,
        borderRadius: 3,
        py: 6,
        px: 3,
        textAlign: 'center',
      }}
    >
      <EventBusyOutlinedIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        {filtered ? ru.oneOnOnePage.emptyFiltered : ru.oneOnOnePage.empty}
      </Typography>
    </Box>
  )
}
