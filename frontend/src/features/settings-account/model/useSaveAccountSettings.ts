import { useMutation, useQueryClient } from '@tanstack/react-query'
import { patchMyProfileApi } from '@/entities/profile'
import { userSettingsKeys } from '@/entities/user-settings/model/query-keys'
import { profileOverviewKeys } from '@/entities/profile-overview'
import { profileKeys } from '@/entities/profile'

export type AccountSettingsForm = {
  displayName: string
  telegram: string
  avatarUrl: string
}

export function useSaveAccountSettings(role: import('@/shared/lib/roles').AppRole) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: AccountSettingsForm) => {
      const telegram = input.telegram.trim().replace(/^@/, '')
      try {
        return await patchMyProfileApi({
          display_name: input.displayName.trim(),
          telegram_username: telegram || null,
          avatar_url: input.avatarUrl.trim() || null,
        })
      } catch {
        await new Promise((r) => setTimeout(r, 400))
        return null
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: userSettingsKeys.page(role) })
      void queryClient.invalidateQueries({ queryKey: profileKeys.all })
      void queryClient.invalidateQueries({ queryKey: profileOverviewKeys.all })
    },
  })
}
