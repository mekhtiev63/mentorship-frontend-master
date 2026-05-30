import type { AxiosError } from 'axios'
import { apiClient } from '@/shared/api/client'
import type { ApiErrorBody } from '@/shared/api/types'
import { AppError } from '@/shared/api/types'
import { useSessionStore } from '@/entities/session'

function redirectToLogin(): void {
  if (typeof window === 'undefined' || window.location.pathname.startsWith('/login')) {
    return
  }
  window.location.assign('/login')
}

function redirectToSelectRole(): void {
  if (typeof window === 'undefined' || window.location.pathname.startsWith('/select-role')) {
    return
  }
  window.location.assign('/select-role')
}

export function setupApiInterceptors(): void {
  apiClient.interceptors.request.use((config) => {
    const token = useSessionStore.getState().accessToken
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiErrorBody>) => {
      const status = error.response?.status
      const body = error.response?.data
      const code = body?.error?.code

      if (status === 401) {
        useSessionStore.getState().clearSession()
        redirectToLogin()
      }

      if (status === 403 && code === 'active_role_required') {
        redirectToSelectRole()
      }

      if (body?.error) {
        return Promise.reject(new AppError(body.error.code, body.error.message, status))
      }

      return Promise.reject(error)
    },
  )
}
