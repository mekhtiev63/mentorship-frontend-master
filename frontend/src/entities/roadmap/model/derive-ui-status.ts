import type { ProgressApiStatus, RoadmapBlockVM, UiBlockStatus } from '@/entities/roadmap/model/types'

export function isBlockApproved(status: ProgressApiStatus): boolean {
  return status === 'approved'
}

export function deriveUiStatus(
  sortOrder: number,
  progressStatus: ProgressApiStatus,
  blocks: { sortOrder: number; progressStatus: ProgressApiStatus }[],
): UiBlockStatus {
  if (progressStatus === 'approved') {
    return 'completed'
  }

  const ordered = [...blocks].sort((a, b) => a.sortOrder - b.sortOrder)
  const index = ordered.findIndex((b) => b.sortOrder === sortOrder)
  if (index <= 0) {
    return 'in_progress'
  }

  const prev = ordered[index - 1]
  if (!isBlockApproved(prev.progressStatus)) {
    return 'locked'
  }

  return 'in_progress'
}

export function deriveUiStatusesForBlocks(
  items: { id: string; sortOrder: number; progressStatus: ProgressApiStatus }[],
): Map<string, UiBlockStatus> {
  const ordered = [...items].sort((a, b) => a.sortOrder - b.sortOrder)
  const progressList = ordered.map((b) => ({
    sortOrder: b.sortOrder,
    progressStatus: b.progressStatus,
  }))

  const map = new Map<string, UiBlockStatus>()
  for (const item of ordered) {
    map.set(
      item.id,
      deriveUiStatus(item.sortOrder, item.progressStatus, progressList),
    )
  }
  return map
}

export function findActiveBlockId(blocks: RoadmapBlockVM[]): string | undefined {
  return blocks.find((b) => b.uiStatus === 'in_progress')?.id
}
