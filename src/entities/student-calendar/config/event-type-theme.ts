import type { UiCalendarEventType } from '@/entities/student-calendar/model/types'

export const eventTypeColors: Record<UiCalendarEventType, string> = {
  interview: '#60A5FA',
  one_on_one: '#A78BFA',
  block_deadline: '#F59E0B',
  project_review: '#22C55E',
  reminder: '#94A3B8',
}

export function colorForEventType(type: UiCalendarEventType): string {
  return eventTypeColors[type]
}
