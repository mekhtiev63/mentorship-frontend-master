import { apiClient } from '@/shared/api/client'
import type { ApiEnvelope } from '@/shared/api/types'
import type { ProfileDto, UpdateProfilePayload } from '@/entities/profile/model/types'

type ProfileEnvelope = {
  profile: ProfileDto
}

export async function getMyProfileApi(): Promise<ProfileDto> {
  const { data } = await apiClient.get<ApiEnvelope<ProfileEnvelope>>('/me/profile')
  return data.data.profile
}

export async function patchMyProfileApi(payload: UpdateProfilePayload): Promise<ProfileDto> {
  const { data } = await apiClient.patch<ApiEnvelope<ProfileEnvelope>>('/me/profile', payload)
  return data.data.profile
}

export async function getUserProfileApi(userId: string): Promise<ProfileDto> {
  const { data } = await apiClient.get<ApiEnvelope<ProfileEnvelope>>(`/users/${userId}/profile`)
  return data.data.profile
}
