import { AppError } from '@/shared/api/types'

/** Shared TanStack Query defaults for API-backed modules. */
export const queryStaleTimeMs = {
  short: 30_000,
  medium: 60_000,
  long: 5 * 60_000,
} as const

export function shouldRetryQuery(failureCount: number, error: unknown): boolean {
  if (failureCount >= 2) return false
  if (error instanceof AppError) {
    const status = error.status
    if (status === 401 || status === 403 || status === 404) return false
    if (status !== undefined && status < 500) return false
  }
  return true
}

export const defaultQueryOptions = {
  staleTime: queryStaleTimeMs.medium,
  retry: shouldRetryQuery,
} as const
