import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
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
import type { MaterialDetailVM } from '@/entities/materials'
import { useRecordMaterialView } from '@/entities/materials'
import { CountUp } from '@/shared/ui/CountUp'
import { ru } from '@/shared/i18n/ru'
import { glassSurface } from '@/shared/theme/palette'
import { MaterialTypeIcon } from '@/widgets/materials-list/ui/MaterialTypeIcon'

type MaterialDetailViewProps = {
  material: MaterialDetailVM
}

export function MaterialDetailView({ material }: MaterialDetailViewProps) {
  const recordView = useRecordMaterialView()
  const listPath = `/student/roadmap/blocks/${material.blockId}/materials`

  const handleOpen = () => {
    window.open(material.url, '_blank', 'noopener,noreferrer')
    if (material.uiStatus === 'not_started') {
      recordView.mutate(material.id)
    }
  }

  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Button component={RouterLink} to={listPath} startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        {ru.materials.backToList}
      </Button>

      <Breadcrumbs sx={{ mb: 2, color: 'text.secondary' }}>
        <Typography component={RouterLink} to="/student/roadmap" variant="body2" sx={{ color: 'inherit' }}>
          {ru.materials.breadcrumbRoadmap}
        </Typography>
        <Typography component={RouterLink} to={`/student/roadmap/blocks/${material.blockId}`} variant="body2" sx={{ color: 'inherit' }}>
          {material.blockTitle}
        </Typography>
        <Typography component={RouterLink} to={listPath} variant="body2" sx={{ color: 'inherit' }}>
          {ru.materials.breadcrumbMaterials}
        </Typography>
        <Typography variant="body2">{material.title}</Typography>
      </Breadcrumbs>

      <Box sx={{ ...glassSurface, p: 3, borderRadius: 3, mb: 3 }}>
        <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: 'flex-start' }}>
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
            <MaterialTypeIcon uiType={material.uiType} fontSize="large" />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
              {material.title}
            </Typography>
            <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
              <Chip label={ru.materials.type[material.uiType]} size="small" />
              <Chip
                label={
                  material.uiStatus === 'completed'
                    ? ru.materials.status.completed
                    : material.uiStatus === 'in_progress'
                      ? ru.materials.status.inProgress
                      : ru.materials.status.notStarted
                }
                size="small"
                color={material.uiStatus === 'completed' ? 'success' : material.uiStatus === 'in_progress' ? 'primary' : 'default'}
              />
              {material.durationMinutes ? (
                <Chip
                  size="small"
                  variant="outlined"
                  label={`${material.durationMinutes} ${ru.materials.durationMinutes}`}
                />
              ) : null}
            </Stack>
          </Box>
        </Stack>
        <LinearProgress variant="determinate" value={material.progressPercent} sx={{ height: 10, borderRadius: 5, mb: 1 }} />
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
          {ru.materials.progressLabel}: <CountUp end={material.progressPercent} duration={1} suffix="%" />
        </Typography>
        <Typography color="text.secondary">{material.description}</Typography>
      </Box>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
        <Button
          variant="contained"
          endIcon={<OpenInNewIcon />}
          onClick={handleOpen}
          disabled={recordView.isPending}
        >
          {ru.materials.openMaterial}
        </Button>
        {material.uiStatus !== 'completed' ? (
          <Button variant="outlined" onClick={() => recordView.mutate(material.id)} disabled={recordView.isPending}>
            {ru.materials.markViewed}
          </Button>
        ) : null}
      </Stack>
    </Box>
  )
}
