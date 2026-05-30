import { useQuery } from '@tanstack/react-query'
import { fetchStudentRoadmapPage } from '@/entities/roadmap/model/fetch-student-roadmap-page'
import { roadmapKeys } from '@/entities/roadmap/model/query-keys'
import { useSessionStore } from '@/entities/session'

import { queryStaleTimeMs } from '@/shared/lib/query-options'

export function useStudentRoadmapPage() {
  const userId = useSessionStore((s) => s.user?.id)

  return useQuery({
    queryKey: roadmapKeys.studentPage(),
    queryFn: fetchStudentRoadmapPage,
    enabled: Boolean(userId),
    staleTime: queryStaleTimeMs.medium,
  })
}
