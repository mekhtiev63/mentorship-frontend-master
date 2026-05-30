import { addDays } from '@/shared/lib/datetime'
import type { OneOnOneMeetingVM } from '@/entities/student-one-on-one/model/types'
import { mapOneOnOneMeeting, MOCK_BUDDY_2 } from '@/entities/student-one-on-one/model/map-one-on-one-meeting'
import { MOCK_BUDDY } from '@/entities/profile-overview/model/constants'

/** Отдельный файл mock-данных для модуля 1-на-1 */
export function buildMockOneOnOneMeetings(): OneOnOneMeetingVM[] {
  const now = new Date()

  const raw = [
    {
      dto: {
        id: 'o1-req-1',
        student_id: 'student-1',
        buddy_id: MOCK_BUDDY.id,
        status: 'scheduled',
        message: 'Разбор домашнего задания по конкурентности и план на неделю.',
        preferred_slots: [],
        calendar_event_id: 'ev-mock-2',
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
        cost_points: 50,
      },
      scheduledAt: addDays(now, 3).toISOString(),
      endsAt: new Date(addDays(now, 3).getTime() + 3600000).toISOString(),
      callLink: 'https://meet.example.com/go-mentorship-o1-1',
    },
    {
      dto: {
        id: 'o1-req-2',
        student_id: 'student-1',
        buddy_id: MOCK_BUDDY.id,
        status: 'accepted',
        message: 'Ожидаем подтверждение слота — обсудим карьерный трек.',
        preferred_slots: [],
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
        cost_points: 50,
      },
      scheduledAt: addDays(now, 8).toISOString(),
      endsAt: new Date(addDays(now, 8).getTime() + 1800000).toISOString(),
      callLink: null,
    },
    {
      dto: {
        id: 'o1-req-3',
        student_id: 'student-1',
        buddy_id: MOCK_BUDDY_2.id,
        status: 'pending',
        message: 'Запрос на первую встречу после блока «Основы Go».',
        preferred_slots: [],
        created_at: now.toISOString(),
        updated_at: now.toISOString(),
        cost_points: 50,
      },
      scheduledAt: addDays(now, 12).toISOString(),
      endsAt: new Date(addDays(now, 12).getTime() + 3600000).toISOString(),
      callLink: null,
    },
    {
      dto: {
        id: 'o1-req-4',
        student_id: 'student-1',
        buddy_id: MOCK_BUDDY.id,
        status: 'completed',
        message: 'Итоги первого месяца: что получилось, что улучшить.',
        preferred_slots: [],
        created_at: addDays(now, -14).toISOString(),
        updated_at: addDays(now, -14).toISOString(),
        cost_points: 50,
      },
      scheduledAt: addDays(now, -14).toISOString(),
      endsAt: new Date(addDays(now, -14).getTime() + 3600000).toISOString(),
      callLink: null,
    },
    {
      dto: {
        id: 'o1-req-5',
        student_id: 'student-1',
        buddy_id: MOCK_BUDDY_2.id,
        status: 'completed',
        message: 'Ревью pet-проекта: структура репозитория и тесты.',
        preferred_slots: [],
        created_at: addDays(now, -30).toISOString(),
        updated_at: addDays(now, -30).toISOString(),
        cost_points: 50,
      },
      scheduledAt: addDays(now, -30).toISOString(),
      endsAt: new Date(addDays(now, -30).getTime() + 2700000).toISOString(),
      callLink: null,
    },
    {
      dto: {
        id: 'o1-req-6',
        student_id: 'student-1',
        buddy_id: MOCK_BUDDY.id,
        status: 'cancelled',
        message: 'Перенос не удался — попрошу новый слот позже.',
        preferred_slots: [],
        reject_reason: 'Наставник недоступен в выбранные даты',
        cancelled_at: addDays(now, -3).toISOString(),
        created_at: addDays(now, -5).toISOString(),
        updated_at: addDays(now, -3).toISOString(),
        cost_points: 50,
      },
      scheduledAt: addDays(now, -3).toISOString(),
      endsAt: new Date(addDays(now, -3).getTime() + 1800000).toISOString(),
      callLink: null,
    },
  ] as const

  return raw.map(({ dto, scheduledAt, endsAt, callLink }) =>
    mapOneOnOneMeeting(dto, { scheduledAt, endsAt, callLink: callLink ?? undefined }),
  )
}

export function findMockMeetingById(id: string): OneOnOneMeetingVM | null {
  return buildMockOneOnOneMeetings().find((m) => m.id === id) ?? null
}
