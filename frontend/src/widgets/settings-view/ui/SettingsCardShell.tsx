import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { glassSurface } from '@/shared/theme/palette'

type SettingsCardShellProps = {
  title: string
  accent: string
  children: ReactNode
  delay?: number
}

export function SettingsCardShell({ title, accent, children, delay = 0 }: SettingsCardShellProps) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      sx={{
        ...glassSurface,
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        borderLeft: `4px solid ${accent}`,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
        {title}
      </Typography>
      {children}
    </Box>
  )
}
