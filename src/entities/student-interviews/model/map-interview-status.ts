import type { InterviewApiDto, InterviewUiStatus } from '@/entities/student-interviews/model/types'
import { ru } from '@/shared/i18n/ru'

export function uiStatusAccentColor(status: InterviewUiStatus): string {
  switch (status) {
    case 'completed':
      return '#22C55E'
    case 'cancelled':
      return '#94A3B8'
    case 'awaiting_score':
      return '#F59E0B'
    default:
      return '#60A5FA'
  }
}

export function deriveUiStatus(
  dto: InterviewApiDto,
  extras: { score?: number | null; scheduledAt?: string | null },
  now = new Date(),
): InterviewUiStatus {
  if (dto.status === 'cancelled') return 'cancelled'

  if (dto.status === 'completed') {
    const hasScore = extras.score != null && extras.score > 0
    const hasFeedback = Boolean(dto.feedback?.trim())
    if (dto.kind === 'real') {
      if (dto.outcome === 'pending' && !hasFeedback) return 'awaiting_score'
      return 'completed'
    }
    if (!hasScore && !hasFeedback) return 'awaiting_score'
    return 'completed'
  }

  if (dto.status === 'scheduled') return 'scheduled'

  if (dto.kind === 'real' && (dto.status === 'submitted' || dto.status === 'reviewed')) {
    const at = extras.scheduledAt ?? dto.scheduled_at
    if (at && new Date(at).getTime() >= now.getTime()) return 'scheduled'
    return 'scheduled'
  }

  const at = extras.scheduledAt ?? dto.scheduled_at
  if (at && dto.status !== 'cancelled') {
    const t = new Date(at).getTime()
    if (t >= now.getTime()) return 'scheduled'
    if (dto.kind === 'mock' && !dto.feedback) return 'awaiting_score'
  }

  return 'scheduled'
}

export function uiStatusLabel(status: InterviewUiStatus): string {
  return ru.interviewsPage.uiStatus[status]
}
