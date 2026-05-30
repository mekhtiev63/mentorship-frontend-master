import type { AchievementDefinition } from '@/widgets/achievements/model/achievements-catalog'
import type { ActivityChartPoint } from '@/entities/student-dashboard/model/chart-mock'
import type { AppRole } from '@/shared/lib/roles'

export type SkillChip = {
  id: string
  label: string
  status: 'mastered' | 'learning' | 'planned'
}

export type BuddyInfo = {
  id: string
  displayName: string
  email?: string
  avatarUrl?: string | null
  telegram?: string | null
} | null

export type ProfileOverview = {
  userId: string
  displayName: string
  email: string
  avatarUrl: string | null
  bio: string
  telegramUsername: string | null
  visibility: string
  activeRole: AppRole | null
  registeredAt: string | null
  buddy: BuddyInfo
  level: number
  levelTitle: string
  xp: number
  xpToNextLevel: number
  programPercent: number
  bonusBalance: number
  achievementsUnlocked: number
  achievementsTotal: number
  materialsDone: number
  materialsTotal: number
  skills: SkillChip[]
  recentAchievements: AchievementDefinition[]
  activityChart: ActivityChartPoint[]
}
