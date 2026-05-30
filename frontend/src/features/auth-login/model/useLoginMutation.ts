import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useLocation } from 'react-router-dom'
import { loginApi, useSessionStore } from '@/entities/session'
import { isFrontendRole, roleHomePath } from '@/shared/lib/roles'
import type { LoginResponse } from '@/entities/session/model/types'
import { AppError } from '@/shared/api/types'

export type LoginInput = {
  email: string
  password: string
}

export type LoginResult =
  | { kind: 'success'; path: string }
  | { kind: 'admin_only' }
  | { kind: 'select_role' }

export function resolvePostLogin(res: LoginResponse): LoginResult {
  const roles = res.user.roles.filter(isFrontendRole)
  if (roles.length === 0) {
    return { kind: 'admin_only' }
  }
  if (res.tokens.requires_role_selection || !res.user.active_role) {
    return { kind: 'select_role' }
  }
  if (res.user.active_role && isFrontendRole(res.user.active_role)) {
    return { kind: 'success', path: roleHomePath(res.user.active_role) }
  }
  return { kind: 'select_role' }
}

export function useLoginMutation() {
  const navigate = useNavigate()
  const location = useLocation()
  const setSession = useSessionStore((s) => s.setSession)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: LoginInput) => {
      const res = await loginApi(input.email, input.password)
      const outcome = resolvePostLogin(res)
      if (outcome.kind === 'admin_only') {
        throw new AppError('admin_only', 'Admin portal only')
      }
      return { res, outcome }
    },
    onSuccess: ({ res, outcome }) => {
      setSession(res.tokens.access_token, res.tokens.refresh_token ?? null, res.user)
      void queryClient.invalidateQueries({ queryKey: ['auth'] })
      const from = (location.state as { from?: string } | null)?.from
      if (outcome.kind === 'select_role') {
        navigate('/select-role', { replace: true, state: { from } })
        return
      }
      navigate(
        from && res.user.active_role && from.startsWith(`/${res.user.active_role}`)
          ? from
          : outcome.path,
        { replace: true },
      )
    },
  })
}
