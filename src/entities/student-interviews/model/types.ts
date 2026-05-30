export type InterviewKind = 'real' | 'mock'

export type InterviewFormat =
  | 'technical'
  | 'behavioral'
  | 'go'
  | 'system_design'
  | 'hr'

export type InterviewUiStatus = 'scheduled' | 'completed' | 'cancelled' | 'awaiting_score'

export type InterviewFilterStatus = 'all' | InterviewUiStatus
export type InterviewFilterFormat = 'all' | InterviewFormat
export type InterviewFilterKind = 'all' | InterviewKind

export type InterviewApiDto = {
  id: string
  kind: string
  student_id?: string
  interviewer_id?: string | null
  status: string
  outcome: string
  scheduled_at?: string | null
  company?: string
  position?: string
  student_notes?: string
  external_interviewer?: string | null
  feedback?: string | null
  catalog_published?: boolean
  completed_at?: string | null
  created_at: string
  updated_at: string
}

export type StudentInterviewVM = {
  id: string
  kind: InterviewKind
  title: string
  scheduledAt: string | null
  endsAt: string | null
  format: InterviewFormat
  interviewerName: string
  interviewerAvatarUrl: string | null
  apiStatus: string
  apiOutcome: string
  uiStatus: InterviewUiStatus
  statusLabel: string
  score: number | null
  scoreMax: number
  comment: string
  recommendations: string[]
  calendarEventId: string | null
  href: string
  company?: string
  position?: string
}

export type PreparationChecklistItem = {
  id: string
  label: string
  done: boolean
}

export type PreparationVM = {
  readinessPercent: number
  levelLabel: string
  checklist: PreparationChecklistItem[]
}

export type ResultsSummaryVM = {
  averageScore: number | null
  completedCount: number
  awaitingCount: number
  lastOutcomeLabel: string
}

export type RecommendationBlockVM = {
  sourceInterviewId: string
  buddyName: string
  date: string
  format: InterviewFormat
  items: string[]
  href: string
}

export type InterviewsPageVM = {
  allInterviews: StudentInterviewVM[]
  upcoming: StudentInterviewVM[]
  history: StudentInterviewVM[]
  filteredHistory: StudentInterviewVM[]
  resultsSummary: ResultsSummaryVM
  recommendations: RecommendationBlockVM[]
  preparation: PreparationVM
  dataSource: 'mock' | 'api' | 'mixed'
}

export type MockInterviewEnrichment = {
  format: InterviewFormat
  title?: string
  scheduledAt: string
  endsAt: string
  score?: number | null
  recommendations?: string[]
  calendarEventId?: string | null
  interviewerName?: string
  interviewerAvatarUrl?: string | null
}
