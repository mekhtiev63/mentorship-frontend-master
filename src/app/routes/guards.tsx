import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/app/providers/AuthProvider'
import { useRole } from '@/app/providers/RoleProvider'
import { ROLES, type AppRole, roleHomePath } from '@/shared/lib/roles'
import { CircularProgress, Box } from '@mui/material'

export function ProtectedRoute() {
  const { isAuthenticated, isBootstrapping } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  if (isBootstrapping) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  return <Outlet />
}

export function GuestRoute() {
  const { isAuthenticated } = useAuth()
  const { activeRole, homePath, needsRoleSelection } = useRole()

  if (isAuthenticated) {
    if (needsRoleSelection) {
      return <Navigate to="/select-role" replace />
    }
    if (activeRole && homePath) {
      return <Navigate to={homePath} replace />
    }
  }

  return <Outlet />
}

type RoleRouteProps = {
  role: AppRole
}

export function RoleRoute({ role }: RoleRouteProps) {
  const { activeRole, needsRoleSelection } = useRole()
  const location = useLocation()

  if (needsRoleSelection) {
    return <Navigate to="/select-role" replace state={{ from: location.pathname }} />
  }

  if (activeRole !== role) {
    const redirect = activeRole ? roleHomePath(activeRole) : '/select-role'
    return <Navigate to={redirect} replace />
  }

  return <Outlet />
}

export function RootRedirect() {
  const { isAuthenticated } = useAuth()
  const { activeRole, needsRoleSelection, homePath } = useRole()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  if (needsRoleSelection) {
    return <Navigate to="/select-role" replace />
  }
  if (activeRole === ROLES.buddy) {
    return <Navigate to="/buddy/students" replace />
  }
  if (homePath) {
    return <Navigate to={homePath} replace />
  }
  return <Navigate to="/login" replace />
}
