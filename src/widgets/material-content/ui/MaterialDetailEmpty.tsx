import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import { ru } from '@/shared/i18n/ru'
import { glassSurface } from '@/shared/theme/palette'

type MaterialDetailEmptyProps = {
  blockId: string
}

export function MaterialDetailEmpty({ blockId }: MaterialDetailEmptyProps) {
  const listPath = `/student/roadmap/blocks/${blockId}/materials`

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{ ...glassSurface, p: 4, borderRadius: 3, textAlign: 'center', maxWidth: 520, mx: 'auto' }}
    >
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
        {ru.materialDetail.emptyTitle}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {ru.materialDetail.emptyHint}
      </Typography>
      <Button component={RouterLink} to={listPath} startIcon={<ArrowBackIcon />} variant="contained">
        {ru.materialDetail.backToMaterials}
      </Button>
    </Box>
  )
}
