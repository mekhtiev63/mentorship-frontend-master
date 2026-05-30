export type OneOnOneUiGroup = 'scheduled' | 'completed' | 'cancelled'

export type OneOnOneFilterGroup = 'all' | OneOnOneUiGroup

export type OneOnOneRequestApiDto = {
  id: string
  student_id: string
  buddy_id: string
  status: string
  message: string
  preferred_slots: unknown
  calendar_event_id?: string | null
  reject_reason?: string | null
  cancelled_at?: string | null
  approved_at?: string | null
  created_at: string
  updated_at: string
  cost_points: number
}

export type OneOnOneMeetingVM = {
  id: string
  buddyId: string
  buddyName: string
  buddyAvatarUrl: string | null
  scheduledAt: string | null
  endsAt: string | null
  apiStatus: string
  uiGroup: OneOnOneUiGroup
  statusLabel: string
  comment: string
  callLink: string | null
  calendarEventId: string | null
  href: string
  costPoints: number
}

export type OneOnOneListPageVM = {
  meetings: OneOnOneMeetingVM[]
  nextMeeting: OneOnOneMeetingVM | null
  history: OneOnOneMeetingVM[]
  scheduled: OneOnOneMeetingVM[]
  dataSource: 'mock' | 'api' | 'mixed'
}

export type BuddyEnrichment = {
  id: string
  displayName: string
  avatarUrl: string | null
}
