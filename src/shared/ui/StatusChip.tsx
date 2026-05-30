import { Chip } from '@mui/material'

type StatusChipProps = {
  label: string
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'
}

export function StatusChip({ label, color = 'default' }: StatusChipProps) {
  return <Chip size="small" label={label} color={color} variant="outlined" />
}
