import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useState } from 'react'
import type { MaterialContentDto } from '@/entities/material-detail'
import { ru } from '@/shared/i18n/ru'
import { glassSurface } from '@/shared/theme/palette'
import { SimpleMarkdown } from '@/widgets/material-content/ui/SimpleMarkdown'

type PracticeContentPanelProps = {
  content: Extract<MaterialContentDto, { kind: 'practice' }>
  submitted: boolean
  onSubmit: (link: string) => void
}

export function PracticeContentPanel({ content, submitted, onSubmit }: PracticeContentPanelProps) {
  const [link, setLink] = useState('')

  return (
    <Box component={motion.div} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} sx={{ ...glassSurface, p: 3, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        {ru.materialDetail.practice.title}
      </Typography>
      <SimpleMarkdown source={content.taskMarkdown} />
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 3, mb: 1 }}>
        {ru.materialDetail.practice.criteria}
      </Typography>
      <Stack component="ul" spacing={0.5} sx={{ pl: 2, mb: 3 }}>
        {content.acceptanceCriteria.map((c) => (
          <Typography key={c} component="li" variant="body2">
            {c}
          </Typography>
        ))}
      </Stack>
      {submitted ? (
        <Alert severity="success">{ru.materialDetail.practice.submitted}</Alert>
      ) : (
        <Stack spacing={2}>
          <TextField
            label={ru.materialDetail.practice.submitLabel}
            placeholder={ru.materialDetail.practice.submitPlaceholder}
            value={link}
            onChange={(e) => setLink(e.target.value)}
            fullWidth
            size="small"
          />
          <Button variant="contained" disabled={!link.trim()} onClick={() => onSubmit(link.trim())}>
            {ru.materialDetail.practice.submit}
          </Button>
          <Typography variant="caption" color="text.secondary">
            {content.submitHint}
          </Typography>
        </Stack>
      )}
    </Box>
  )
}
