export type RoadmapBlockSummary = {
  id: string
  title: string
  status: 'in_progress' | 'completed' | 'locked'
  materialsTotal: number
  materialsDone: number
}

export type CalendarEventPreview = {
  id: string
  title: string
  startsAt: string
  type: string
}

export type ActivityItem = {
  id: string
  verb: string
  objectLabel: string
  occurredAt: string
}

export type AchievementPreview = {
  id: string
  code: string
  title: string
  grantedAt: string
}

export type StudentDashboardData = {
  progressPercent: number
  currentBlock: RoadmapBlockSummary
  achievementsCount: number
  achievementsTotal: number
  bonusBalance: number
  upcomingEvents: CalendarEventPreview[]
  recentActivity: ActivityItem[]
  recentAchievements: AchievementPreview[]
}
