import { Box, Button, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import type { RecommendationBlockVM } from '@/entities/student-interviews'
import { formatLabel } from '@/entities/student-interviews'
import { formatRuDateTime } from '@/shared/lib/datetime'
import { ru } from '@/shared/i18n/ru'
import { glassSurface } from '@/shared/theme/palette'

type PostInterviewRecommendationsProps = {
  blocks: RecommendationBlockVM[]
}

export function PostInterviewRecommendations({ blocks }: PostInterviewRecommendationsProps) {
  if (blocks.length === 0) return null

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
        {ru.interviewsPage.sections.recommendations}
      </Typography>
      <Stack spacing={2}>
        {blocks.map((block, i) => (
          <Box
            key={block.sourceInterviewId}
            component={motion.div}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            sx={{ ...glassSurface, p: 2, borderRadius: 3 }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
              {formatLabel(block.format)} · {block.buddyName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {block.date ? formatRuDateTime(block.date) : ''}
            </Typography>
            <Box component="ul" sx={{ pl: 2.5, mt: 1, mb: 1.5 }}>
              {block.items.map((line: string) => (
                <Typography component="li" variant="body2" key={line}>
                  {line}
                </Typography>
              ))}
            </Box>
            <Button
              component={RouterLink}
              to={block.href}
              size="small"
              sx={{ textTransform: 'none', fontWeight: 600 }}
            >
              {ru.interviewsPage.actions.openFull}
            </Button>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
