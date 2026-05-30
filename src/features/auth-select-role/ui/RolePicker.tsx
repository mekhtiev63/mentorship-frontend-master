import { Alert, Button, Stack, Typography } from '@mui/material'
import { useRole } from '@/app/providers/RoleProvider'
import { roleErrorMessage } from '@/features/auth-select-role/model/errors'
import { useSetActiveRoleMutation } from '@/features/auth-select-role/model/useSetActiveRoleMutation'
import type { AppRole } from '@/shared/lib/roles'
import { ROLES } from '@/shared/lib/roles'
import { ru } from '@/shared/i18n/ru'

const roleLabel: Record<'student' | 'buddy', string> = {
  [ROLES.student]: ru.roles.student,
  [ROLES.buddy]: ru.roles.buddy,
}

export function RolePicker() {
  const { availableRoles } = useRole()
  const setRole = useSetActiveRoleMutation()

  const pick = (role: AppRole) => {
    setRole.mutate(role)
  }

  return (
    <Stack spacing={2}>
      <Typography variant="h6">{ru.auth.chooseRole}</Typography>
      <Typography variant="body2" color="text.secondary">
        {ru.auth.chooseRoleHint}
      </Typography>
      {availableRoles.map((role) => (
        <Button
          key={role}
          variant="outlined"
          size="large"
          disabled={setRole.isPending}
          onClick={() => pick(role)}
        >
          {setRole.isPending ? '…' : (roleLabel[role as keyof typeof roleLabel] ?? role)}
        </Button>
      ))}
      {setRole.isError ? (
        <Alert severity="error">{roleErrorMessage(setRole.error)}</Alert>
      ) : null}
    </Stack>
  )
}
