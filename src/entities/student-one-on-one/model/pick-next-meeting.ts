import type { OneOnOneMeetingVM } from '@/entities/student-one-on-one/model/types'

export function pickNextMeeting(meetings: OneOnOneMeetingVM[], now = new Date()): OneOnOneMeetingVM | null {
  const t = now.getTime()
  const candidates = meetings
    .filter((m) => m.uiGroup === 'scheduled' && m.scheduledAt && new Date(m.scheduledAt).getTime() >= t)
    .sort((a, b) => (a.scheduledAt ?? '').localeCompare(b.scheduledAt ?? ''))
  return candidates[0] ?? null
}

export function splitMeetingsLists(meetings: OneOnOneMeetingVM[]) {
  const scheduled = meetings
    .filter((m) => m.uiGroup === 'scheduled')
    .sort((a, b) => (a.scheduledAt ?? '').localeCompare(b.scheduledAt ?? ''))
  const history = meetings
    .filter((m) => m.uiGroup === 'completed' || m.uiGroup === 'cancelled')
    .sort((a, b) => (b.scheduledAt ?? b.endsAt ?? '').localeCompare(a.scheduledAt ?? a.endsAt ?? ''))
  return { scheduled, history }
}
