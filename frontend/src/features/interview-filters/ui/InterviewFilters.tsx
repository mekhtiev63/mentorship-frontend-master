import { Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import type {
  InterviewFilterFormat,
  InterviewFilterKind,
  InterviewFilterStatus,
  InterviewFormat,
  InterviewUiStatus,
} from '@/entities/student-interviews'
import { ru } from '@/shared/i18n/ru'

type InterviewFiltersProps = {
  status: InterviewFilterStatus
  format: InterviewFilterFormat
  kind: InterviewFilterKind
  search: string
  onStatusChange: (s: InterviewFilterStatus) => void
  onFormatChange: (f: InterviewFilterFormat) => void
  onKindChange: (k: InterviewFilterKind) => void
  onSearchChange: (q: string) => void
}

const statuses: InterviewFilterStatus[] = [
  'all',
  'scheduled',
  'completed',
  'cancelled',
  'awaiting_score',
]

const formats: InterviewFilterFormat[] = [
  'all',
  'technical',
  'behavioral',
  'go',
  'system_design',
  'hr',
]

const kinds: InterviewFilterKind[] = ['all', 'mock', 'real']

function statusLabel(s: InterviewFilterStatus) {
  if (s === 'all') return ru.interviewsPage.filter.statusAll
  return ru.interviewsPage.uiStatus[s as InterviewUiStatus]
}

function formatLabel(f: InterviewFilterFormat) {
  if (f === 'all') return ru.interviewsPage.filter.formatAll
  return ru.interviewsPage.format[f as InterviewFormat]
}

function kindLabel(k: InterviewFilterKind) {
  if (k === 'all') return ru.interviewsPage.filter.kindAll
  return ru.interviewsPage.kind[k]
}

export function InterviewFilters({
  status,
  format,
  kind,
  search,
  onStatusChange,
  onFormatChange,
  onKindChange,
  onSearchChange,
}: InterviewFiltersProps) {
  return (
    <Stack spacing={2}>
      <Typography variant="overline" color="text.secondary">
        {ru.interviewsPage.fields.status}
      </Typography>
      <ToggleButtonGroup
        exclusive
        value={status}
        onChange={(_, v) => v && onStatusChange(v as InterviewFilterStatus)}
        size="small"
        sx={{ flexWrap: 'wrap' }}
      >
        {statuses.map((s) => (
          <ToggleButton key={s} value={s} sx={{ textTransform: 'none', fontWeight: 600 }}>
            {statusLabel(s)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Typography variant="overline" color="text.secondary">
        {ru.interviewsPage.fields.type}
      </Typography>
      <ToggleButtonGroup
        exclusive
        value={format}
        onChange={(_, v) => v && onFormatChange(v as InterviewFilterFormat)}
        size="small"
        sx={{ flexWrap: 'wrap' }}
      >
        {formats.map((f) => (
          <ToggleButton key={f} value={f} sx={{ textTransform: 'none', fontWeight: 600 }}>
            {formatLabel(f)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <ToggleButtonGroup
        exclusive
        value={kind}
        onChange={(_, v) => v && onKindChange(v as InterviewFilterKind)}
        size="small"
        sx={{ flexWrap: 'wrap' }}
      >
        {kinds.map((k) => (
          <ToggleButton key={k} value={k} sx={{ textTransform: 'none', fontWeight: 600 }}>
            {kindLabel(k)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <TextField
        size="small"
        placeholder={ru.interviewsPage.searchPlaceholder}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        fullWidth
      />
    </Stack>
  )
}
