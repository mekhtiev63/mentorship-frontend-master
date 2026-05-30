import LogoutIcon from '@mui/icons-material/Logout'
import { ListItemIcon, MenuItem } from '@mui/material'
import { useLogoutMutation } from '@/features/auth-logout/model/useLogoutMutation'
import { ru } from '@/shared/i18n/ru'

export function LogoutMenuItem() {
  const logout = useLogoutMutation()

  return (
    <MenuItem onClick={() => logout.mutate()} disabled={logout.isPending}>
      <ListItemIcon>
        <LogoutIcon fontSize="small" />
      </ListItemIcon>
      {logout.isPending ? ru.auth.signingOut : ru.auth.signOut}
    </MenuItem>
  )
}
