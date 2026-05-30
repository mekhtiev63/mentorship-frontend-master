import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Button, Stack } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { ru } from '@/shared/i18n/ru'

type MaterialDetailPagerProps = {
  blockId: string
  prevId: string | null
  nextId: string | null
  onMarkComplete: () => void
  completeDisabled?: boolean
  isComplete?: boolean
}

export function MaterialDetailPager({
  blockId,
  prevId,
  nextId,
  onMarkComplete,
  completeDisabled,
  isComplete,
}: MaterialDetailPagerProps) {
  const listPath = `/student/roadmap/blocks/${blockId}/materials`
  const materialPath = (id: string) => `/student/roadmap/blocks/${blockId}/materials/${id}`

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={1.5}
      sx={{ flexWrap: 'wrap', justifyContent: 'space-between', alignItems: { sm: 'center' } }}
    >
      <Button component={RouterLink} to={listPath} startIcon={<ArrowBackIcon />} variant="outlined">
        {ru.materialDetail.backToMaterials}
      </Button>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
        <Button
          component={RouterLink}
          to={prevId ? materialPath(prevId) : listPath}
          startIcon={<ChevronLeftIcon />}
          disabled={!prevId}
          variant="outlined"
        >
          {ru.materialDetail.prevMaterial}
        </Button>
        <Button
          component={RouterLink}
          to={nextId ? materialPath(nextId) : listPath}
          endIcon={<ChevronRightIcon />}
          disabled={!nextId}
          variant="outlined"
        >
          {ru.materialDetail.nextMaterial}
        </Button>
        <Button
          variant="contained"
          startIcon={<CheckCircleIcon />}
          onClick={onMarkComplete}
          disabled={completeDisabled || isComplete}
        >
          {ru.materialDetail.markComplete}
        </Button>
      </Stack>
    </Stack>
  )
}
