import { apiClient } from '@/shared/api/client'
import type { ApiEnvelope } from '@/shared/api/types'
import type { BonusBalanceApi } from '@/entities/profile-overview/model/api-types'
import type { BonusTransactionApi } from '@/entities/student-progress/model/api-types'

export async function getBonusBalanceApi(): Promise<BonusBalanceApi> {
  const { data } = await apiClient.get<ApiEnvelope<BonusBalanceApi>>('/me/bonus')
  return data.data
}

export async function listBonusTransactionsApi(params?: {
  page?: number
  perPage?: number
}): Promise<BonusTransactionApi[]> {
  const { data } = await apiClient.get<
    ApiEnvelope<{ items: BonusTransactionApi[]; meta?: unknown }>
  >('/me/bonus/transactions', {
    params: { page: params?.page ?? 1, per_page: params?.perPage ?? 50 },
  })
  return data.data.items ?? []
}
