import { meApi } from '@/entities/session/api/session.api'
import {
  fetchAchievementsSource,
  fetchActivitySource,
  fetchBonusSource,
  fetchBonusTransactionsSource,
  fetchProgressBlocksSource,
  fetchRoadmapSource,
} from '@/entities/student-progress/api/progress-sources.api'
import { buildStudentProgressPage } from '@/entities/student-progress/model/build-progress-page'
import { buildMockStudentProgressPage } from '@/entities/student-progress/model/mock-student-progress'
import type { ProgressPartialError, ProgressPeriod } from '@/entities/student-progress/model/types'

export async function fetchStudentProgressPage(period: ProgressPeriod) {
  // TODO(backend): GET /me/progress/summary — use aggregate when implemented
  const me = await meApi().catch(() => null)
  if (!me) {
    return buildMockStudentProgressPage(period)
  }

  const [
    progressBlocks,
    activityItems,
    achievements,
    bonus,
    transactions,
    roadmap,
  ] = await Promise.all([
    fetchProgressBlocksSource(),
    fetchActivitySource(),
    fetchAchievementsSource(),
    fetchBonusSource(),
    fetchBonusTransactionsSource(),
    fetchRoadmapSource(),
  ])

  const partialErrors: ProgressPartialError[] = []
  if (activityItems === null) partialErrors.push('activity')
  if (bonus === null && transactions === null) partialErrors.push('bonus')
  if (roadmap === null) partialErrors.push('roadmap')

  const dataSource =
    partialErrors.length > 0 ? ('mixed' as const) : ('api' as const)

  return buildStudentProgressPage({
    period,
    progressBlocks: progressBlocks ?? [],
    activityItems: activityItems ?? [],
    achievements: achievements ?? [],
    bonus,
    transactions: transactions ?? [],
    roadmap,
    partialErrors,
    dataSource,
  })
}
