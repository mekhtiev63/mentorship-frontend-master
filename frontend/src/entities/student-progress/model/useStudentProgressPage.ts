import { useQuery } from '@tanstack/react-query'
import { fetchStudentProgressPage } from '@/entities/student-progress/model/fetch-student-progress-page'
import { studentProgressKeys } from '@/entities/student-progress/model/query-keys'
import type { ProgressPeriod } from '@/entities/student-progress/model/types'
import { useSessionStore } from '@/entities/session'

export function useStudentProgressPage(period: ProgressPeriod) {
  const userId = useSessionStore((s) => s.user?.id)

  return useQuery({
    queryKey: studentProgressKeys.page(period),
    queryFn: () => fetchStudentProgressPage(period),
    enabled: Boolean(userId),
    staleTime: 60_000,
  })
}
