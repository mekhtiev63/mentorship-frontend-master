import { getStudentRoadmapApi } from '@/entities/roadmap/api/roadmap.api'
import { listMyBlockProgressApi } from '@/entities/roadmap/api/progress-roadmap.api'
import { mergeRoadmapWithProgress } from '@/entities/roadmap/model/merge-roadmap-progress'
import { buildMockStudentRoadmapPage } from '@/entities/roadmap/model/mock-roadmap'
import type { StudentRoadmapPageData } from '@/entities/roadmap/model/types'
import { meApi } from '@/entities/session/api/session.api'

export async function fetchStudentRoadmapPage(): Promise<StudentRoadmapPageData> {
  const me = await meApi().catch(() => null)
  if (!me) {
    return buildMockStudentRoadmapPage()
  }

  const [roadmapBlocks, progressItems] = await Promise.all([
    getStudentRoadmapApi(),
    listMyBlockProgressApi().catch(() => null),
  ])

  return mergeRoadmapWithProgress(roadmapBlocks, progressItems)
}
