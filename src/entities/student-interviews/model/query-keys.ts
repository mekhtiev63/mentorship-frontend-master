import type {
  InterviewFilterFormat,
  InterviewFilterKind,
  InterviewFilterStatus,
} from '@/entities/student-interviews/model/types'

export const studentInterviewsKeys = {
  all: ['student-interviews'] as const,
  page: (status: InterviewFilterStatus, format: InterviewFilterFormat, kind: InterviewFilterKind, search: string) =>
    [...studentInterviewsKeys.all, 'page', status, format, kind, search] as const,
  realDetail: (id: string) => [...studentInterviewsKeys.all, 'real', id] as const,
  mockDetail: (id: string) => [...studentInterviewsKeys.all, 'mock', id] as const,
}
