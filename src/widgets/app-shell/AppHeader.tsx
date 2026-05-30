import MenuIcon from '@mui/icons-material/Menu'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  InputAdornment,
  ListItemIcon,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { LogoutMenuItem } from '@/features/auth-logout'
import { RoleSwitcher } from '@/features/auth-select-role'
import { useSessionStore } from '@/entities/session'
import { useRole } from '@/app/providers/RoleProvider'
import { ru } from '@/shared/i18n/ru'
import { ROLES } from '@/shared/lib/roles'
import { brandColors, glassSurface } from '@/shared/theme/palette'
import { NotificationBell } from '@/widgets/notification-bell/NotificationBell'

type AppHeaderProps = {
  showMenuButton?: boolean
  onMenuClick?: () => void
}

function initialsFromEmail(email: string): string {
  const local = email.split('@')[0] ?? ''
  const parts = local.split(/[._-]/).filter(Boolean)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return local.slice(0, 2).toUpperCase() || 'U'
}

const profileLabel = ru.nav.profile.replace(/^[^\s]+\s/u, '').trim()

export function AppHeader({ showMenuButton, onMenuClick }: AppHeaderProps) {
  const user = useSessionStore((s) => s.user)
  const { activeRole } = useRole()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const initials = useMemo(
    () => (user?.email ? initialsFromEmail(user.email) : 'U'),
    [user],
  )

  const displayName = user?.email?.split('@')[0] ?? ru.layout.userFallback
  const roleLabel = activeRole === ROLES.buddy ? ru.layout.roleBuddy : ru.layout.roleStudent
  const profilePath = activeRole === ROLES.buddy ? '/buddy/students' : '/student/profile'
  const settingsPath = activeRole === ROLES.buddy ? '/buddy/settings' : '/student/settings'
  const settingsLabel = ru.nav.settings.replace(/^[^\s]+\s/u, '').trim()

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar sx={{ gap: 1.5, minHeight: { xs: 56, sm: 64 } }}>
          {showMenuButton ? (
            <IconButton color="inherit" edge="start" onClick={onMenuClick} sx={{ mr: -0.5 }}>
              <MenuIcon />
            </IconButton>
          ) : null}

          <TextField
            size="small"
            placeholder={ru.layout.searchPlaceholder}
            sx={{
              flex: { xs: 1, sm: '0 1 420px' },
              minWidth: 0,
              display: { xs: showMenuButton ? 'none' : 'block', sm: 'block' },
              '& .MuiOutlinedInput-root': {
                ...glassSurface,
                borderRadius: 2,
                color: 'text.primary',
                '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                '&:hover fieldset': { borderColor: 'rgba(59,130,246,0.4)' },
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} color={brandColors.textSecondary} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.5, sm: 1 },
              ml: 'auto',
              flexShrink: 0,
            }}
          >
            <RoleSwitcher />
            <NotificationBell />

            <Box
              component="button"
              type="button"
              onClick={(e) => setAnchorEl(e.currentTarget)}
              aria-label={ru.layout.accountMenu}
              aria-haspopup="true"
              aria-expanded={Boolean(anchorEl)}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.25,
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 2,
                bgcolor: 'rgba(17, 24, 39, 0.65)',
                backdropFilter: 'blur(20px)',
                cursor: 'pointer',
                color: 'inherit',
                font: 'inherit',
                px: { xs: 0.75, md: 1.25 },
                py: 0.75,
                '&:hover': {
                  borderColor: 'rgba(59,130,246,0.35)',
                  boxShadow: brandColors.neonBlue,
                },
              }}
            >
              <Box sx={{ textAlign: 'right', display: { xs: 'none', md: 'block' } }}>
                <Typography variant="body2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                  {displayName}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.2 }}>
                  {roleLabel}
                </Typography>
              </Box>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  background: brandColors.heroGradient,
                  fontSize: '0.85rem',
                  fontWeight: 700,
                }}
              >
                {initials}
              </Avatar>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
              minWidth: 240,
              borderRadius: 2,
              border: '1px solid rgba(255,255,255,0.08)',
              bgcolor: brandColors.card,
              backgroundImage: 'none',
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {displayName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.email ?? '—'}
          </Typography>
          <Typography variant="caption" sx={{ mt: 0.5, display: 'block', color: 'primary.light' }}>
            {roleLabel}
          </Typography>
        </Box>
        <Divider />
        <MenuItem
          component={RouterLink}
          to={profilePath}
          onClick={() => setAnchorEl(null)}
          sx={{ py: 1.25 }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          {profileLabel}
        </MenuItem>
        <MenuItem
          component={RouterLink}
          to={settingsPath}
          onClick={() => setAnchorEl(null)}
          sx={{ py: 1.25 }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          {settingsLabel}
        </MenuItem>
        <LogoutMenuItem />
      </Menu>
    </>
  )
}
