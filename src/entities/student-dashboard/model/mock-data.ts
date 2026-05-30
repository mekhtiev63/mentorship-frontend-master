import type { StudentDashboardData } from '@/entities/student-dashboard/model/types'
import { ru } from '@/shared/i18n/ru'

const t = ru.mock

export const mockStudentDashboard: StudentDashboardData = {
  progressPercent: 42,
  currentBlock: {
    id: 'block-3',
    title: t.currentBlockTitle,
    status: 'in_progress',
    materialsTotal: 12,
    materialsDone: 7,
  },
  achievementsCount: 8,
  achievementsTotal: 24,
  bonusBalance: 1250,
  upcomingEvents: [
    {
      id: 'ev-1',
      title: t.events.mockInterview,
      startsAt: '2026-05-30T14:00:00Z',
      type: 'interview',
    },
    {
      id: 'ev-2',
      title: t.events.oneOnOne,
      startsAt: '2026-06-02T10:00:00Z',
      type: 'one_on_one',
    },
    {
      id: 'ev-3',
      title: t.events.roadmapReview,
      startsAt: '2026-06-05T16:30:00Z',
      type: 'calendar',
    },
  ],
  recentActivity: [
    {
      id: 'a-1',
      verb: 'viewed',
      objectLabel: t.activity.channels,
      occurredAt: '2026-05-29T09:15:00Z',
    },
    {
      id: 'a-2',
      verb: 'submitted',
      objectLabel: t.activity.httpBlock,
      occurredAt: '2026-05-28T18:40:00Z',
    },
    {
      id: 'a-3',
      verb: 'granted',
      objectLabel: t.activity.achievement,
      occurredAt: '2026-05-27T11:00:00Z',
    },
    {
      id: 'a-4',
      verb: 'credited',
      objectLabel: t.activity.bonus,
      occurredAt: '2026-05-26T08:20:00Z',
    },
  ],
  recentAchievements: [
    {
      id: 'ach-1',
      code: 'first_block',
      title: ru.achievements.byCode.first_block.title,
      grantedAt: '2026-05-27T11:00:00Z',
    },
    {
      id: 'ach-2',
      code: 'material_marathon',
      title: ru.achievements.byCode.material_marathon.title,
      grantedAt: '2026-05-20T15:30:00Z',
    },
    {
      id: 'ach-3',
      code: 'early_bird',
      title: ru.achievements.byCode.early_bird.title,
      grantedAt: '2026-05-12T07:00:00Z',
    },
  ],
}
