import type { StudentInterviewVM } from '@/entities/student-interviews/model/types'

export function splitInterviewHistory(interviews: StudentInterviewVM[], now = new Date()): StudentInterviewVM[] {
  const t = now.getTime()
  return interviews
    .filter((i) => {
      if (i.uiStatus === 'completed' || i.uiStatus === 'cancelled' || i.uiStatus === 'awaiting_score') {
        return true
      }
      if (i.uiStatus === 'scheduled' && i.scheduledAt && new Date(i.scheduledAt).getTime() < t) {
        return true
      }
      return false
    })
    .sort((a, b) => (b.scheduledAt ?? '').localeCompare(a.scheduledAt ?? ''))
}
