import {
  Box,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import type { MaterialListItemVM } from '@/entities/materials'
import { CountUp } from '@/shared/ui/CountUp'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'
import { ru } from '@/shared/i18n/ru'
import { brandColors, glassSurface, motionCardHover } from '@/shared/theme/palette'
import { MaterialTypeIcon } from '@/widgets/materials-list/ui/MaterialTypeIcon'

type MaterialCardProps = {
  material: MaterialListItemVM
  index: number
}

const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' as const } },
}

function statusLabel(status: MaterialListItemVM['uiStatus']) {
  switch (status) {
    case 'completed':
      return ru.materials.status.completed
    case 'in_progress':
      return ru.materials.status.inProgress
    default:
      return ru.materials.status.notStarted
  }
}

function statusColor(status: MaterialListItemVM['uiStatus']): 'success' | 'primary' | 'default' {
  if (status === 'completed') return 'success'
  if (status === 'in_progress') return 'primary'
  return 'default'
}

function formatLastOpened(iso: string | null) {
  if (!iso) return ru.materials.lastOpenedNever
  try {
    return new Intl.DateTimeFormat('ru-RU', { dateStyle: 'medium', timeStyle: 'short' }).format(
      new Date(iso),
    )
  } catch {
    return ru.materials.lastOpenedNever
  }
}

export function MaterialCard({ material, index }: MaterialCardProps) {
  const reduced = useReducedMotion()
  const glow =
    material.uiStatus === 'in_progress'
      ? brandColors.neonBlue
      : material.uiStatus === 'completed'
        ? '0 0 16px rgba(34,197,94,0.25)'
        : 'none'

  return (
    <Box
      component={RouterLink}
      to={`/student/roadmap/blocks/${material.blockId}/materials/${material.id}`}
      sx={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
    >
      <Box
        component={motion.div}
        variants={cardVariant}
        initial="hidden"
        animate="show"
        transition={{ delay: index * 0.05 }}
        whileHover={reduced ? undefined : motionCardHover}
        sx={{
          ...glassSurface,
          p: 2.5,
          borderRadius: 3,
          border: '1px solid rgba(59, 130, 246, 0.12)',
          boxShadow: glow,
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start' }}>
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 2,
              display: 'grid',
              placeItems: 'center',
              bgcolor: 'rgba(59, 130, 246, 0.15)',
              color: material.uiStatus === 'completed' ? brandColors.success : 'primary.light',
              flexShrink: 0,
            }}
          >
            <MaterialTypeIcon uiType={material.uiType} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack direction="row" spacing={1} sx={{ mb: 0.5, flexWrap: 'wrap', alignItems: 'center' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                {material.title}
              </Typography>
              <Chip size="small" label={ru.materials.type[material.uiType]} variant="outlined" />
              <Chip size="small" label={statusLabel(material.uiStatus)} color={statusColor(material.uiStatus)} />
              {material.durationMinutes ? (
                <Chip
                  size="small"
                  label={`${material.durationMinutes} ${ru.materials.durationMinutes}`}
                  variant="outlined"
                />
              ) : null}
            </Stack>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mb: 1.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {material.description}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 0.5 }}>
              <LinearProgress
                variant="determinate"
                value={material.progressPercent}
                sx={{ flex: 1, height: 8, borderRadius: 4 }}
                color={material.uiStatus === 'completed' ? 'success' : 'primary'}
              />
              <Typography variant="caption" sx={{ minWidth: 36, fontWeight: 700 }}>
                <CountUp end={material.progressPercent} duration={0.8} suffix="%" />
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              {ru.materials.lastOpened}: {formatLastOpened(material.lastOpenedAt)}
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
