import { mockActivityChart } from '@/entities/student-dashboard/model/chart-mock'
import type { ProfileOverview } from '@/entities/profile-overview/model/types'
import { achievementsCatalog } from '@/widgets/achievements/model/achievements-catalog'
import { ru } from '@/shared/i18n/ru'
import { ROLES } from '@/shared/lib/roles'

export function buildMockProfileOverview(
  email: string,
  displayNameOverride?: string,
): ProfileOverview {
  const local = email.split('@')[0] ?? ru.common.studentFallback
  const displayName =
    displayNameOverride?.trim() || local.charAt(0).toUpperCase() + local.slice(1)

  const level = 3
  const xp = 1240
  const xpPerLevel = 500
  const xpToNextLevel = xpPerLevel - (xp % xpPerLevel)

  return {
    userId: '00000000-0000-0000-0000-000000000001',
    displayName,
    email,
    avatarUrl: null,
    bio: 'Изучаю Go и готовлюсь к собеседованиям. Люблю чистую архитектуру и практику на pet-проектах.',
    telegramUsername: 'student_dev',
    visibility: 'buddies',
    activeRole: ROLES.student,
    registeredAt: '2026-01-15T10:00:00Z',
    buddy: {
      id: 'buddy-1',
      displayName: 'Алексей Иванов',
      email: 'buddy@example.com',
      avatarUrl: null,
      telegram: 'alexbuddy',
    },
    level,
    levelTitle: ru.profile.levelTitles[Math.min(level - 1, ru.profile.levelTitles.length - 1)],
    xp,
    xpToNextLevel,
    programPercent: 42,
    bonusBalance: 1250,
    achievementsUnlocked: achievementsCatalog.filter((a) => a.unlocked).length,
    achievementsTotal: achievementsCatalog.length,
    materialsDone: 7,
    materialsTotal: 12,
    skills: [
      { id: 'go', label: 'Go', status: 'mastered' },
      { id: 'pg', label: 'PostgreSQL', status: 'learning' },
      { id: 'docker', label: 'Docker', status: 'learning' },
      { id: 'rest', label: 'REST API', status: 'mastered' },
      { id: 'conc', label: 'Concurrency', status: 'learning' },
    ],
    recentAchievements: achievementsCatalog.filter((a) => a.unlocked).slice(0, 4),
    activityChart: mockActivityChart,
  }
}
