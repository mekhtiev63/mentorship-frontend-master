import { Box, Chip, LinearProgress, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import type { MaterialDetailPageVM } from '@/entities/material-detail'
import { CountUp } from '@/shared/ui/CountUp'
import { ru } from '@/shared/i18n/ru'
import { brandColors, glassSurface } from '@/shared/theme/palette'
import { MaterialTypeIcon } from '@/widgets/materials-list/ui/MaterialTypeIcon'

type MaterialDetailHeroProps = {
  vm: MaterialDetailPageVM
  progressPercent: number
  status: 'not_started' | 'in_progress' | 'completed'
}

function durationMinutes(vm: MaterialDetailPageVM): number | null {
  const c = vm.content
  if (c.kind === 'article' || c.kind === 'video') return c.estimatedMinutes
  return null
}

function statusLabel(status: MaterialDetailHeroProps['status']) {
  if (status === 'completed') return ru.materials.status.completed
  if (status === 'in_progress') return ru.materials.status.inProgress
  return ru.materials.status.notStarted
}

export function MaterialDetailHero({ vm, progressPercent, status }: MaterialDetailHeroProps) {
  const mins = durationMinutes(vm)

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{
        ...glassSurface,
        p: 3,
        borderRadius: 3,
        boxShadow: brandColors.neonBlue,
      }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 2,
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'rgba(59, 130, 246, 0.15)',
            color: 'primary.light',
          }}
        >
          <MaterialTypeIcon uiType={vm.uiType} fontSize="large" />
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5 }}>
            {vm.meta.title}
          </Typography>
          <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            <Chip label={ru.materials.type[vm.uiType]} size="small" />
            <Chip
              label={
                mins != null
                  ? `${mins} ${ru.materials.durationMinutes}`
                  : ru.materialDetail.durationUnknown
              }
              size="small"
              variant="outlined"
            />
            <Chip label={statusLabel(status)} size="small" color={status === 'completed' ? 'success' : 'default'} />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {ru.materialDetail.progressLabel}:{' '}
            <CountUp end={progressPercent} suffix="%" duration={0.6} />
          </Typography>
          <LinearProgress
            variant="determinate"
            value={progressPercent}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: 'rgba(255,255,255,0.06)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                background: brandColors.heroGradient,
              },
            }}
          />
        </Box>
      </Stack>
    </Box>
  )
}
