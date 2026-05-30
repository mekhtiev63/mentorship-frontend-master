import { MOCK_BUDDY } from '@/entities/profile-overview/model/constants'
import type { OneOnOneRequestApiDto, OneOnOneMeetingVM, BuddyEnrichment } from '@/entities/student-one-on-one/model/types'
import {
  apiStatusToUiGroup,
  statusLabelForApi,
} from '@/entities/student-one-on-one/model/map-meeting-status'
import { ru } from '@/shared/i18n/ru'

const MOCK_BUDDY_2: BuddyEnrichment = {
  id: 'mock-buddy-2',
  displayName: 'Мария Петрова',
  avatarUrl: null,
}

const BUDDY_BY_ID = new Map<string, BuddyEnrichment>([
  [MOCK_BUDDY.id, { id: MOCK_BUDDY.id, displayName: MOCK_BUDDY.displayName, avatarUrl: MOCK_BUDDY.avatarUrl }],
  [MOCK_BUDDY_2.id, MOCK_BUDDY_2],
])

export function resolveBuddy(buddyId: string, fallback?: BuddyEnrichment): BuddyEnrichment {
  return (
    BUDDY_BY_ID.get(buddyId) ??
    fallback ?? {
      id: buddyId,
      displayName: ru.oneOnOnePage.unknownBuddy,
      avatarUrl: null,
    }
  )
}

function buildComment(dto: OneOnOneRequestApiDto): string {
  let text = dto.message?.trim() || '—'
  if (dto.status === 'cancelled' && dto.reject_reason) {
    text = `${text}\n\n${ru.oneOnOnePage.rejectPrefix}: ${dto.reject_reason}`
  }
  return text
}

export type MapMeetingExtras = {
  scheduledAt?: string | null
  endsAt?: string | null
  callLink?: string | null
  buddy?: BuddyEnrichment
}

export function mapOneOnOneMeeting(dto: OneOnOneRequestApiDto, extras: MapMeetingExtras = {}): OneOnOneMeetingVM {
  const buddy = extras.buddy ?? resolveBuddy(dto.buddy_id)
  const uiGroup = apiStatusToUiGroup(dto.status)
  return {
    id: dto.id,
    buddyId: buddy.id,
    buddyName: buddy.displayName,
    buddyAvatarUrl: buddy.avatarUrl,
    scheduledAt: extras.scheduledAt ?? null,
    endsAt: extras.endsAt ?? null,
    apiStatus: dto.status,
    uiGroup,
    statusLabel: statusLabelForApi(dto.status),
    comment: buildComment(dto),
    callLink: extras.callLink ?? null,
    calendarEventId: dto.calendar_event_id ?? null,
    href: `/student/one-on-one/${dto.id}`,
    costPoints: dto.cost_points,
  }
}

export { MOCK_BUDDY_2 }
