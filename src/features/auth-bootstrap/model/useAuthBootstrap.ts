import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { authKeys, meApi, useSessionStore } from '@/entities/session'
import { shouldRetryQuery } from '@/shared/lib/query-options'

export function useAuthBootstrap() {
  const accessToken = useSessionStore((s) => s.accessToken)
  const setUser = useSessionStore((s) => s.setUser)
  const clearSession = useSessionStore((s) => s.clearSession)
  const user = useSessionStore((s) => s.user)
  const isAuthenticated = Boolean(accessToken)

  const query = useQuery({
    queryKey: authKeys.me(),
    queryFn: async () => {
      const res = await meApi()
      setUser(res.user)
      return res.user
    },
    enabled: isAuthenticated,
    retry: shouldRetryQuery,
    staleTime: 60_000,
  })

  useEffect(() => {
    if (!query.isError) {
      return
    }
    clearSession()
    if (!window.location.pathname.startsWith('/login')) {
      window.location.assign('/login')
    }
  }, [query.isError, clearSession])

  const isBootstrapping = isAuthenticated && (query.isLoading || query.isFetching)

  return {
    isAuthenticated,
    isBootstrapping,
    user: query.data ?? user,
  }
}
