import { ru } from '@/shared/i18n/ru'

export type ActivityChartPoint = {
  day: string
  minutes: number
  sessions: number
}

export type WeeklyProgressPoint = {
  week: string
  completed: number
  target: number
}

const d = ru.charts.days
const w = ru.charts.weeks

export const mockActivityChart: ActivityChartPoint[] = [
  { day: d.Mon, minutes: 45, sessions: 2 },
  { day: d.Tue, minutes: 62, sessions: 3 },
  { day: d.Wed, minutes: 28, sessions: 1 },
  { day: d.Thu, minutes: 90, sessions: 4 },
  { day: d.Fri, minutes: 55, sessions: 2 },
  { day: d.Sat, minutes: 120, sessions: 5 },
  { day: d.Sun, minutes: 40, sessions: 2 },
]

export const mockWeeklyProgress: WeeklyProgressPoint[] = [
  { week: w.W1, completed: 3, target: 5 },
  { week: w.W2, completed: 4, target: 5 },
  { week: w.W3, completed: 5, target: 5 },
  { week: w.W4, completed: 2, target: 5 },
  { week: w.W5, completed: 4, target: 5 },
  { week: w.W6, completed: 6, target: 5 },
]
