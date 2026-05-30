import { getStudentRoadmapBlockApi } from '@/entities/roadmap/api/roadmap.api'
import { getMyBlockProgressApi } from '@/entities/roadmap/api/progress-roadmap.api'
import { mergeRoadmapWithProgress } from '@/entities/roadmap/model/merge-roadmap-progress'
import { buildMockBlockDetail, buildMockStudentRoadmapPage } from '@/entities/roadmap/model/mock-roadmap'
import type { StudentRoadmapBlockDetail } from '@/entities/roadmap/model/types'
import { meApi } from '@/entities/session/api/session.api'

export async function fetchStudentRoadmapBlock(blockId: string): Promise<StudentRoadmapBlockDetail> {
  const me = await meApi().catch(() => null)
  if (!me) {
    const mock = buildMockBlockDetail(blockId)
    if (mock) return { block: mock, materials: mock.materials }
    const page = buildMockStudentRoadmapPage()
    const first = page.blocks[0]
    return { block: first, materials: first.materials }
  }

  const [roadmap, progressDetail] = await Promise.all([
    getStudentRoadmapBlockApi(blockId),
    getMyBlockProgressApi(blockId).catch(() => null),
  ])

  const progressItems = progressDetail
    ? [
        {
          ...progressDetail.block,
          requiredMaterials: progressDetail.block.requiredMaterials,
          viewedMaterials: progressDetail.block.viewedMaterials,
        },
      ]
    : null

  const page = mergeRoadmapWithProgress(
    [{ block: roadmap.block, materials: roadmap.materials }],
    progressItems,
  )

  let block = page.blocks[0]
  if (progressDetail?.materials?.length) {
    const viewedById = new Map(progressDetail.materials.map((m) => [m.materialId, m.viewed]))
    const titleById = new Map(progressDetail.materials.map((m) => [m.materialId, m.title]))
    block = {
      ...block,
      materials: roadmap.materials.map((m) => ({
        id: m.id,
        title: titleById.get(m.id) || m.title,
        materialType: m.materialType,
        url: m.url,
        required: m.required,
        viewed: viewedById.get(m.id) ?? false,
      })),
    }
  }

  return { block, materials: block.materials }
}
