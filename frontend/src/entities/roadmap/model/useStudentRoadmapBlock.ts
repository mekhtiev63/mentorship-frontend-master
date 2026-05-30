import { useQuery } from '@tanstack/react-query'
import { fetchStudentRoadmapBlock } from '@/entities/roadmap/model/fetch-student-roadmap-block'
import { roadmapKeys } from '@/entities/roadmap/model/query-keys'
import { useSessionStore } from '@/entities/session'

export function useStudentRoadmapBlock(blockId: string) {
  const userId = useSessionStore((s) => s.user?.id)

  return useQuery({
    queryKey: roadmapKeys.studentBlock(blockId),
    queryFn: () => fetchStudentRoadmapBlock(blockId),
    enabled: Boolean(userId) && Boolean(blockId),
    staleTime: 60_000,
  })
}
