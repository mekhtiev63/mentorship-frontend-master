export {
  useInterviewsPage,
  useInterviewRealDetail,
  useInterviewMockDetail,
} from '@/entities/student-interviews/model/useStudentInterviews'
export type {
  StudentInterviewVM,
  InterviewsPageVM,
  InterviewUiStatus,
  InterviewFormat,
  InterviewFilterStatus,
  InterviewFilterFormat,
  InterviewFilterKind,
  PreparationVM,
  ResultsSummaryVM,
  RecommendationBlockVM,
} from '@/entities/student-interviews/model/types'
export { uiStatusAccentColor } from '@/entities/student-interviews/model/map-interview-status'
export { formatAccentColor, formatLabel } from '@/entities/student-interviews/model/map-interview-format'
export { findInterviewInMock } from '@/entities/student-interviews/model/fetch-interview-detail'
