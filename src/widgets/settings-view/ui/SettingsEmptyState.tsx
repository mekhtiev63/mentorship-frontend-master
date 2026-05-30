import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { ru } from '@/shared/i18n/ru'
import { glassSurface } from '@/shared/theme/palette'

type SettingsEmptyStateProps = {
  message?: string
}

export function SettingsEmptyState({ message }: SettingsEmptyStateProps) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{ ...glassSurface, borderRadius: 3, py: 4, px: 2, textAlign: 'center' }}
    >
      <SettingsOutlinedIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
      <Typography variant="body2" color="text.secondary">
        {message ?? ru.settingsPage.emptySessions}
      </Typography>
    </Box>
  )
}
