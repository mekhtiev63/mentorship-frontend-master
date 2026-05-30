import { Box } from '@mui/material'
import { motion } from 'framer-motion'
import { brandColors } from '@/shared/theme/palette'

type RoadmapSpineConnectorProps = {
  filled: boolean
  delay?: number
}

export function RoadmapSpineConnector({ filled, delay = 0 }: RoadmapSpineConnectorProps) {
  return (
    <Box
      component={motion.div}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      sx={{
        width: 4,
        flex: 1,
        minHeight: { xs: 32, lg: 48 },
        mx: 'auto',
        borderRadius: 2,
        transformOrigin: 'top',
        bgcolor: filled ? undefined : 'rgba(148, 163, 184, 0.25)',
        background: filled
          ? `linear-gradient(180deg, ${brandColors.success}, ${brandColors.primary})`
          : undefined,
      }}
    />
  )
}
