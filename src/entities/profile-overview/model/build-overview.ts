import type { ActivityChartPoint } from '@/entities/student-dashboard/model/chart-mock'
import { mockActivityChart } from '@/entities/student-dashboard/model/chart-mock'
import type { ProfileDto } from '@/entities/profile'
import type { UserDto } from '@/entities/session/model/types'
import {
  MOCK_BUDDY,
  STATIC_SKILL_LABELS,
} from '@/entities/profile-overview/model/constants'
import { mapApiAchievements } from '@/entities/profile-overview/model/map-achievements'
import type {
  ActivityEntryApi,
  BlockProgressApi,
  BonusBalanceApi,
  UserAchievementApi,
} from '@/entities/profile-overview/model/api-types'
import type { BuddyInfo, ProfileOverview, SkillChip } from '@/entities/profile-overview/model/types'
import { ru } from '@/shared/i18n/ru'
import { ROLES } from '@/shared/lib/roles'
import type { AppRole } from '@/shared/lib/roles'
import {
  computeProgramPercent,
  computeXp,
  levelFromXp,
} from '@/shared/lib/gamification'

export type BuildOverviewInput = {
  profile: ProfileDto
  user: UserDto
  bonus: BonusBalanceApi | null
  achievements: UserAchievementApi[]
  progressBlocks: BlockProgressApi[]
  activityItems: ActivityEntryApi[]
  buddy: BuddyInfo | null
  useMockBuddy: boolean
}

function computeMaterials(blocks: BlockProgressApi[]): { done: number; total: number } {
  const active =
    blocks.find((b) => b.status === 'in_progress') ??
    blocks.find((b) => b.status !== 'approved' && b.status !== 'locked') ??
    blocks[0]
  if (!active) return { done: 0, total: 0 }
  return { done: active.viewedMaterials, total: active.requiredMaterials }
}

function buildSkills(programPercent: number, blocks: BlockProgressApi[]): SkillChip[] {
  const approvedCount = blocks.filter((b) => b.status === 'approved').length
  return STATIC_SKILL_LABELS.map((skill, index) => {
    let status: SkillChip['status'] = 'planned'
    if (index < approvedCount) status = 'mastered'
    else if (index === approvedCount || programPercent > index * 15) status = 'learning'
    return { id: skill.id, label: skill.label, status }
  })
}

function buildActivityChart(items: ActivityEntryApi[]): ActivityChartPoint[] {
  if (items.length === 0) return mockActivityChart

  const dayLabels = Object.values(ru.charts.days)
  const buckets = new Map<string, number>()
  for (const label of dayLabels) {
    buckets.set(label, 0)
  }

  for (const entry of items) {
    const d = new Date(entry.occurred_at)
    const dayIndex = d.getDay()
    const mapIndex = dayIndex === 0 ? 6 : dayIndex - 1
    const label = dayLabels[mapIndex] ?? dayLabels[0]
    buckets.set(label, (buckets.get(label) ?? 0) + 12)
  }

  return dayLabels.map((day) => ({
    day,
    minutes: buckets.get(day) ?? 0,
    sessions: Math.max(1, Math.floor((buckets.get(day) ?? 0) / 20)),
  }))
}

export function buildProfileOverview(input: BuildOverviewInput): ProfileOverview {
  const { profile, user, bonus, achievements, progressBlocks, activityItems, useMockBuddy } =
    input

  const programPercent = computeProgramPercent(progressBlocks)
  const materials = computeMaterials(progressBlocks)
  const mappedAchievements = mapApiAchievements(achievements)
  const unlockedCount = mappedAchievements.length
  const bonusBalance = bonus?.balance ?? 0
  const approvedBlocks = progressBlocks.filter((b) => b.status === 'approved').length
  const xp = computeXp(programPercent, unlockedCount, bonusBalance, approvedBlocks)
  const { level, title, xpToNextLevel } = levelFromXp(xp)

  const displayName =
    profile.display_name?.trim() ||
    user.email.split('@')[0]?.charAt(0).toUpperCase() + (user.email.split('@')[0]?.slice(1) ?? '')

  const activeRole: AppRole | null =
    user.active_role === ROLES.buddy || user.active_role === ROLES.student
      ? user.active_role
      : null

  const buddy: BuddyInfo = useMockBuddy ? MOCK_BUDDY : (input.buddy ?? null)

  const achievementsTotal = Math.max(unlockedCount, 8)

  return {
    userId: user.id,
    displayName,
    email: user.email,
    avatarUrl: profile.avatar_url,
    bio: profile.bio ?? '',
    telegramUsername: profile.telegram_username,
    visibility: profile.visibility,
    activeRole,
    registeredAt: null,
    buddy,
    level,
    levelTitle: title,
    xp,
    xpToNextLevel,
    programPercent,
    bonusBalance,
    achievementsUnlocked: unlockedCount,
    achievementsTotal,
    materialsDone: materials.done,
    materialsTotal: materials.total,
    skills: buildSkills(programPercent, progressBlocks),
    recentAchievements: mappedAchievements.slice(0, 4),
    activityChart: buildActivityChart(activityItems),
  }
}
