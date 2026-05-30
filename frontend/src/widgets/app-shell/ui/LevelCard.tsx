import { Box, LinearProgress, Typography } from '@mui/material'
import { Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import { mockGamification } from '@/entities/student-dashboard/model/gamification-mock'
import { ru } from '@/shared/i18n/ru'
import { brandColors, glassSurface, motionCardHover } from '@/shared/theme/palette'

export function LevelCard() {
  const { levelTitle, xpCurrent, xpToNext } = mockGamification
  const progress = Math.round((xpCurrent / xpToNext) * 100)

  return (
    <Box
      component={motion.div}
      whileHover={motionCardHover}
      sx={{
        ...glassSurface,
        mx: 1.5,
        mt: 1.5,
        mb: 2,
        p: 2,
        borderRadius: 2.5,
        border: '1px solid rgba(139, 92, 246, 0.3)',
        boxShadow: brandColors.neonViolet,
      }}
    >
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
        <Box
          component={motion.div}
          animate={{ rotate: [0, 8, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          sx={{
            width: 44,
            height: 44,
            borderRadius: '50%',
            flexShrink: 0,
            display: 'grid',
            placeItems: 'center',
            background: brandColors.heroGradient,
            boxShadow: brandColors.neonBlue,
          }}
        >
          <Sparkles size={22} color="#F8FAFC" />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            {ru.gamification.yourLevel}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.3, mb: 1 }}>
            {levelTitle}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {ru.gamification.xpLabel}: {xpCurrent} / {xpToNext}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              mt: 1,
              height: 7,
              borderRadius: 4,
              bgcolor: 'rgba(255,255,255,0.08)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background: brandColors.heroGradient,
                boxShadow: brandColors.neonViolet,
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
