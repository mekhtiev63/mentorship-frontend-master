import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import {
  Box,
  Button,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import type { StudentRoadmapBlockDetail } from '@/entities/roadmap'
import { CountUp } from '@/shared/ui/CountUp'
import { ru } from '@/shared/i18n/ru'
import { glassSurface } from '@/shared/theme/palette'

type RoadmapBlockDetailViewProps = {
  detail: StudentRoadmapBlockDetail
}

export function RoadmapBlockDetailView({ detail }: RoadmapBlockDetailViewProps) {
  const { block, materials } = detail

  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Button component={RouterLink} to="/student/roadmap" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        {ru.roadmap.backToMap}
      </Button>

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
          {ru.roadmap.progressLabel}: <CountUp end={block.percent} duration={1} suffix="%" />
        </Typography>
        <Stack direction="row" spacing={0.5} sx={{ mt: 2, flexWrap: 'wrap' }}>
          {block.skills.map((s) => (
            <Chip key={s} label={s} size="small" variant="outlined" />
          ))}
        </Stack>
      </Box>

      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        {ru.roadmap.materialsTimeline}
      </Typography>

      <Stack spacing={0} sx={{ position: 'relative', pl: 3 }}>
        <Box
          sx={{
            position: 'absolute',
            left: 11,
            top: 8,
            bottom: 8,
            width: 2,
            bgcolor: 'rgba(148, 163, 184, 0.3)',
            borderRadius: 1,
          }}
        />
        {materials.map((m, i) => (
          <Box
            key={m.id}
            component={motion.div}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            sx={{
              ...glassSurface,
              p: 2,
              mb: 2,
              borderRadius: 2,
              ml: 1,
              position: 'relative',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                left: -20,
                top: 20,
                color: m.viewed ? 'success.main' : 'text.disabled',
              }}
            >
              {m.viewed ? <CheckCircleIcon fontSize="small" /> : <RadioButtonUncheckedIcon fontSize="small" />}
            </Box>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' } }}
            >
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {m.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {m.viewed ? ru.roadmap.materialViewed : ru.roadmap.materialNotViewed}
                  {m.required ? ` · ${ru.roadmap.materialRequired}` : ''}
                </Typography>
              </Box>
              <Button
                href={m.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                size="small"
                endIcon={<OpenInNewIcon />}
                disabled={block.uiStatus === 'locked'}
              >
                {ru.roadmap.materialOpen}
              </Button>
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
