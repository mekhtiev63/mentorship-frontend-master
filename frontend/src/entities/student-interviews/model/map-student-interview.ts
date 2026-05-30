import { MOCK_BUDDY } from '@/entities/profile-overview/model/constants'
import { guessFormatFromText } from '@/entities/student-interviews/model/map-interview-format'
import { deriveUiStatus, uiStatusLabel } from '@/entities/student-interviews/model/map-interview-status'
import type {
  InterviewApiDto,
  InterviewKind,
  MockInterviewEnrichment,
  StudentInterviewVM,
} from '@/entities/student-interviews/model/types'
import { ru } from '@/shared/i18n/ru'

export type MapInterviewExtras = MockInterviewEnrichment & {
  cancelReason?: string | null
}

function buildTitle(dto: InterviewApiDto, extras: MapInterviewExtras): string {
  if (extras.title) return extras.title
  if (dto.kind === 'real') {
    const company = dto.company?.trim() || ru.interviewsPage.unknownCompany
    const position = dto.position?.trim() || ru.interviewsPage.unknownPosition
    return `${company} — ${position}`
  }
  return ru.interviewsPage.mockSessionTitle
}

function buildComment(dto: InterviewApiDto, extras: MapInterviewExtras): string {
  const fb = dto.feedback?.trim()
  if (fb) return fb
  const notes = dto.student_notes?.trim()
  if (notes) return notes
  if (extras.cancelReason) {
    return `${ru.interviewsPage.cancelPrefix}: ${extras.cancelReason}`
  }
  return '—'
}

function resolveInterviewer(dto: InterviewApiDto, extras: MapInterviewExtras) {
  if (dto.kind === 'mock') {
    return {
      name: extras.interviewerName ?? MOCK_BUDDY.displayName,
      avatarUrl: extras.interviewerAvatarUrl ?? MOCK_BUDDY.avatarUrl,
    }
  }
  const ext = dto.external_interviewer?.trim()
  return {
    name: ext || dto.company?.trim() || ru.interviewsPage.externalInterviewerFallback,
    avatarUrl: null as string | null,
  }
}

export function mapStudentInterview(dto: InterviewApiDto, extras: Partial<MapInterviewExtras> = {}): StudentInterviewVM {
  const kind = (dto.kind === 'real' ? 'real' : 'mock') as InterviewKind
  const scheduledAt = extras.scheduledAt ?? dto.scheduled_at ?? null
  const endsAt = extras.endsAt ?? (scheduledAt ? new Date(new Date(scheduledAt).getTime() + 3600000).toISOString() : null)
  const format =
    extras.format ??
    guessFormatFromText(`${dto.position ?? ''} ${dto.student_notes ?? ''} ${extras.title ?? ''}`)
  const score = extras.score !== undefined ? extras.score : null
  const uiStatus = deriveUiStatus(dto, { score, scheduledAt })
  const interviewer = resolveInterviewer(dto, extras as MapInterviewExtras)

  return {
    id: dto.id,
    kind,
    title: buildTitle(dto, extras as MapInterviewExtras),
    scheduledAt,
    endsAt,
    format,
    interviewerName: interviewer.name,
    interviewerAvatarUrl: interviewer.avatarUrl,
    apiStatus: dto.status,
    apiOutcome: dto.outcome,
    uiStatus,
    statusLabel: uiStatusLabel(uiStatus),
    score,
    scoreMax: 10,
    comment: buildComment(dto, extras as MapInterviewExtras),
    recommendations: extras.recommendations ?? [],
    calendarEventId: extras.calendarEventId ?? null,
    href: kind === 'real' ? `/student/interviews/real/${dto.id}` : `/student/interviews/mock/${dto.id}`,
    company: dto.company,
    position: dto.position,
  }
}
