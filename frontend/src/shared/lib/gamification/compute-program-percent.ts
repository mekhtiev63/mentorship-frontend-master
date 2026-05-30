import type { BlockProgressApi } from '@/entities/profile-overview/model/api-types'

export function computeProgramPercent(blocks: BlockProgressApi[]): number {
  if (blocks.length === 0) return 0
  const approved = blocks.filter((b) => b.status === 'approved').length
  return Math.round((approved / blocks.length) * 100)
}

export function sumMaterialsProgress(blocks: BlockProgressApi[]): { done: number; total: number } {
  if (blocks.length === 0) return { done: 0, total: 0 }
  return blocks.reduce(
    (acc, b) => ({
      done: acc.done + b.viewedMaterials,
      total: acc.total + b.requiredMaterials,
    }),
    { done: 0, total: 0 },
  )
}

export function countApprovedBlocks(blocks: BlockProgressApi[]): number {
  return blocks.filter((b) => b.status === 'approved').length
}
