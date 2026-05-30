import type { AppRole } from '@/shared/lib/roles'

export type UserDto = {
  id: string
  email: string
  status: string
  roles: string[]
  active_role: AppRole | null
}

export type TokenDto = {
  access_token: string
  token_type: string
  expires_in: number
  refresh_token?: string
  requires_role_selection?: boolean
}

export type LoginResponse = {
  tokens: TokenDto
  user: UserDto
}

export type MeResponse = {
  user: UserDto
}

export type ActiveRoleResponse = LoginResponse
