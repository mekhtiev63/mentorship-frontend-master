import CheckIcon from '@mui/icons-material/Check'
import LockIcon from '@mui/icons-material/Lock'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { Box, Chip, Stack, Typography } from '@mui/material'
import { ru } from '@/shared/i18n/ru'
import { brandColors } from '@/shared/theme/palette'

export function RoadmapLegend() {
  const items = [
    { label: ru.roadmap.legendCompleted, color: brandColors.success, icon: <CheckIcon sx={{ fontSize: 16 }} /> },
    { label: ru.roadmap.legendInProgress, color: brandColors.primary, icon: <PlayArrowIcon sx={{ fontSize: 16 }} /> },
    { label: ru.roadmap.legendLocked, color: brandColors.textSecondary, icon: <LockIcon sx={{ fontSize: 16 }} /> },
  ]

  return (
    <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap' }}>
      {items.map((item) => (
        <Chip
          key={item.label}
          size="small"
          icon={item.icon}
          label={item.label}
          sx={{
            borderColor: `${item.color}55`,
            color: 'text.secondary',
            '& .MuiChip-icon': { color: item.color },
          }}
          variant="outlined"
        />
      ))}
    </Stack>
  )
}

export function RoadmapSummaryChips({
  completed,
  total,
  programPercent,
  currentTitle,
}: {
  completed: number
  total: number
  programPercent: number
  currentTitle?: string
}) {
  return (
    <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
      <Chip
        label={`${ru.roadmap.summaryBlocks}: ${completed}/${total}`}
        size="small"
        color="primary"
        variant="outlined"
      />
      <Chip label={`${ru.roadmap.summaryProgram}: ${programPercent}%`} size="small" variant="outlined" />
      {currentTitle ? (
        <Chip label={`${ru.roadmap.summaryCurrent}: ${currentTitle}`} size="small" variant="outlined" />
      ) : null}
    </Stack>
  )
}

export function RoadmapEmptyState() {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: 8,
        px: 2,
        borderRadius: 3,
        border: '1px dashed rgba(255,255,255,0.12)',
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        {ru.roadmap.empty}
      </Typography>
      <Typography color="text.secondary">{ru.roadmap.emptyHint}</Typography>
    </Box>
  )
}
