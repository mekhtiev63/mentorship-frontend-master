import { Box, Button, Typography } from '@mui/material'
import { ru } from '@/shared/i18n/ru'

type MaterialsEmptyStateProps = {
  filtered?: boolean
  onReset?: () => void
}

export function MaterialsEmptyState({ filtered, onReset }: MaterialsEmptyStateProps) {
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
        {filtered ? ru.materials.emptyFiltered : ru.materials.empty}
      </Typography>
      {filtered && onReset ? (
        <Button variant="outlined" onClick={onReset} sx={{ mt: 2 }}>
          {ru.materials.resetFilters}
        </Button>
      ) : null}
    </Box>
  )
}
