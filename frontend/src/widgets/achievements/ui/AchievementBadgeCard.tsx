import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import type { AchievementDefinition } from '@/widgets/achievements/model/achievements-catalog'
import { glassSurface, motionCardHover } from '@/shared/theme/palette'
import { ru } from '@/shared/i18n/ru'

type AchievementBadgeCardProps = {
  achievement: AchievementDefinition
  index?: number
  compact?: boolean
}

export function AchievementBadgeCard({ achievement, index = 0, compact = false }: AchievementBadgeCardProps) {
  const Icon = achievement.icon
  const unlocked = achievement.unlocked

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      whileHover={unlocked ? motionCardHover : undefined}
      sx={{
        ...glassSurface,
        p: compact ? 1.5 : 2,
        borderRadius: 2,
        height: '100%',
        opacity: unlocked ? 1 : 0.55,
        borderColor: unlocked ? 'rgba(34, 197, 94, 0.35)' : 'rgba(255,255,255,0.06)',
        boxShadow: unlocked ? '0 0 24px rgba(59, 130, 246, 0.12)' : 'none',
        transition: 'box-shadow 0.25s ease',
        '&:hover': unlocked
          ? { boxShadow: '0 12px 40px rgba(0,0,0,0.35)' }
          : undefined,
      }}
    >
      <Box
        sx={{
          width: compact ? 40 : 48,
          height: compact ? 40 : 48,
          borderRadius: 2,
          display: 'grid',
          placeItems: 'center',
          position: 'relative',
          mb: 1.5,
          background: unlocked
            ? 'linear-gradient(135deg, rgba(59,130,246,0.35), rgba(139,92,246,0.35))'
            : 'rgba(255,255,255,0.06)',
        }}
      >
        {unlocked ? (
          <Icon sx={{ color: 'primary.light' }} />
        ) : (
          <>
            <Icon sx={{ color: 'text.disabled', opacity: 0.35, position: 'absolute' }} />
            <LockOutlinedIcon fontSize="small" color="disabled" />
          </>
        )}
      </Box>
      <Typography variant={compact ? 'subtitle2' : 'subtitle1'} sx={{ fontWeight: 600 }} gutterBottom>
        {achievement.title}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1.4 }}>
        {achievement.description}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          mt: 1.5,
          display: 'inline-block',
          px: 1,
          py: 0.25,
          borderRadius: 1,
          bgcolor: unlocked ? 'success.main' : 'action.hover',
          color: unlocked ? 'success.contrastText' : 'text.secondary',
          fontWeight: 600,
          fontSize: '0.65rem',
          textTransform: 'uppercase',
          letterSpacing: 0.6,
        }}
      >
        {unlocked ? ru.achievements.unlocked : ru.achievements.locked}
      </Typography>
    </Box>
  )
}
