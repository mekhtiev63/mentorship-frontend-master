import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import type { RoadmapBlockVM } from '@/entities/roadmap'
import { CountUp } from '@/shared/ui/CountUp'
import { ru } from '@/shared/i18n/ru'
import { glassSurface } from '@/shared/theme/palette'

type BlockOverviewViewProps = {
  block: RoadmapBlockVM
}

export function BlockOverviewView({ block }: BlockOverviewViewProps) {
  const locked = block.uiStatus === 'locked'
  const materialsPath = `/student/roadmap/blocks/${block.id}/materials`

  return (
    <Box component={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Button component={RouterLink} to="/student/roadmap" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        {ru.roadmap.backToMap}
      </Button>

      <Breadcrumbs sx={{ mb: 2, color: 'text.secondary' }}>
        <Typography component={RouterLink} to="/student/roadmap" variant="body2" sx={{ color: 'inherit' }}>
          {ru.materials.breadcrumbRoadmap}
        </Typography>
        <Typography variant="body2">{block.title}</Typography>
      </Breadcrumbs>

      <Box sx={{ ...glassSurface, p: 3, borderRadius: 3, mb: 3 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 2, justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            {block.title}
          </Typography>
          <Chip
            label={
              block.uiStatus === 'completed'
                ? ru.roadmap.stepCompleted
                : block.uiStatus === 'in_progress'
                  ? ru.roadmap.stepInProgress
                  : ru.roadmap.stepLocked
            }
            color={block.uiStatus === 'completed' ? 'success' : block.uiStatus === 'in_progress' ? 'primary' : 'default'}
          />
        </Stack>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {block.description}
        </Typography>
        <LinearProgress variant="determinate" value={block.percent} sx={{ height: 10, borderRadius: 5, mb: 1 }} />
        <Typography variant="caption" color="text.secondary">
          {ru.materials.progressLabel}: <CountUp end={block.percent} duration={1} suffix="%" />
        </Typography>
        <Stack direction="row" spacing={0.5} sx={{ mt: 2, flexWrap: 'wrap', gap: 0.5 }}>
          {block.skills.map((s) => (
            <Chip key={s} label={s} size="small" variant="outlined" />
          ))}
        </Stack>
      </Box>

      <Button
        component={RouterLink}
        to={materialsPath}
        variant="contained"
        size="large"
        disabled={locked}
        fullWidth
        sx={{ maxWidth: 360 }}
      >
        {ru.materials.goToMaterials}
      </Button>
      {locked ? (
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          {ru.materials.blockLockedHint}
        </Typography>
      ) : null}
    </Box>
  )
}
