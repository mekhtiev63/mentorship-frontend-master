import type { UiMaterialStatus } from '@/entities/materials/model/types'

export function deriveMaterialStatus(
  viewed: boolean,
  progressPercent: number,
): UiMaterialStatus {
  if (!viewed && progressPercent <= 0) {
    return 'not_started'
  }
  if (viewed && progressPercent >= 100) {
    return 'completed'
  }
  if (viewed || progressPercent > 0) {
    return progressPercent >= 100 ? 'completed' : 'in_progress'
  }
  return 'not_started'
}
