import type { MaterialProgressApiDto } from '@/entities/materials/model/types'
import { getMyBlockProgressApi } from '@/entities/roadmap/api/progress-roadmap.api'
import { apiClient } from '@/shared/api/client'
import type { ApiEnvelope } from '@/shared/api/types'

export async function fetchBlockMaterialProgress(blockId: string): Promise<MaterialProgressApiDto[]> {
  const data = await getMyBlockProgressApi(blockId)
  return (data.materials ?? []).map((m) => ({
    materialId: m.materialId,
    title: m.title,
    required: m.required,
    viewed: m.viewed,
    lastOpenedAt: m.firstViewedAt ?? null,
  }))
}

export async function recordMaterialViewApi(materialId: string): Promise<void> {
  await apiClient.post<ApiEnvelope<unknown>>(`/progress/materials/${materialId}/view`, {})
}
