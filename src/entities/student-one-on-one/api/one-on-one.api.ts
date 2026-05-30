import { apiClient } from '@/shared/api/client'
import type { ApiEnvelope } from '@/shared/api/types'
import type { OneOnOneRequestApiDto } from '@/entities/student-one-on-one/model/types'

type ListPayload = { items: OneOnOneRequestApiDto[]; meta?: unknown }

export async function listOneOnOneRequestsApi(params?: {
  page?: number
  perPage?: number
}): Promise<OneOnOneRequestApiDto[]> {
  const { data } = await apiClient.get<ApiEnvelope<ListPayload>>('/one-on-one/requests', {
    params: { page: params?.page ?? 1, per_page: params?.perPage ?? 50 },
  })
  return data.data.items ?? []
}

export async function getOneOnOneRequestApi(requestId: string): Promise<OneOnOneRequestApiDto> {
  const { data } = await apiClient.get<ApiEnvelope<OneOnOneRequestApiDto>>(
    `/one-on-one/requests/${requestId}`,
  )
  return data.data
}

export type CreateOneOnOnePayload = {
  message: string
  preferred_slots?: unknown
}

export async function createOneOnOneRequestApi(
  payload: CreateOneOnOnePayload,
): Promise<OneOnOneRequestApiDto> {
  const { data } = await apiClient.post<ApiEnvelope<OneOnOneRequestApiDto>>(
    '/one-on-one/requests',
    {
      message: payload.message,
      preferred_slots: payload.preferred_slots ?? [],
    },
  )
  return data.data
}

export async function cancelOneOnOneRequestApi(requestId: string): Promise<void> {
  await apiClient.post(`/one-on-one/requests/${requestId}/cancel`)
}
