import { Box, Typography } from '@mui/material'

type SimpleMarkdownProps = {
  source: string
}

export function SimpleMarkdown({ source }: SimpleMarkdownProps) {
  const blocks = source.split(/\n\n+/).filter(Boolean)

  return (
    <Box sx={{ '& p': { mb: 2, lineHeight: 1.7, color: 'text.primary' } }}>
      {blocks.map((block, i) => {
        const trimmed = block.trim()
        if (trimmed.startsWith('## ')) {
          return (
            <Typography key={i} variant="h6" sx={{ fontWeight: 700, mt: i ? 2 : 0, mb: 1 }}>
              {trimmed.replace(/^##\s*/, '')}
            </Typography>
          )
        }
        return (
          <Typography key={i} component="p">
            {trimmed}
          </Typography>
        )
      })}
    </Box>
  )
}
