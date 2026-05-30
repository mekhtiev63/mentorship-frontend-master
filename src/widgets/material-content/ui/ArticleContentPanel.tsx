import CheckIcon from '@mui/icons-material/Check'
import { Box, Button, List, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import type { MaterialContentDto } from '@/entities/material-detail'
import { ru } from '@/shared/i18n/ru'
import { glassSurface } from '@/shared/theme/palette'
import { SimpleMarkdown } from '@/widgets/material-content/ui/SimpleMarkdown'

type ArticleContentPanelProps = {
  content: Extract<MaterialContentDto, { kind: 'article' }>
  viewedSections: Set<string>
  onToggleSection: (id: string) => void
}

export function ArticleContentPanel({
  content,
  viewedSections,
  onToggleSection,
}: ArticleContentPanelProps) {
  const sections = [...content.sections].sort((a, b) => a.sortOrder - b.sortOrder)

  return (
    <Stack spacing={3}>
      <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ ...glassSurface, p: 3, borderRadius: 3 }}>
        <Typography variant="overline" color="text.secondary">
          {ru.materialDetail.article.summary}
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          {content.summary}
        </Typography>
      </Box>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
        <Box sx={{ ...glassSurface, p: 2, borderRadius: 3, minWidth: 200, flexShrink: 0 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
            {ru.materialDetail.article.toc}
          </Typography>
          <List dense disablePadding>
            {sections.map((s) => (
              <ListItemButton key={s.id} component="a" href={`#section-${s.id}`} sx={{ borderRadius: 1 }}>
                <ListItemText primary={s.title} />
                {viewedSections.has(s.id) ? <CheckIcon fontSize="small" color="success" /> : null}
              </ListItemButton>
            ))}
          </List>
        </Box>

        <Stack spacing={2} sx={{ flex: 1 }}>
          {sections.map((s, i) => (
            <Box
              key={s.id}
              id={`section-${s.id}`}
              component={motion.div}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              sx={{ ...glassSurface, p: 3, borderRadius: 3 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                {s.title}
              </Typography>
              <SimpleMarkdown source={s.bodyMarkdown} />
              <Button
                size="small"
                variant={viewedSections.has(s.id) ? 'outlined' : 'contained'}
                onClick={() => onToggleSection(s.id)}
                sx={{ mt: 1 }}
              >
                {viewedSections.has(s.id)
                  ? ru.materialDetail.article.sectionUnread
                  : ru.materialDetail.article.sectionRead}
              </Button>
            </Box>
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}
