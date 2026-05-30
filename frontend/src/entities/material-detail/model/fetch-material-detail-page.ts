import { buildMockMaterialContent } from '@/entities/material-detail/model/mock-material-content'
import type { MaterialDetailPageVM, MaterialProgressDto } from '@/entities/material-detail/model/types'
import { deriveStatus } from '@/entities/material-detail/model/compute-progress'
import { fetchBlockMaterials } from '@/entities/materials/model/fetch-block-materials'

function buildNeighbors(items: { id: string; sortOrder: number }[], materialId: string) {
  const sorted = [...items].sort((a, b) => a.sortOrder - b.sortOrder)
  const idx = sorted.findIndex((m) => m.id === materialId)
  return {
    prevId: idx > 0 ? sorted[idx - 1].id : null,
    nextId: idx >= 0 && idx < sorted.length - 1 ? sorted[idx + 1].id : null,
  }
}

export async function fetchMaterialDetailPage(
  blockId: string,
  materialId: string,
): Promise<MaterialDetailPageVM> {
  const listPage = await fetchBlockMaterials(blockId)
  const item = listPage.items.find((m) => m.id === materialId)
  if (!item) {
    throw new Error('not_found')
  }

  const uiType = item.uiType
  // TODO(backend): material body API — until then render from mock template; optional external url in meta.url
  const content = buildMockMaterialContent(uiType, item.title, item.url)

  const progress: MaterialProgressDto = {
    materialId: item.id,
    status: item.uiStatus,
    progressPercent: item.progressPercent,
    lastOpenedAt: item.lastOpenedAt,
  }

  if (progress.status === 'not_started' && progress.progressPercent === 0) {
    progress.status = deriveStatus(progress.progressPercent)
  }

  return {
    meta: {
      id: item.id,
      blockId: item.blockId,
      sortOrder: item.sortOrder,
      title: item.title,
      url: item.url,
      required: item.required,
    },
    uiType,
    blockTitle: listPage.blockTitle,
    progress,
    content,
    neighbors: buildNeighbors(listPage.items, materialId),
  }
}
