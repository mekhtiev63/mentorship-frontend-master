import type { AppRole } from '@/shared/lib/roles'
import { isFrontendRole } from '@/shared/lib/roles'
import type { UserDto } from '@/entities/session/model/types'

type SessionSlice = {
  accessToken: string | null
  user: UserDto | null
}

export function selectActiveRole(state: SessionSlice): AppRole | null {
  const role = state.user?.active_role
  return role && isFrontendRole(role) ? role : null
}

export function selectFrontendRoles(state: SessionSlice): AppRole[] {
  return (state.user?.roles ?? []).filter(isFrontendRole)
}

export function selectNeedsRoleSelection(state: SessionSlice): boolean {
  const available = selectFrontendRoles(state)
  return available.length > 0 && !selectActiveRole(state)
}
