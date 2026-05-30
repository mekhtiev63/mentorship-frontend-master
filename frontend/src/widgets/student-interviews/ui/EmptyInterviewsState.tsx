import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined'
import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { ru } from '@/shared/i18n/ru'
import { glassSurface } from '@/shared/theme/palette'

type EmptyInterviewsStateProps = {
  filtered?: boolean
}

export function EmptyInterviewsState({ filtered = false }: EmptyInterviewsStateProps) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{ ...glassSurface, borderRadius: 3, py: 6, px: 3, textAlign: 'center' }}
    >
      <ForumOutlinedIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {filtered ? ru.interviewsPage.emptyFiltered : ru.interviewsPage.empty}
      </Typography>
    </Box>
  )
}
