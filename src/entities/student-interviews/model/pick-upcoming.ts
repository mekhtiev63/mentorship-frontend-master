import type { StudentInterviewVM } from '@/entities/student-interviews/model/types'

export function pickUpcomingInterviews(
  interviews: StudentInterviewVM[],
  limit = 3,
  now = new Date(),
): StudentInterviewVM[] {
  const t = now.getTime()
  return interviews
    .filter((i) => i.uiStatus === 'scheduled' && i.scheduledAt && new Date(i.scheduledAt).getTime() >= t)
    .sort((a, b) => (a.scheduledAt ?? '').localeCompare(b.scheduledAt ?? ''))
    .slice(0, limit)
}
