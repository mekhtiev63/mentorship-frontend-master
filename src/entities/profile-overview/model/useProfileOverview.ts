import { useQuery } from '@tanstack/react-query'
import { useSessionStore } from '@/entities/session'
import { fetchProfileOverview } from '@/entities/profile-overview/model/fetch-profile-overview'
import { profileOverviewKeys } from '@/entities/profile-overview/model/query-keys'
import { queryStaleTimeMs } from '@/shared/lib/query-options'

export function useProfileOverview() {
  const userId = useSessionStore((s) => s.user?.id)

  return useQuery({
    queryKey: profileOverviewKeys.me(),
    queryFn: fetchProfileOverview,
    enabled: Boolean(userId),
    staleTime: queryStaleTimeMs.medium,
  })
}
