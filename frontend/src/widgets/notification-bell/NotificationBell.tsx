import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import { Badge, IconButton, Tooltip } from '@mui/material'
import { ru } from '@/shared/i18n/ru'

export function NotificationBell() {
  return (
    <Tooltip title={ru.notifications.tooltip}>
      <IconButton color="inherit" size="large">
        <Badge badgeContent={0} color="error">
          <NotificationsNoneIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  )
}
