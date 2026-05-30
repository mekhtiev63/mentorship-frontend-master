import type { ProgressApiStatus } from '@/entities/roadmap/model/types'

export function computeBlockPercent(
  progressStatus: ProgressApiStatus,
  viewed: number,
  required: number,
): number {
  if (progressStatus === 'approved') {
    return 100
  }
  if (required <= 0) {
    return 0
  }
  return Math.min(100, Math.round((viewed / required) * 100))
}

export function computeProgramPercent(completed: number, total: number): number {
  if (total <= 0) {
    return 0
  }
  return Math.round((completed / total) * 100)
}
