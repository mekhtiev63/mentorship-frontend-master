import { fetchBlockMaterialProgress } from '@/entities/materials/api/material-progress.api'
import { buildMockBlockMaterialsPage } from '@/entities/materials/model/mock-materials'
import { mergeBlockMaterials } from '@/entities/materials/model/merge-block-materials'
import type { BlockMaterialsPageVM, MaterialApiDto } from '@/entities/materials/model/types'
import { getStudentRoadmapBlockApi } from '@/entities/roadmap/api/roadmap.api'
import { fetchStudentRoadmapBlock } from '@/entities/roadmap/model/fetch-student-roadmap-block'
import { meApi } from '@/entities/session/api/session.api'

export async function fetchBlockMaterials(blockId: string): Promise<BlockMaterialsPageVM> {
  const me = await meApi().catch(() => null)
  if (!me) {
    return buildMockBlockMaterialsPage(blockId)
  }

  const [blockDetail, roadmap, progressItems] = await Promise.all([
    fetchStudentRoadmapBlock(blockId),
    getStudentRoadmapBlockApi(blockId),
    fetchBlockMaterialProgress(blockId).catch(() => null),
  ])

  const viewedById = new Map(blockDetail.materials.map((m) => [m.id, m.viewed]))

  const materials: MaterialApiDto[] = roadmap.materials.map((m) => ({
    id: m.id,
    blockId: m.blockId,
    sortOrder: m.sortOrder,
    title: m.title,
    materialType: m.materialType,
    url: m.url,
    required: m.required,
    isActive: m.isActive,
  }))

  const progressMapped =
    progressItems ??
    materials.map((m) => ({
      materialId: m.id,
      required: m.required,
      viewed: viewedById.get(m.id) ?? false,
      progressPercent: viewedById.get(m.id) ? 100 : undefined,
    }))

  const enrichedProgress =
    progressItems?.map((p) => ({
      ...p,
      lastOpenedAt: p.lastOpenedAt ?? null,
    })) ?? progressMapped

  return mergeBlockMaterials(blockDetail.block, materials, enrichedProgress)
}

export async function fetchMaterialDetail(blockId: string, materialId: string) {
  const page = await fetchBlockMaterials(blockId)
  const item = page.items.find((m) => m.id === materialId)
  if (!item) {
    throw new Error('not_found')
  }
  return {
    ...item,
    blockTitle: page.blockTitle,
  }
}
