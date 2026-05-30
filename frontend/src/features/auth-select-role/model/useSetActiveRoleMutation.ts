import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { authKeys, setActiveRoleApi, useSessionStore } from '@/entities/session'
import type { AppRole } from '@/shared/lib/roles'
import { isFrontendRole, roleHomePath } from '@/shared/lib/roles'

export function useSetActiveRoleMutation() {
  const navigate = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()
  const setSession = useSessionStore((s) => s.setSession)

  return useMutation({
    mutationFn: (activeRole: AppRole) => setActiveRoleApi(activeRole),
    onSuccess: (res) => {
      setSession(res.tokens.access_token, res.tokens.refresh_token ?? null, res.user)
      queryClient.clear()
      void queryClient.invalidateQueries({ queryKey: authKeys.all })
      const from = (location.state as { from?: string } | null)?.from
      const home = res.user.active_role && isFrontendRole(res.user.active_role)
        ? roleHomePath(res.user.active_role)
        : '/'
      const target =
        from && res.user.active_role && from.startsWith(`/${res.user.active_role}`)
          ? from
          : home
      navigate(target, { replace: true })
    },
  })
}
