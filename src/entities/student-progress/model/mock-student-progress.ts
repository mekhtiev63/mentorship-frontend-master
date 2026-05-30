import type { ProgressPeriod, StudentProgressPageVM } from '@/entities/student-progress/model/types'
import { buildStudentProgressPage } from '@/entities/student-progress/model/build-progress-page'
import type { BlockProgressApi } from '@/entities/profile-overview/model/api-types'
import { achievementsCatalog } from '@/widgets/achievements/model/achievements-catalog'

const MOCK_BLOCKS: BlockProgressApi[] = [
  {
    blockId: 'block-1',
    title: 'Основы Go',
    status: 'approved',
    requiredMaterials: 8,
    viewedMaterials: 8,
  },
  {
    blockId: 'block-2',
    title: 'Конкурентность',
    status: 'in_progress',
    requiredMaterials: 10,
    viewedMaterials: 6,
  },
  {
    blockId: 'block-3',
    title: 'Микросервисы',
    status: 'locked',
    requiredMaterials: 12,
    viewedMaterials: 0,
  },
]

const MOCK_ACTIVITY = [
  { id: '1', verb: 'viewed', activity_type: 'material', occurred_at: new Date().toISOString() },
  {
    id: '2',
    verb: 'viewed',
    activity_type: 'material',
    occurred_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    verb: 'viewed',
    activity_type: 'material',
    occurred_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
]

export function buildMockStudentProgressPage(period: ProgressPeriod = 'month'): StudentProgressPageVM {
  const vm = buildStudentProgressPage({
    period,
    progressBlocks: MOCK_BLOCKS,
    activityItems: MOCK_ACTIVITY,
    achievements: achievementsCatalog
      .filter((a) => a.unlocked)
      .map((a) => ({
        code: a.code,
        title: a.title,
        description: a.description,
        grantedAt: a.unlockedAt ?? new Date().toISOString(),
      })),
    bonus: { balance: 420 },
    transactions: [
      { id: 't1', amount: 50, type: 'credit', createdAt: new Date().toISOString() },
      { id: 't2', amount: -20, type: 'debit', createdAt: new Date().toISOString() },
    ],
    roadmap: null,
    partialErrors: [],
    dataSource: 'mock',
  })

  if (vm.recentAchievements.length === 0) {
    vm.recentAchievements = achievementsCatalog.filter((a) => a.unlocked).slice(0, 4)
  }

  return vm
}
