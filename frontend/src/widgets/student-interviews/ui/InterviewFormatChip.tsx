import { Chip } from '@mui/material'
import type { InterviewFormat } from '@/entities/student-interviews'
import { formatAccentColor, formatLabel } from '@/entities/student-interviews'

type InterviewFormatChipProps = {
  format: InterviewFormat
  size?: 'small' | 'medium'
}

export function InterviewFormatChip({ format, size = 'small' }: InterviewFormatChipProps) {
  const color = formatAccentColor(format)
  return (
    <Chip
      label={formatLabel(format)}
      size={size}
      variant="outlined"
      sx={{ fontWeight: 600, borderColor: color, color, bgcolor: `${color}18` }}
    />
  )
}
