import type { CalendarEventApiDto, UiCalendarEventType } from '@/entities/student-calendar/model/types'

export function deriveUiEventTypeFromApi(dto: CalendarEventApiDto): UiCalendarEventType {
  if (dto.related_type === 'interview') return 'interview'
  if (dto.related_type === 'one_on_one') return 'one_on_one'

  const title = dto.title.toLowerCase()
  if (title.includes('[deadline]') || title.includes('дедлайн')) return 'block_deadline'
  if (title.includes('ревью') || title.includes('review')) return 'project_review'
  if (dto.related_id?.startsWith('block-')) return 'block_deadline'

  return 'reminder'
}

export function deriveUiEventTypeSynthetic(kind: UiCalendarEventType): UiCalendarEventType {
  return kind
}
