import { useQuery } from '@tanstack/react-query'
import { fetchAchievementsPage } from '@/entities/student-achievements/model/fetch-achievements-page'
import { studentAchievementsKeys } from '@/entities/student-achievements/model/query-keys'
import { queryStaleTimeMs } from '@/shared/lib/query-options'

export function useAchievementsPage() {
  return useQuery({
    queryKey: studentAchievementsKeys.page(),
    queryFn: fetchAchievementsPage,
    staleTime: queryStaleTimeMs.medium,
  })
}
