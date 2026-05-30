import type { ProgressPeriod } from '@/entities/student-progress/model/types'

export const studentProgressKeys = {
  all: ['student-progress'] as const,
  page: (period: ProgressPeriod) => [...studentProgressKeys.all, period] as const,
}
