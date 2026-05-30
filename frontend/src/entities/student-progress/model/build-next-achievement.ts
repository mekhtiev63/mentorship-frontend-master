import { achievementsCatalog } from '@/widgets/achievements/model/achievements-catalog'
import type { AchievementDefinition } from '@/widgets/achievements/model/achievements-catalog'
import type { NextAchievementVM } from '@/entities/student-progress/model/types'
import { ru } from '@/shared/i18n/ru'

type ProgressContext = {
  materialsCompleted: number
  streakDays: number
  blocksCompleted: number
  unlockedCodes: Set<string>
}

function heuristicProgress(
  code: AchievementDefinition['code'],
  ctx: ProgressContext,
): { percent: number; label: string } {
  switch (code) {
    case 'material_marathon':
      return {
        percent: Math.min(100, Math.round((ctx.materialsCompleted / 10) * 100)),
        label: `${ctx.materialsCompleted} / 10`,
      }
    case 'streak_7':
      return {
        percent: Math.min(100, Math.round((ctx.streakDays / 7) * 100)),
        label: `${ctx.streakDays} / 7 ${ru.progressPage.achievements.days}`,
      }
    case 'first_block':
      return {
        percent: ctx.blocksCompleted >= 1 ? 100 : Math.min(99, ctx.blocksCompleted * 50),
        label: `${ctx.blocksCompleted} / 1`,
      }
    case 'bonus_hunter':
      return { percent: 35, label: ru.progressPage.achievements.bonusHint }
    default:
      return { percent: 20, label: ru.progressPage.achievements.inProgress }
  }
}

export function buildNextAchievement(
  mappedUnlocked: AchievementDefinition[],
  ctx: ProgressContext,
): NextAchievementVM | null {
  const unlockedCodes = new Set(mappedUnlocked.map((a) => a.code))
  const next = achievementsCatalog.find((c) => !unlockedCodes.has(c.code) && !c.unlocked)
  if (!next) {
    const catalogNext = achievementsCatalog.find((c) => !c.unlocked)
    if (!catalogNext) return null
    const { percent, label } = heuristicProgress(catalogNext.code, ctx)
    return {
      code: catalogNext.code,
      title: catalogNext.title,
      description: catalogNext.description,
      progressPercent: percent,
      label,
    }
  }
  const { percent, label } = heuristicProgress(next.code, ctx)
  return {
    code: next.code,
    title: next.title,
    description: next.description,
    progressPercent: percent,
    label,
  }
}
