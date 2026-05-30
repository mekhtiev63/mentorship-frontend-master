import MapIcon from '@mui/icons-material/Map'
import { Box, Button, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import { ru } from '@/shared/i18n/ru'
import { glassSurface } from '@/shared/theme/palette'

export function ProgressEmptyState() {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{ ...glassSurface, p: 4, borderRadius: 3, textAlign: 'center', maxWidth: 480, mx: 'auto' }}
    >
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
        {ru.progressPage.emptyTitle}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {ru.progressPage.emptyHint}
      </Typography>
      <Button component={RouterLink} to="/student/roadmap" variant="contained" startIcon={<MapIcon />}>
        {ru.progressPage.emptyAction}
      </Button>
    </Box>
  )
}
