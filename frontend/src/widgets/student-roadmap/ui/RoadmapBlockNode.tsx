import CheckIcon from '@mui/icons-material/Check'
import LockIcon from '@mui/icons-material/Lock'
import {
  Box,
  Chip,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import type { RoadmapBlockVM } from '@/entities/roadmap'
import { CountUp } from '@/shared/ui/CountUp'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'
import { ru } from '@/shared/i18n/ru'
import { brandColors, glassSurface, motionCardHover } from '@/shared/theme/palette'

type RoadmapBlockNodeProps = {
  block: RoadmapBlockVM
  index: number
  side: 'left' | 'right' | 'full'
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: 'easeOut' as const },
  },
}

export function RoadmapBlockNode({ block, index, side }: RoadmapBlockNodeProps) {
  const reduced = useReducedMotion()
  const { uiStatus, progressStatus } = block
  const unlocked = uiStatus !== 'locked'

  const statusLabel =
    uiStatus === 'completed'
      ? ru.roadmap.stepCompleted
      : uiStatus === 'in_progress'
        ? ru.roadmap.stepInProgress
        : ru.roadmap.stepLocked

  const nodeColors = {
    completed: { bg: brandColors.success, border: brandColors.success, glow: '0 0 20px rgba(34,197,94,0.35)' },
    in_progress: { bg: brandColors.primary, border: brandColors.secondary, glow: brandColors.neonBlue },
    locked: { bg: 'rgba(148, 163, 184, 0.15)', border: 'rgba(255,255,255,0.08)', glow: 'none' },
  }[uiStatus]

  const content = (
    <Box
      component={motion.div}
      variants={item}
      whileHover={unlocked && !reduced ? motionCardHover : undefined}
      animate={
        uiStatus === 'in_progress' && !reduced
          ? {
              boxShadow: [
                '0 0 0 0 rgba(59,130,246,0.5)',
                '0 0 0 14px rgba(59,130,246,0)',
              ],
            }
          : undefined
      }
      transition={uiStatus === 'in_progress' ? { duration: 2, repeat: Infinity } : undefined}
      sx={{
        ...glassSurface,
        p: 2.5,
        borderRadius: 3,
        border: `1px solid ${nodeColors.border}`,
        boxShadow: uiStatus === 'completed' ? nodeColors.glow : uiStatus === 'in_progress' ? nodeColors.glow : 'none',
        opacity: uiStatus === 'locked' ? 0.72 : 1,
        maxWidth: { lg: 360 },
        width: '100%',
        cursor: unlocked ? 'pointer' : 'default',
        textDecoration: 'none',
        color: 'inherit',
        display: 'block',
      }}
    >
      <Stack direction="row" spacing={1} sx={{ mb: 1, alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.3 }}>
          {block.title}
        </Typography>
        <Chip size="small" label={statusLabel} color={uiStatus === 'completed' ? 'success' : uiStatus === 'in_progress' ? 'primary' : 'default'} />
      </Stack>

      {progressStatus === 'awaiting_approval' ? (
        <Chip size="small" label={ru.roadmap.awaitingApproval} color="info" sx={{ mb: 1 }} />
      ) : null}
      {progressStatus === 'rejected' && block.rejectReason ? (
        <Chip size="small" label={`${ru.roadmap.rejected}: ${block.rejectReason}`} color="warning" sx={{ mb: 1 }} />
      ) : null}

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {block.description || '—'}
      </Typography>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
        {ru.roadmap.materialsCount}: {block.completedCount}/{block.requiredCount}{' '}
        {ru.roadmap.materialsCompleted}
        {block.totalMaterials > block.requiredCount ? ` (${block.totalMaterials} ${ru.roadmap.materialsCount.toLowerCase()})` : ''}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ mb: 2, alignItems: 'center' }}>
        <LinearProgress
          variant="determinate"
          value={block.percent}
          sx={{ flex: 1, height: 8, borderRadius: 4 }}
          color={uiStatus === 'completed' ? 'success' : 'primary'}
        />
        <Typography variant="caption" sx={{ minWidth: 36, fontWeight: 700 }}>
          <CountUp end={block.percent} duration={1} suffix="%" />
        </Typography>
      </Stack>

      <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
        {ru.roadmap.expectedSkills}
      </Typography>
      <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap' }}>
        {block.skills.map((skill) => (
          <Chip key={skill} label={skill} size="small" variant="outlined" />
        ))}
      </Stack>

      {unlocked ? (
        <Typography variant="caption" color="primary.light" sx={{ display: 'block', mt: 2, fontWeight: 600 }}>
          {ru.roadmap.openBlock} →
        </Typography>
      ) : null}
    </Box>
  )

  const spineNode = (
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: '50%',
        flexShrink: 0,
        display: 'grid',
        placeItems: 'center',
        bgcolor: nodeColors.bg,
        border: `2px solid ${nodeColors.border}`,
        boxShadow: nodeColors.glow,
        zIndex: 1,
      }}
    >
      {uiStatus === 'completed' ? (
        <CheckIcon sx={{ color: '#050816', fontSize: 26 }} />
      ) : uiStatus === 'locked' ? (
        <LockIcon sx={{ color: 'text.disabled', fontSize: 22 }} />
      ) : (
        <Typography variant="caption" sx={{ fontWeight: 800, color: '#fff' }}>
          {index + 1}
        </Typography>
      )}
    </Box>
  )

  const wrapped = unlocked ? (
    <Box component={RouterLink} to={`/student/roadmap/blocks/${block.id}`} sx={{ textDecoration: 'none' }}>
      {content}
    </Box>
  ) : (
    <Tooltip title={ru.roadmap.lockedHint}>{content}</Tooltip>
  )

  if (side === 'full') {
    return (
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
        {spineNode}
        <Box sx={{ flex: 1, minWidth: 0 }}>{wrapped}</Box>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { lg: '1fr 48px 1fr' },
        alignItems: 'center',
        gap: { xs: 2, lg: 2 },
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gridColumn: side === 'left' ? 1 : 3 }}>
        {side === 'left' ? wrapped : null}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', gridColumn: { xs: 1, lg: 2 }, gridRow: 1 }}>
        {spineNode}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', gridColumn: side === 'right' ? 3 : 1 }}>
        {side === 'right' ? wrapped : null}
      </Box>
    </Box>
  )
}
