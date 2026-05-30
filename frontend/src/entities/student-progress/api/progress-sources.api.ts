import { apiClient } from '@/shared/api/client'
import type { ApiEnvelope } from '@/shared/api/types'
import type {
  ActivityEntryApi,
  BlockProgressApi,
  BonusBalanceApi,
  UserAchievementApi,
} from '@/entities/profile-overview/model/api-types'
import type { BonusTransactionApi } from '@/entities/student-progress/model/api-types'
import { fetchStudentRoadmapPage } from '@/entities/roadmap/model/fetch-student-roadmap-page'
import { listMyBlockProgressApi } from '@/entities/roadmap/api/progress-roadmap.api'

async function safe<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn()
  } catch {
    return null
  }
}

export async function fetchProgressBlocksSource(): Promise<BlockProgressApi[] | null> {
  return safe(async () => {
    const items = await listMyBlockProgressApi()
    return items.map((p) => ({
      blockId: p.blockId,
      title: p.title,
      status: p.status,
      requiredMaterials: p.requiredMaterials,
      viewedMaterials: p.viewedMaterials,
    }))
  })
}

export async function fetchActivitySource(): Promise<ActivityEntryApi[] | null> {
  return safe(async () => {
    const { data } = await apiClient.get<
      ApiEnvelope<{ items: ActivityEntryApi[]; meta?: unknown }>
    >('/activity/me', { params: { page: 1, per_page: 200 } })
    return data.data.items ?? []
  })
}

export async function fetchAchievementsSource(): Promise<UserAchievementApi[] | null> {
  return safe(async () => {
    const { data } = await apiClient.get<ApiEnvelope<{ items: UserAchievementApi[] }>>(
      '/me/achievements',
    )
    return data.data.items ?? []
  })
}

export async function fetchBonusSource(): Promise<BonusBalanceApi | null> {
  return safe(async () => {
    const { data } = await apiClient.get<ApiEnvelope<BonusBalanceApi>>('/me/bonus')
    return data.data
  })
}

export async function fetchBonusTransactionsSource(): Promise<BonusTransactionApi[] | null> {
  return safe(async () => {
    const { data } = await apiClient.get<
      ApiEnvelope<{ items: BonusTransactionApi[]; meta?: unknown }>
    >('/me/bonus/transactions', { params: { page: 1, per_page: 100 } })
    return data.data.items ?? []
  })
}

export async function fetchRoadmapSource() {
  return safe(() => fetchStudentRoadmapPage())
}
