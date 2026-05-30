import { createContext, useContext, useMemo, type ReactNode } from 'react'
import { useSessionStore } from '@/entities/session'
import {
  ROLES,
  type AppRole,
  isFrontendRole,
  roleHomePath,
} from '@/shared/lib/roles'

type RoleContextValue = {
  activeRole: AppRole | null
  availableRoles: AppRole[]
  needsRoleSelection: boolean
  homePath: string | null
}

const RoleContext = createContext<RoleContextValue>({
  activeRole: null,
  availableRoles: [],
  needsRoleSelection: false,
  homePath: null,
})

export function RoleProvider({ children }: { children: ReactNode }) {
  const user = useSessionStore((s) => s.user)

  const value = useMemo((): RoleContextValue => {
    const availableRoles = (user?.roles ?? []).filter(isFrontendRole)
    const active = user?.active_role && isFrontendRole(user.active_role) ? user.active_role : null
    return {
      activeRole: active,
      availableRoles,
      needsRoleSelection: availableRoles.length > 0 && !active,
      homePath: active ? roleHomePath(active) : null,
    }
  }, [user])

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export function useRole(): RoleContextValue {
  return useContext(RoleContext)
}

export { ROLES }
