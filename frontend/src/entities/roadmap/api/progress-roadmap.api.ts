import type { BlockProgressDto } from '@/entities/roadmap/model/types'
import { apiClient } from '@/shared/api/client'
import type { ApiEnvelope } from '@/shared/api/types'

type BlockDetailProgressDto = {
  block: BlockProgressDto
  materials: {
    materialId: string
    title?: string
    required: boolean
    viewed: boolean
    firstViewedAt?: string | null
  }[]
}

export async function listMyBlockProgressApi(): Promise<BlockProgressDto[]> {
  const { data } = await apiClient.get<ApiEnvelope<{ items: BlockProgressDto[] }>>('/progress/blocks')
  return data.data.items ?? []
}

export async function getMyBlockProgressApi(blockId: string): Promise<BlockDetailProgressDto> {
  const { data } = await apiClient.get<ApiEnvelope<BlockDetailProgressDto>>(
    `/progress/blocks/${blockId}`,
  )
  return data.data
}
