import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { logoutApi, useSessionStore } from '@/entities/session'

export function useLogoutMutation() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      const refresh = useSessionStore.getState().refreshToken
      if (refresh) {
        await logoutApi(refresh)
      }
    },
    onSettled: () => {
      useSessionStore.getState().clearSession()
      queryClient.clear()
      navigate('/login', { replace: true })
    },
  })
}
