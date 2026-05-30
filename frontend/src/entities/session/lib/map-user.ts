import type { UserDto } from '@/entities/session/model/types'
import { isFrontendRole } from '@/shared/lib/roles'

export type UserDtoRaw = {
  id: string
  email: string
  status: string
  roles: string[]
  active_role: string | null
}

export function mapUser(raw: UserDtoRaw): UserDto {
  const active =
    raw.active_role && isFrontendRole(raw.active_role) ? raw.active_role : null
  return {
    id: raw.id,
    email: raw.email,
    status: raw.status,
    roles: raw.roles,
    active_role: active,
  }
}
