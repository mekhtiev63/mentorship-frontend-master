import type {
  InterviewFilterFormat,
  InterviewFilterKind,
  InterviewFilterStatus,
  StudentInterviewVM,
} from '@/entities/student-interviews/model/types'

export function filterInterviewsByStatus(
  interviews: StudentInterviewVM[],
  status: InterviewFilterStatus,
): StudentInterviewVM[] {
  if (status === 'all') return interviews
  return interviews.filter((i) => i.uiStatus === status)
}

export function filterInterviewsByFormat(
  interviews: StudentInterviewVM[],
  format: InterviewFilterFormat,
): StudentInterviewVM[] {
  if (format === 'all') return interviews
  return interviews.filter((i) => i.format === format)
}

export function filterInterviewsByKind(
  interviews: StudentInterviewVM[],
  kind: InterviewFilterKind,
): StudentInterviewVM[] {
  if (kind === 'all') return interviews
  return interviews.filter((i) => i.kind === kind)
}

export function filterInterviewsBySearch(
  interviews: StudentInterviewVM[],
  query: string,
): StudentInterviewVM[] {
  const q = query.trim().toLowerCase()
  if (!q) return interviews
  return interviews.filter(
    (i) =>
      i.title.toLowerCase().includes(q) ||
      i.interviewerName.toLowerCase().includes(q) ||
      (i.company?.toLowerCase().includes(q) ?? false) ||
      (i.position?.toLowerCase().includes(q) ?? false),
  )
}

export function applyInterviewFilters(
  interviews: StudentInterviewVM[],
  status: InterviewFilterStatus,
  format: InterviewFilterFormat,
  kind: InterviewFilterKind,
  search: string,
): StudentInterviewVM[] {
  let list = filterInterviewsByStatus(interviews, status)
  list = filterInterviewsByFormat(list, format)
  list = filterInterviewsByKind(list, kind)
  list = filterInterviewsBySearch(list, search)
  return list
}
