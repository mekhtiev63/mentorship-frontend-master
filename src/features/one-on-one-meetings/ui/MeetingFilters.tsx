import { Stack, TextField, ToggleButton, ToggleButtonGroup } from '@mui/material'
import type { OneOnOneFilterGroup } from '@/entities/student-one-on-one'
import { ru } from '@/shared/i18n/ru'

type MeetingFiltersProps = {
  group: OneOnOneFilterGroup
  search: string
  onGroupChange: (g: OneOnOneFilterGroup) => void
  onSearchChange: (q: string) => void
}

const groups: OneOnOneFilterGroup[] = ['all', 'scheduled', 'completed', 'cancelled']

export function MeetingFilters({ group, search, onGroupChange, onSearchChange }: MeetingFiltersProps) {
  return (
    <Stack spacing={2}>
      <ToggleButtonGroup
        exclusive
        value={group}
        onChange={(_, v) => v && onGroupChange(v as OneOnOneFilterGroup)}
        size="small"
        sx={{ flexWrap: 'wrap' }}
      >
        {groups.map((g) => (
          <ToggleButton key={g} value={g} sx={{ textTransform: 'none', fontWeight: 600 }}>
            {ru.oneOnOnePage.filter[g]}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <TextField
        size="small"
        placeholder={ru.oneOnOnePage.searchPlaceholder}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        fullWidth
      />
    </Stack>
  )
}
