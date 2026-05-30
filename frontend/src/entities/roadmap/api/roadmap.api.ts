import type { RoadmapBlockWithMaterials } from '@/entities/roadmap/model/merge-roadmap-progress'
import type { RoadmapBlockDto, RoadmapMaterialDto } from '@/entities/roadmap/model/types'
import { apiClient } from '@/shared/api/client'
import type { ApiEnvelope } from '@/shared/api/types'

type StudentRoadmapDto = {
  blocks: RoadmapBlockWithMaterials[]
}

type BlockDetailDto = {
  block: RoadmapBlockDto
  materials: RoadmapMaterialDto[]
}

export async function getStudentRoadmapApi(): Promise<RoadmapBlockWithMaterials[]> {
  const { data } = await apiClient.get<ApiEnvelope<StudentRoadmapDto>>('/student/roadmap')
  return data.data.blocks ?? []
}

export async function getStudentRoadmapBlockApi(blockId: string): Promise<BlockDetailDto> {
  const { data } = await apiClient.get<ApiEnvelope<BlockDetailDto>>(
    `/student/roadmap/blocks/${blockId}`,
  )
  return data.data
}
