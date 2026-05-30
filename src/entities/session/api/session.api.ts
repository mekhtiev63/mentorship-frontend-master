import { apiClient } from '@/shared/api/client'
import type { ApiEnvelope } from '@/shared/api/types'
import { mapUser, type UserDtoRaw } from '@/entities/session/lib/map-user'
import type {
  ActiveRoleResponse,
  LoginResponse,
  MeResponse,
} from '@/entities/session/model/types'

type LoginResponseRaw = {
  tokens: LoginResponse['tokens']
  user: UserDtoRaw
}

type MeResponseRaw = {
  user: UserDtoRaw
}

export async function loginApi(email: string, password: string): Promise<LoginResponse> {
  const { data } = await apiClient.post<ApiEnvelope<LoginResponseRaw>>('/auth/login', {
    email,
    password,
  })
  return {
    tokens: data.data.tokens,
    user: mapUser(data.data.user),
  }
}

export async function logoutApi(refreshToken: string): Promise<void> {
  await apiClient.post('/auth/logout', { refresh_token: refreshToken })
}

export async function meApi(): Promise<MeResponse> {
  const { data } = await apiClient.get<ApiEnvelope<MeResponseRaw>>('/auth/me')
  return { user: mapUser(data.data.user) }
}

export async function setActiveRoleApi(activeRole: string): Promise<ActiveRoleResponse> {
  const { data } = await apiClient.put<ApiEnvelope<LoginResponseRaw>>('/auth/active-role', {
    active_role: activeRole,
  })
  return {
    tokens: data.data.tokens,
    user: mapUser(data.data.user),
  }
}
