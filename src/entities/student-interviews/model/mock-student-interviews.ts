import { addDays } from '@/shared/lib/datetime'
import { MOCK_BUDDY } from '@/entities/profile-overview/model/constants'
import { mapStudentInterview } from '@/entities/student-interviews/model/map-student-interview'
import type { InterviewApiDto, PreparationVM, StudentInterviewVM } from '@/entities/student-interviews/model/types'
import { ru } from '@/shared/i18n/ru'

/** Отдельный файл mock-данных для модуля «Собеседования». */
export function buildMockInterviewDtos(): InterviewApiDto[] {
  const now = new Date()
  return [
    {
      id: 'int-mock-1',
      kind: 'mock',
      student_id: 'student-1',
      interviewer_id: MOCK_BUDDY.id,
      status: 'scheduled',
      outcome: 'pending',
      scheduled_at: addDays(now, 4).toISOString(),
      student_notes: 'Фокус на goroutines и каналы',
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    },
    {
      id: 'int-mock-2',
      kind: 'mock',
      student_id: 'student-1',
      interviewer_id: MOCK_BUDDY.id,
      status: 'scheduled',
      outcome: 'pending',
      scheduled_at: addDays(now, 11).toISOString(),
      student_notes: 'System Design: сервис уведомлений',
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    },
    {
      id: 'int-real-1',
      kind: 'real',
      student_id: 'student-1',
      status: 'scheduled',
      outcome: 'pending',
      scheduled_at: addDays(now, 18).toISOString(),
      company: 'TechCorp',
      position: 'Middle Go Developer',
      external_interviewer: 'Елена Смирнова',
      student_notes: 'Технический этап после HR',
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    },
    {
      id: 'int-mock-3',
      kind: 'mock',
      student_id: 'student-1',
      interviewer_id: MOCK_BUDDY.id,
      status: 'completed',
      outcome: 'pending',
      scheduled_at: addDays(now, -7).toISOString(),
      completed_at: addDays(now, -7).toISOString(),
      feedback: 'Хорошо объясняете trade-offs, но стоит углубить context cancellation.',
      created_at: addDays(now, -10).toISOString(),
      updated_at: addDays(now, -7).toISOString(),
    },
    {
      id: 'int-mock-4',
      kind: 'mock',
      student_id: 'student-1',
      interviewer_id: MOCK_BUDDY.id,
      status: 'completed',
      outcome: 'pending',
      scheduled_at: addDays(now, -21).toISOString(),
      completed_at: addDays(now, -21).toISOString(),
      feedback: 'Уверенный ответ по памяти и GC. Рекомендую больше практики с errgroup.',
      created_at: addDays(now, -25).toISOString(),
      updated_at: addDays(now, -21).toISOString(),
    },
    {
      id: 'int-real-2',
      kind: 'real',
      student_id: 'student-1',
      status: 'completed',
      outcome: 'reject',
      scheduled_at: addDays(now, -35).toISOString(),
      completed_at: addDays(now, -35).toISOString(),
      company: 'StartupHub',
      position: 'Go Backend Engineer',
      external_interviewer: 'Дмитрий К.',
      student_notes: 'Финальный технический раунд',
      feedback: 'Сильные знания HTTP, слабее system design.',
      created_at: addDays(now, -40).toISOString(),
      updated_at: addDays(now, -35).toISOString(),
    },
    {
      id: 'int-mock-5',
      kind: 'mock',
      student_id: 'student-1',
      interviewer_id: MOCK_BUDDY.id,
      status: 'cancelled',
      outcome: 'pending',
      scheduled_at: addDays(now, -3).toISOString(),
      student_notes: 'HR Interview — перенос',
      created_at: addDays(now, -5).toISOString(),
      updated_at: addDays(now, -3).toISOString(),
    },
  ]
}

const MOCK_ENRICHMENTS: Record<
  string,
  Parameters<typeof mapStudentInterview>[1]
> = {
  'int-mock-1': {
    format: 'go',
    title: 'Go Interview — пробное',
    scheduledAt: undefined,
    endsAt: undefined,
    calendarEventId: 'ev-mock-1',
    recommendations: [],
  },
  'int-mock-2': {
    format: 'system_design',
    title: 'System Design — пробное',
    recommendations: [],
  },
  'int-real-1': {
    format: 'technical',
  },
  'int-mock-3': {
    format: 'go',
    title: 'Go Interview — разбор',
    score: 7.5,
    recommendations: [
      'Повторить паттерны context.WithTimeout',
      'Разобрать 2 задачи на worker pool',
      'Записать шпаргалку по memory model',
    ],
  },
  'int-mock-4': {
    format: 'behavioral',
    title: 'Поведенческое — пробное',
    score: 8,
    recommendations: [
      'Подготовить STAR-истории про конфликт в команде',
      'Отработать ответ про дедлайны',
    ],
  },
  'int-real-2': {
    format: 'technical',
  },
  'int-mock-5': {
    format: 'hr',
    title: 'HR Interview — пробное',
    cancelReason: 'Наставник недоступен в выбранный слот',
  },
}

export function buildMockStudentInterviews(): StudentInterviewVM[] {
  return buildMockInterviewDtos().map((dto) => {
    const extra = MOCK_ENRICHMENTS[dto.id] ?? {}
    const scheduledAt = dto.scheduled_at ?? undefined
    const endsAt = scheduledAt
      ? new Date(new Date(scheduledAt).getTime() + 3600000).toISOString()
      : undefined
    return mapStudentInterview(dto, { ...extra, scheduledAt, endsAt })
  })
}

export function buildMockPreparation(): PreparationVM {
  return {
    readinessPercent: 62,
    levelLabel: ru.interviewsPage.preparation.levelMedium,
    checklist: [
      { id: '1', label: ru.interviewsPage.preparation.checklist.blocks, done: true },
      { id: '2', label: ru.interviewsPage.preparation.checklist.mockCount, done: true },
      { id: '3', label: ru.interviewsPage.preparation.checklist.goFeedback, done: true },
      { id: '4', label: ru.interviewsPage.preparation.checklist.systemDesign, done: false },
      { id: '5', label: ru.interviewsPage.preparation.checklist.behavioral, done: false },
    ],
  }
}

export function findMockInterviewById(id: string): StudentInterviewVM | null {
  return buildMockStudentInterviews().find((i) => i.id === id) ?? null
}
