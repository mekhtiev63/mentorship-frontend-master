import type { MaterialContentDto, MaterialDetailStatus } from '@/entities/material-detail/model/types'

export function deriveStatus(percent: number): MaterialDetailStatus {
  if (percent >= 100) return 'completed'
  if (percent > 0) return 'in_progress'
  return 'not_started'
}

export function computeArticleProgress(viewedSectionIds: Set<string>, totalSections: number): number {
  if (totalSections <= 0) return 0
  return Math.min(100, Math.round((viewedSectionIds.size / totalSections) * 100))
}

export function computeVideoProgress(watchedSec: number, durationSec: number): number {
  if (durationSec <= 0) return 0
  return Math.min(100, Math.round((watchedSec / durationSec) * 100))
}

export function computeQuizProgress(answeredCount: number, total: number, submittedScore?: number): number {
  if (submittedScore !== undefined) return submittedScore
  if (total <= 0) return 0
  return Math.min(99, Math.round((answeredCount / total) * 50))
}

export function contentKind(content: MaterialContentDto): MaterialContentDto['kind'] {
  return content.kind
}
