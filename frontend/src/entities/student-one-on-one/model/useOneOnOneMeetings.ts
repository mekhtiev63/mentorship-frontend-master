import { useQuery } from '@tanstack/react-query'
import { fetchOneOnOneDetail, fetchOneOnOneList } from '@/entities/student-one-on-one/model/fetch-one-on-one-list'
import { oneOnOneKeys } from '@/entities/student-one-on-one/model/query-keys'
import type { OneOnOneFilterGroup } from '@/entities/student-one-on-one/model/types'
import { useSessionStore } from '@/entities/session'

export function useOneOnOneList(group: OneOnOneFilterGroup, search: string) {
  const userId = useSessionStore((s) => s.user?.id)
  return useQuery({
    queryKey: oneOnOneKeys.list(group, search),
    queryFn: () => fetchOneOnOneList(group, search),
    enabled: Boolean(userId),
    staleTime: 60_000,
  })
}

export function useOneOnOneDetail(requestId: string) {
  const userId = useSessionStore((s) => s.user?.id)
  return useQuery({
    queryKey: oneOnOneKeys.detail(requestId),
    queryFn: () => fetchOneOnOneDetail(requestId),
    enabled: Boolean(userId) && Boolean(requestId),
    staleTime: 60_000,
  })
}
