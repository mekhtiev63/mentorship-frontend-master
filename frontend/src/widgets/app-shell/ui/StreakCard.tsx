import { Box, LinearProgress, Typography } from '@mui/material'
import { Flame } from 'lucide-react'
import { motion } from 'framer-motion'
import { mockGamification } from '@/entities/student-dashboard/model/gamification-mock'
import { ru } from '@/shared/i18n/ru'
import { brandColors, glassSurface, motionCardHover } from '@/shared/theme/palette'

export function StreakCard() {
  const { streakDays, streakTarget } = mockGamification
  const progress = Math.min(100, Math.round((streakDays / streakTarget) * 100))

  return (
    <Box
      component={motion.div}
      whileHover={motionCardHover}
      sx={{
        ...glassSurface,
        mx: 1.5,
        mt: 2,
        p: 2,
        borderRadius: 2.5,
        border: '1px solid rgba(245, 158, 11, 0.25)',
        boxShadow: '0 0 32px rgba(245, 158, 11, 0.12)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            display: 'grid',
            placeItems: 'center',
            background: 'linear-gradient(135deg, #F59E0B, #EF4444)',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.45)',
          }}
        >
          <Flame size={20} color="#fff" />
        </Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          {ru.gamification.streakTitle}
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 0.5 }}>
        {streakDays}{' '}
        <Typography component="span" variant="body2" color="text.secondary">
          {ru.gamification.streakSubtitle}
        </Typography>
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
        {ru.gamification.streakProgress}: {streakTarget} {ru.gamification.streakSubtitle}
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 6,
          borderRadius: 3,
          bgcolor: 'rgba(255,255,255,0.08)',
          '& .MuiLinearProgress-bar': {
            borderRadius: 3,
            background: `linear-gradient(90deg, ${brandColors.warning}, #EF4444)`,
          },
        }}
      />
    </Box>
  )
}
