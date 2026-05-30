import type { BlockProgressApi } from '@/entities/profile-overview/model/api-types'
import type { StudentRoadmapPageData } from '@/entities/roadmap/model/types'
import { mapApiAchievements } from '@/entities/profile-overview/model/map-achievements'
import { achievementsCatalog } from '@/widgets/achievements/model/achievements-catalog'
import type {
  ActivityEntryApi,
  BonusBalanceApi,
  UserAchievementApi,
} from '@/entities/profile-overview/model/api-types'
import type { BonusTransactionApi } from '@/entities/student-progress/model/api-types'
import { buildActivityByDay, sumLearningMinutes } from '@/entities/student-progress/model/build-charts'
import { buildBonusStats } from '@/entities/student-progress/model/build-bonus-stats'
import { buildMotivation } from '@/entities/student-progress/model/build-motivation'
import { buildNextAchievement } from '@/entities/student-progress/model/build-next-achievement'
import { computeStreakDays } from '@/entities/student-progress/model/build-streak'
import { buildWeeklyProgress } from '@/entities/student-progress/model/build-weekly'
import type {
  BlockCompletionPoint,
  ProgressPartialError,
  ProgressPeriod,
  RoadmapBlockProgressRowVM,
  StudentProgressPageVM,
} from '@/entities/student-progress/model/types'
import {
  computeProgramPercent,
  computeXp,
  countApprovedBlocks,
  levelFromXp,
  sumMaterialsProgress,
} from '@/shared/lib/gamification'

export type BuildProgressPageInput = {
  period: ProgressPeriod
  progressBlocks: BlockProgressApi[]
  activityItems: ActivityEntryApi[]
  achievements: UserAchievementApi[]
  bonus: BonusBalanceApi | null
  transactions: BonusTransactionApi[]
  roadmap: StudentRoadmapPageData | null
  partialErrors: ProgressPartialError[]
  dataSource: StudentProgressPageVM['dataSource']
}

function buildRoadmapRows(
  progressBlocks: BlockProgressApi[],
  roadmap: StudentRoadmapPageData | null,
): RoadmapBlockProgressRowVM[] {
  const order = roadmap?.blocks ?? []
  const byId = new Map(progressBlocks.map((b) => [b.blockId, b]))

  if (order.length > 0) {
    return order.map((block) => {
      const p = byId.get(block.id)
      const materialsTotal = p?.requiredMaterials ?? block.requiredCount
      const materialsDone = p?.viewedMaterials ?? block.completedCount
      const percent =
        materialsTotal > 0 ? Math.round((materialsDone / materialsTotal) * 100) : block.percent
      return {
        id: block.id,
        title: block.title,
        sortOrder: block.sortOrder,
        uiStatus: block.uiStatus,
        percent,
        materialsDone,
        materialsTotal,
        href: `/student/roadmap/blocks/${block.id}`,
      }
    })
  }

  return progressBlocks.map((b, i) => {
    const materialsTotal = b.requiredMaterials
    const materialsDone = b.viewedMaterials
    const percent =
      materialsTotal > 0 ? Math.round((materialsDone / materialsTotal) * 100) : 0
    return {
      id: b.blockId,
      title: b.title,
      sortOrder: i,
      uiStatus: b.status,
      percent,
      materialsDone,
      materialsTotal,
      href: `/student/roadmap/blocks/${b.blockId}`,
    }
  })
}

function buildBlockCompletion(rows: RoadmapBlockProgressRowVM[]): BlockCompletionPoint[] {
  return rows.map((r) => ({
    blockId: r.id,
    title: r.title,
    percent: r.percent,
  }))
}

export function buildStudentProgressPage(input: BuildProgressPageInput): StudentProgressPageVM {
  const {
    period,
    progressBlocks,
    activityItems,
    achievements,
    bonus,
    transactions,
    roadmap,
    partialErrors,
    dataSource,
  } = input

  const programPercent = computeProgramPercent(progressBlocks)
  const { done: materialsCompleted, total: materialsTotal } = sumMaterialsProgress(progressBlocks)
  const blocksCompleted = countApprovedBlocks(progressBlocks)
  const blocksTotal = progressBlocks.length

  const mappedAchievements = mapApiAchievements(achievements)
  const bonusBalance = bonus?.balance ?? 0
  const xp = computeXp(programPercent, mappedAchievements.length, bonusBalance, blocksCompleted)
  const { level, title, xpToNextLevel } = levelFromXp(xp)

  const activityByDay = buildActivityByDay(activityItems, period)
  const learningMinutes = sumLearningMinutes(activityByDay)
  const learningHoursDisplay = Math.round((learningMinutes / 60) * 10) / 10

  const streakDays = computeStreakDays(activityItems, dataSource === 'mock' ? 12 : 0)
  const progressByWeek = buildWeeklyProgress(activityItems, period)
  const roadmapBlocks = buildRoadmapRows(progressBlocks, roadmap)
  const blockCompletion = buildBlockCompletion(roadmapBlocks)

  const recentAchievements = [...mappedAchievements]
    .sort((a, b) => (b.unlockedAt ?? '').localeCompare(a.unlockedAt ?? ''))
    .slice(0, 4)

  const nextAchievement = buildNextAchievement(mappedAchievements, {
    materialsCompleted,
    streakDays,
    blocksCompleted,
    unlockedCodes: new Set(mappedAchievements.map((a) => a.code)),
  })

  return {
    period,
    dataSource,
    partialErrors,
    programPercent,
    blocksCompleted,
    blocksTotal,
    materialsCompleted,
    materialsTotal,
    learningMinutes,
    learningHoursDisplay,
    streakDays: streakDays || (dataSource === 'mock' ? 12 : 0),
    level,
    levelTitle: title,
    xp,
    xpToNextLevel,
    activityByDay,
    progressByWeek,
    blockCompletion,
    roadmapBlocks,
    recentAchievements:
      recentAchievements.length > 0
        ? recentAchievements
        : achievementsCatalog.filter((a) => a.unlocked).slice(0, 4),
    nextAchievement,
    bonus: buildBonusStats(bonusBalance, transactions, period),
    motivation: buildMotivation(progressBlocks, xpToNextLevel, title),
  }
}
