import { deriveMaterialStatus } from '@/entities/materials/model/derive-material-status'
import {
  defaultDurationForType,
  mapApiTypeToUi,
} from '@/entities/materials/model/map-material-type'
import type {
  BlockMaterialsPageVM,
  MaterialApiDto,
  MaterialListItemVM,
  MaterialProgressApiDto,
} from '@/entities/materials/model/types'
import type { RoadmapBlockVM } from '@/entities/roadmap'
import { ru } from '@/shared/i18n/ru'

function buildDescription(title: string, apiDescription?: string): string {
  if (apiDescription?.trim()) {
    return apiDescription.trim()
  }
  return `${ru.materials.descriptionFallback} «${title}».`
}

export function mergeBlockMaterials(
  block: RoadmapBlockVM,
  materials: MaterialApiDto[],
  progressItems: MaterialProgressApiDto[] | null,
): BlockMaterialsPageVM {
  const progressById = new Map(progressItems?.map((p) => [p.materialId, p]) ?? [])

  const items: MaterialListItemVM[] = materials
    .filter((m) => m.isActive !== false)
    .map((m) => {
      const progress = progressById.get(m.id)
      const viewed = progress?.viewed ?? false
      const uiType = mapApiTypeToUi(m.materialType, m.sortOrder)
      const progressPercent =
        progress?.progressPercent ?? (viewed ? 100 : m.sortOrder % 5 === 0 ? 40 : 0)
      const uiStatus = deriveMaterialStatus(viewed, progressPercent)

      return {
        id: m.id,
        blockId: m.blockId,
        title: progress?.title || m.title,
        description: buildDescription(m.title, m.description),
        uiType,
        durationMinutes: m.durationMinutes ?? defaultDurationForType(uiType),
        uiStatus,
        progressPercent,
        lastOpenedAt: progress?.lastOpenedAt ?? (viewed ? null : null),
        required: m.required,
        url: m.url,
        sortOrder: m.sortOrder,
      }
    })
    .sort((a, b) => a.sortOrder - b.sortOrder)

  return {
    blockId: block.id,
    blockTitle: block.title,
    blockDescription: block.description,
    blockLocked: block.uiStatus === 'locked',
    blockPercent: block.percent,
    items,
    progressPartialError: progressItems === null,
  }
}
