import { useMutation, useQueryClient } from '@tanstack/react-query'
import { patchMyProfileApi, profileKeys } from '@/entities/profile'
import { profileOverviewKeys } from '@/entities/profile-overview'
import type { ProfileEditFormValues } from '@/features/profile-edit/model/profile-edit.types'

export function useUpdateProfileMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: ProfileEditFormValues) => {
      const telegram = input.telegram.trim().replace(/^@/, '')
      return patchMyProfileApi({
        display_name: input.displayName.trim(),
        bio: input.bio,
        avatar_url: input.avatarUrl.trim() || null,
        telegram_username: telegram || null,
        visibility: input.visibility,
      })
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: profileKeys.all })
      void queryClient.invalidateQueries({ queryKey: profileOverviewKeys.all })
    },
  })
}
