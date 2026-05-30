import { useQuery } from '@tanstack/react-query'
import {
  fetchInterviewMockDetail,
  fetchInterviewRealDetail,
} from '@/entities/student-interviews/model/fetch-interview-detail'
import { fetchInterviewsPage } from '@/entities/student-interviews/model/fetch-interviews-page'
import { studentInterviewsKeys } from '@/entities/student-interviews/model/query-keys'
import type {
  InterviewFilterFormat,
  InterviewFilterKind,
  InterviewFilterStatus,
} from '@/entities/student-interviews/model/types'
import { useSessionStore } from '@/entities/session'

export function useInterviewsPage(
  status: InterviewFilterStatus,
  format: InterviewFilterFormat,
  kind: InterviewFilterKind,
  search: string,
) {
  const userId = useSessionStore((s) => s.user?.id)
  return useQuery({
    queryKey: studentInterviewsKeys.page(status, format, kind, search),
    queryFn: () => fetchInterviewsPage(status, format, kind, search),
    enabled: Boolean(userId),
    staleTime: 60_000,
  })
}

export function useInterviewRealDetail(interviewId: string) {
  const userId = useSessionStore((s) => s.user?.id)
  return useQuery({
    queryKey: studentInterviewsKeys.realDetail(interviewId),
    queryFn: () => fetchInterviewRealDetail(interviewId),
    enabled: Boolean(userId) && Boolean(interviewId),
    staleTime: 60_000,
  })
}

export function useInterviewMockDetail(interviewId: string) {
  const userId = useSessionStore((s) => s.user?.id)
  return useQuery({
    queryKey: studentInterviewsKeys.mockDetail(interviewId),
    queryFn: () => fetchInterviewMockDetail(interviewId),
    enabled: Boolean(userId) && Boolean(interviewId),
    staleTime: 60_000,
  })
}
