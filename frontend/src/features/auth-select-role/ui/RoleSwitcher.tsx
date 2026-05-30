import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  type SelectChangeEvent,
} from '@mui/material'
import { useRole } from '@/app/providers/RoleProvider'
import { useSetActiveRoleMutation } from '@/features/auth-select-role/model/useSetActiveRoleMutation'
import type { AppRole } from '@/shared/lib/roles'
import { ROLES } from '@/shared/lib/roles'
import { ru } from '@/shared/i18n/ru'

export function RoleSwitcher() {
  const { availableRoles, activeRole } = useRole()
  const setRole = useSetActiveRoleMutation()

  if (availableRoles.length < 2 || !activeRole) {
    return null
  }

  const handleChange = (e: SelectChangeEvent) => {
    const next = e.target.value as AppRole
    if (next !== activeRole) {
      setRole.mutate(next)
    }
  }

  return (
    <FormControl size="small" sx={{ minWidth: 120, mr: 1 }} variant="standard">
      <InputLabel id="role-switcher-label">{ru.auth.roleLabel}</InputLabel>
      <Select
        labelId="role-switcher-label"
        label={ru.auth.roleLabel}
        value={activeRole}
        onChange={handleChange}
        disabled={setRole.isPending}
        sx={{ color: 'inherit', '.MuiSvgIcon-root': { color: 'inherit' } }}
      >
        <MenuItem value={ROLES.student}>{ru.roles.student}</MenuItem>
        <MenuItem value={ROLES.buddy}>{ru.roles.buddy}</MenuItem>
      </Select>
    </FormControl>
  )
}
