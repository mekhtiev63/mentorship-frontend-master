import { useQuery } from '@tanstack/react-query'
import { fetchStudentBonusesPage } from '@/entities/student-bonus/model/fetch-student-bonuses-page'
import { studentBonusKeys } from '@/entities/student-bonus/model/query-keys'
import { useSessionStore } from '@/entities/session'
import { queryStaleTimeMs } from '@/shared/lib/query-options'

export function useStudentBonusesPage() {
  const userId = useSessionStore((s) => s.user?.id)
  return useQuery({
    queryKey: studentBonusKeys.page(),
    queryFn: fetchStudentBonusesPage,
    enabled: Boolean(userId),
    staleTime: queryStaleTimeMs.medium,
  })
}
