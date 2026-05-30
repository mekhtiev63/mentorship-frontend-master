import { fallbackSkillsForBlock } from '@/entities/roadmap/config/block-skills-fallback'
import { computeBlockPercent } from '@/entities/roadmap/model/derive-block-metrics'
import { deriveUiStatusesForBlocks } from '@/entities/roadmap/model/derive-ui-status'
import type {
  BlockProgressDto,
  ProgressApiStatus,
  RoadmapBlockDto,
  RoadmapBlockVM,
  RoadmapMaterialDto,
  RoadmapMaterialVM,
  RoadmapPageSummary,
  StudentRoadmapPageData,
} from '@/entities/roadmap/model/types'

export type RoadmapBlockWithMaterials = {
  block: RoadmapBlockDto
  materials: RoadmapMaterialDto[]
}

function countRequired(materials: RoadmapMaterialDto[]): number {
  const req = materials.filter((m) => m.required).length
  return req > 0 ? req : materials.length
}

function resolveSkills(block: RoadmapBlockDto): string[] {
  const fromApi = block.expectedSkills?.filter(Boolean) ?? []
  if (fromApi.length > 0) {
    return fromApi
  }
  return fallbackSkillsForBlock(block.sortOrder, block.id)
}

export function mergeRoadmapWithProgress(
  roadmapBlocks: RoadmapBlockWithMaterials[],
  progressItems: BlockProgressDto[] | null,
): StudentRoadmapPageData {
  const progressById = new Map(progressItems?.map((p) => [p.blockId, p]) ?? [])

  const draft = roadmapBlocks
    .map(({ block, materials }) => {
      const progress = progressById.get(block.id)
      const progressStatus = (progress?.status ?? 'not_started') as ProgressApiStatus
      const requiredCount = progress?.requiredMaterials ?? countRequired(materials)
      const completedCount = progress?.viewedMaterials ?? 0
      const totalMaterials = materials.length

      return {
        id: block.id,
        sortOrder: block.sortOrder,
        title: block.title,
        description: block.description,
        skills: resolveSkills(block),
        progressStatus,
        rejectReason: progress?.rejectReason ?? null,
        totalMaterials,
        requiredCount,
        completedCount,
        percent: computeBlockPercent(progressStatus, completedCount, requiredCount),
        materials: materials.map(
          (m): RoadmapMaterialVM => ({
            id: m.id,
            title: m.title,
            materialType: m.materialType,
            url: m.url,
            required: m.required,
            viewed: false,
          }),
        ),
      }
    })
    .sort((a, b) => a.sortOrder - b.sortOrder)

  const statusMap = deriveUiStatusesForBlocks(
    draft.map((d) => ({
      id: d.id,
      sortOrder: d.sortOrder,
      progressStatus: d.progressStatus,
    })),
  )

  const blocks: RoadmapBlockVM[] = draft.map((d) => ({
    ...d,
    uiStatus: statusMap.get(d.id) ?? 'locked',
  }))

  const completedBlocks = blocks.filter((b) => b.uiStatus === 'completed').length
  const summary: RoadmapPageSummary = {
    completedBlocks,
    totalBlocks: blocks.length,
    programPercent:
      blocks.length > 0 ? Math.round((completedBlocks / blocks.length) * 100) : 0,
    currentBlockTitle: blocks.find((b) => b.uiStatus === 'in_progress')?.title,
  }

  return {
    blocks,
    summary,
    progressPartialError: progressItems === null,
  }
}
