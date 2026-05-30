import { apiClient } from '@/shared/api/client'
import type { ApiEnvelope } from '@/shared/api/types'

export type AchievementDefinitionApi = {
  code: string
  title: string
  description: string
}

export type UserAchievementApi = {
  code: string
  title: string
  description: string
  grantedAt: string
}

export async function listAchievementsCatalogApi(): Promise<AchievementDefinitionApi[]> {
  const { data } = await apiClient.get<ApiEnvelope<{ items: AchievementDefinitionApi[] }>>(
    '/achievements',
  )
  return data.data.items ?? []
}

export async function listMyAchievementsApi(): Promise<UserAchievementApi[]> {
  const { data } = await apiClient.get<ApiEnvelope<{ items: UserAchievementApi[] }>>(
    '/me/achievements',
  )
  return data.data.items ?? []
}
