import type { ProgressPeriod } from '@/entities/student-progress/model/types'

/** Placeholder matching future backend contract (V2). */
export type StudentProgressSummaryApi = {
  period: ProgressPeriod
  programPercent: number
  blocksCompleted: number
  blocksTotal: number
  materialsCompleted: number
  materialsTotal: number
  learningMinutes: number
  streakDays: number
  level: number
  levelTitle: string
  xp: number
  xpToNextLevel: number
}
