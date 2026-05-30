import { Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import type { CalendarEventFilter } from '@/entities/student-calendar'
import { ru } from '@/shared/i18n/ru'

type CalendarEventsFilterBarProps = {
  filter: CalendarEventFilter
  search: string
  onFilterChange: (f: CalendarEventFilter) => void
  onSearchChange: (q: string) => void
}

const filters: CalendarEventFilter[] = ['all', 'interviews', 'meetings', 'deadlines']

export function CalendarEventsFilterBar({
  filter,
  search,
  onFilterChange,
  onSearchChange,
}: CalendarEventsFilterBarProps) {
  return (
    <Stack spacing={2}>
      <ToggleButtonGroup
        exclusive
        value={filter}
        onChange={(_, v) => v && onFilterChange(v as CalendarEventFilter)}
        size="small"
        sx={{ flexWrap: 'wrap' }}
      >
        {filters.map((f) => (
          <ToggleButton key={f} value={f} sx={{ textTransform: 'none', fontWeight: 600 }}>
            {ru.calendarPage.filter[f]}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <TextField
        size="small"
        placeholder={ru.calendarPage.searchPlaceholder}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        fullWidth
      />
    </Stack>
  )
}
