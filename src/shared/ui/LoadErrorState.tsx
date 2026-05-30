import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlineOutlined'
import RefreshIcon from '@mui/icons-material/Refresh'
import { Box, Button, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { GlassSurface } from '@/shared/ui/GlassSurface'
import { ru } from '@/shared/i18n/ru'

type LoadErrorStateProps = {
  title?: string
  message?: string
  onRetry?: () => void
}

export function LoadErrorState({
  title = ru.errors.loadFailed,
  message = ru.errors.loadFailedHint,
  onRetry,
}: LoadErrorStateProps) {
  return (
    <Box component={motion.div} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <GlassSurface sx={{ p: 3, textAlign: 'center' }}>
        <ErrorOutlineIcon sx={{ fontSize: 48, color: 'error.main', mb: 1 }} />
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
          {message}
        </Typography>
        {onRetry ? (
          <Button variant="contained" startIcon={<RefreshIcon />} onClick={onRetry}>
            {ru.errors.retry}
          </Button>
        ) : null}
      </GlassSurface>
    </Box>
  )
}
