import { useQuery } from '@tanstack/react-query'
import { fetchSettingsPage } from '@/entities/user-settings/model/fetch-settings-page'
import { userSettingsKeys } from '@/entities/user-settings/model/query-keys'
import { useSessionStore } from '@/entities/session'
import type { AppRole } from '@/shared/lib/roles'

export function useSettingsPage(role: AppRole) {
  const userId = useSessionStore((s) => s.user?.id)
  return useQuery({
    queryKey: userSettingsKeys.page(role),
    queryFn: () => fetchSettingsPage(role),
    enabled: Boolean(userId),
    staleTime: 60_000,
  })
}
