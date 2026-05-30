export type ProgressPeriod = 'week' | 'month' | 'all'

export type ProgressPartialError = 'activity' | 'bonus' | 'roadmap'

export type ActivityByDayPoint = {
  label: string
  dateKey: string
  minutes: number
  sessions: number
}

export type WeeklyProgressPoint = {
  weekLabel: string
  completedUnits: number
  targetUnits: number
}

export type BlockCompletionPoint = {
  blockId: string
  title: string
  percent: number
}

export type RoadmapBlockProgressRowVM = {
  id: string
  title: string
  sortOrder: number
  uiStatus: string
  percent: number
  materialsDone: number
  materialsTotal: number
  href: string
}

export type NextAchievementVM = {
  code: string
  title: string
  description: string
  progressPercent: number
  label: string
}

export type MotivationVM = {
  currentGoalTitle: string
  currentGoalHref: string
  nextMilestoneTitle: string
  nextMilestoneHint: string
}

export type BonusPeriodStats = {
  balance: number
  earnedInPeriod: number
  spentInPeriod: number
}

export type StudentProgressPageVM = {
  period: ProgressPeriod
  dataSource: 'api' | 'mock' | 'mixed'
  partialErrors: ProgressPartialError[]
  programPercent: number
  blocksCompleted: number
  blocksTotal: number
  materialsCompleted: number
  materialsTotal: number
  learningMinutes: number
  learningHoursDisplay: number
  streakDays: number
  level: number
  levelTitle: string
  xp: number
  xpToNextLevel: number
  activityByDay: ActivityByDayPoint[]
  progressByWeek: WeeklyProgressPoint[]
  blockCompletion: BlockCompletionPoint[]
  roadmapBlocks: RoadmapBlockProgressRowVM[]
  recentAchievements: import('@/widgets/achievements/model/achievements-catalog').AchievementDefinition[]
  nextAchievement: NextAchievementVM | null
  bonus: BonusPeriodStats
  motivation: MotivationVM
}
