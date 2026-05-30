import { mapSyntheticEvent } from '@/entities/student-calendar/model/map-calendar-event'
import { deriveEventStatus } from '@/entities/student-calendar/model/derive-event-status'
import type { CalendarEventVM } from '@/entities/student-calendar/model/types'
import { addDays } from '@/shared/lib/datetime'

export function mergeSyntheticEvents(events: CalendarEventVM[]): CalendarEventVM[] {
  const hasDeadline = events.some((e) => e.uiType === 'block_deadline')
  if (hasDeadline) return events

  const now = new Date()
  const synthetic: CalendarEventVM[] = [
    mapSyntheticEvent({
      id: 'syn-deadline-1',
      title: 'Дедлайн: сдать блок «Конкурентность»',
      description: 'Завершите обязательные материалы и отправьте блок на проверку бадди.',
      startsAt: addDays(now, 5).toISOString(),
      endsAt: addDays(now, 5).toISOString(),
      uiType: 'block_deadline',
      status: deriveEventStatus(
        addDays(now, 5).toISOString(),
        addDays(now, 5).toISOString(),
        false,
      ),
      relatedType: 'other',
      relatedId: 'block-2',
    }),
    mapSyntheticEvent({
      id: 'syn-reminder-1',
      title: 'Напоминание: повторить goroutines',
      description: '15 минут на конспект по материалам недели.',
      startsAt: addDays(now, 2).toISOString(),
      endsAt: addDays(now, 2).toISOString(),
      uiType: 'reminder',
      status: deriveEventStatus(
        addDays(now, 2).toISOString(),
        addDays(now, 2).toISOString(),
        false,
      ),
      relatedType: 'other',
      relatedId: null,
    }),
  ]

  return [...events, ...synthetic]
}
