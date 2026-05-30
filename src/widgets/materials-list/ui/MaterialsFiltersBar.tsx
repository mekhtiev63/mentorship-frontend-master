import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SearchIcon from '@mui/icons-material/Search'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import type { MaterialsSortKey } from '@/features/materials'
import type { UiMaterialStatus, UiMaterialType } from '@/entities/materials'
import { ru } from '@/shared/i18n/ru'

type MaterialsFiltersBarProps = {
  query: string
  status: UiMaterialStatus | 'all'
  type: UiMaterialType | 'all'
  sort: MaterialsSortKey
  onQueryChange: (q: string) => void
  onStatusChange: (s: UiMaterialStatus | 'all') => void
  onTypeChange: (t: UiMaterialType | 'all') => void
  onSortChange: (s: MaterialsSortKey) => void
}

function StatusFilters({
  status,
  onStatusChange,
}: {
  status: UiMaterialStatus | 'all'
  onStatusChange: (s: UiMaterialStatus | 'all') => void
}) {
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={status}
      onChange={(_e, v: UiMaterialStatus | 'all' | null) => {
        if (v !== null) onStatusChange(v)
      }}
      sx={{ flexWrap: 'wrap' }}
    >
      <ToggleButton value="all">{ru.materials.filterAll}</ToggleButton>
      <ToggleButton value="not_started">{ru.materials.status.notStarted}</ToggleButton>
      <ToggleButton value="in_progress">{ru.materials.status.inProgress}</ToggleButton>
      <ToggleButton value="completed">{ru.materials.status.completed}</ToggleButton>
    </ToggleButtonGroup>
  )
}

function TypeFilters({
  type,
  onTypeChange,
}: {
  type: UiMaterialType | 'all'
  onTypeChange: (t: UiMaterialType | 'all') => void
}) {
  const types: (UiMaterialType | 'all')[] = ['all', 'article', 'video', 'practice', 'quiz']
  return (
    <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
      {types.map((t) => (
        <Chip
          key={t}
          label={t === 'all' ? ru.materials.filterAll : ru.materials.type[t]}
          size="small"
          color={type === t ? 'primary' : 'default'}
          variant={type === t ? 'filled' : 'outlined'}
          onClick={() => onTypeChange(t)}
        />
      ))}
    </Stack>
  )
}

export function MaterialsFiltersBar(props: MaterialsFiltersBarProps) {
  const theme = useTheme()
  const compact = useMediaQuery(theme.breakpoints.down('md'))

  const inner = (
    <Stack spacing={2}>
      <TextField
        size="small"
        fullWidth
        placeholder={ru.materials.searchPlaceholder}
        value={props.query}
        onChange={(e) => props.onQueryChange(e.target.value)}
        slotProps={{
          input: {
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />,
          },
        }}
      />
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
          {ru.materials.filterStatus}
        </Typography>
        <StatusFilters status={props.status} onStatusChange={props.onStatusChange} />
      </Box>
      <Box>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
          {ru.materials.filterType}
        </Typography>
        <TypeFilters type={props.type} onTypeChange={props.onTypeChange} />
      </Box>
      <FormControl size="small" fullWidth>
        <InputLabel id="materials-sort-label">{ru.materials.sortLabel}</InputLabel>
        <Select
          labelId="materials-sort-label"
          label={ru.materials.sortLabel}
          value={props.sort}
          onChange={(e) => props.onSortChange(e.target.value as MaterialsSortKey)}
        >
          <MenuItem value="order">{ru.materials.sort.order}</MenuItem>
          <MenuItem value="title">{ru.materials.sort.title}</MenuItem>
          <MenuItem value="status">{ru.materials.sort.status}</MenuItem>
          <MenuItem value="lastOpened">{ru.materials.sort.lastOpened}</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  )

  if (compact) {
    return (
      <Accordion
        disableGutters
        sx={{ ...{ bgcolor: 'transparent', boxShadow: 'none' }, mb: 2, '&:before': { display: 'none' } }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="subtitle2">{ru.materials.filterStatus} / {ru.materials.filterType}</Typography>
        </AccordionSummary>
        <AccordionDetails>{inner}</AccordionDetails>
      </Accordion>
    )
  }

  return <Box sx={{ mb: 3 }}>{inner}</Box>
}
