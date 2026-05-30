import type { OneOnOneFilterGroup, OneOnOneMeetingVM } from '@/entities/student-one-on-one/model/types'

export function filterMeetingsByGroup(
  meetings: OneOnOneMeetingVM[],
  group: OneOnOneFilterGroup,
): OneOnOneMeetingVM[] {
  if (group === 'all') return meetings
  return meetings.filter((m) => m.uiGroup === group)
}

export function filterMeetingsByBuddySearch(
  meetings: OneOnOneMeetingVM[],
  query: string,
): OneOnOneMeetingVM[] {
  const q = query.trim().toLowerCase()
  if (!q) return meetings
  return meetings.filter((m) => m.buddyName.toLowerCase().includes(q))
}

export function applyMeetingFilters(
  meetings: OneOnOneMeetingVM[],
  group: OneOnOneFilterGroup,
  search: string,
): OneOnOneMeetingVM[] {
  return filterMeetingsByBuddySearch(filterMeetingsByGroup(meetings, group), search)
}
