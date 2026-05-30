import { Box, List, ListItemButton, ListItemText, Typography } from '@mui/material'
import { Code2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import type { NavItem } from '@/widgets/app-shell/nav-config'
import { LevelCard } from '@/widgets/app-shell/ui/LevelCard'
import { StreakCard } from '@/widgets/app-shell/ui/StreakCard'
import { ru } from '@/shared/i18n/ru'
import { brandColors } from '@/shared/theme/palette'

type AppSidebarProps = {
  roleLabel: string
  navItems: NavItem[]
  showGamification?: boolean
  onNavigate?: () => void
}

export function AppSidebar({ roleLabel, navItems, showGamification, onNavigate }: AppSidebarProps) {
  const location = useLocation()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', pb: 1 }}>
      <Box sx={{ px: 2, pt: 2.5, pb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, mb: 0.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              display: 'grid',
              placeItems: 'center',
              background: brandColors.heroGradient,
              boxShadow: brandColors.neonBlue,
            }}
          >
            <Code2 size={22} color="#F8FAFC" />
          </Box>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, lineHeight: 1.2 }}>
              {ru.app.brand}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {roleLabel}
            </Typography>
          </Box>
        </Box>
      </Box>

      <List sx={{ flex: 1, px: 0.5, overflowY: 'auto' }}>
        {navItems.map((item) => {
          const selected =
            location.pathname === item.path ||
            (item.path !== '/student' &&
              item.path !== '/buddy/students' &&
              location.pathname.startsWith(item.path + '/'))

          const isStudentHome = item.path === '/student'
          const homeSelected = isStudentHome && location.pathname === '/student'

          const active = isStudentHome ? homeSelected : selected

          return (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              selected={active}
              onClick={onNavigate}
              sx={{
                borderRadius: 2,
                mx: 1,
                mb: 0.5,
                position: 'relative',
                overflow: 'hidden',
                '&.Mui-selected': {
                  background: 'linear-gradient(90deg, rgba(37,99,235,0.35), rgba(124,58,237,0.25))',
                  color: brandColors.textPrimary,
                  boxShadow: brandColors.neonBlue,
                  border: '1px solid rgba(59, 130, 246, 0.35)',
                  '&:hover': {
                    background: 'linear-gradient(90deg, rgba(37,99,235,0.42), rgba(124,58,237,0.32))',
                  },
                },
              }}
            >
              {active ? (
                <Box
                  component={motion.span}
                  layoutId="nav-active-glow"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: 2,
                    boxShadow: 'inset 0 0 24px rgba(59, 130, 246, 0.2)',
                    pointerEvents: 'none',
                  }}
                />
              ) : null}
              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    sx: {
                      fontWeight: active ? 700 : 500,
                      fontSize: '0.88rem',
                      position: 'relative',
                      zIndex: 1,
                    },
                  },
                }}
              />
            </ListItemButton>
          )
        })}
      </List>

      {showGamification ? (
        <Box sx={{ mt: 'auto' }}>
          <StreakCard />
          <LevelCard />
        </Box>
      ) : null}
    </Box>
  )
}
