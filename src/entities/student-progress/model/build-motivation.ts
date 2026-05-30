import type { BlockProgressApi } from '@/entities/profile-overview/model/api-types'
import type { MotivationVM } from '@/entities/student-progress/model/types'
import { ru } from '@/shared/i18n/ru'

export function buildMotivation(
  progressBlocks: BlockProgressApi[],
  xpToNextLevel: number,
  levelTitle: string,
): MotivationVM {
  const active =
    progressBlocks.find((b) => b.status === 'in_progress') ??
    progressBlocks.find((b) => b.status !== 'approved' && b.status !== 'locked')

  const nextBlock = progressBlocks.find((b) => b.status === 'locked' || b.status === 'not_started')

  const currentGoalTitle = active?.title ?? ru.progressPage.motivation.defaultGoal
  const currentGoalHref = active
    ? `/student/roadmap/blocks/${active.blockId}/materials`
    : '/student/roadmap'

  const nextMilestoneTitle = nextBlock
    ? ru.progressPage.motivation.nextBlock.replace('{title}', nextBlock.title)
    : ru.progressPage.motivation.nextLevel.replace('{level}', levelTitle)

  const nextMilestoneHint =
    xpToNextLevel > 0
      ? ru.progressPage.motivation.xpHint.replace('{xp}', String(xpToNextLevel))
      : ru.progressPage.motivation.keepGoing

  return { currentGoalTitle, currentGoalHref, nextMilestoneTitle, nextMilestoneHint }
}
