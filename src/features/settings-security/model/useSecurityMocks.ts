import { useMutation } from '@tanstack/react-query'

export function useChangePasswordMock() {
  return useMutation({
    mutationFn: async (_input: {
      currentPassword: string
      newPassword: string
    }) => {
      await new Promise((r) => setTimeout(r, 500))
      return { ok: true as const }
    },
  })
}

export function useRevokeAllSessionsMock() {
  return useMutation({
    mutationFn: async () => {
      await new Promise((r) => setTimeout(r, 400))
      return { ok: true as const }
    },
  })
}
