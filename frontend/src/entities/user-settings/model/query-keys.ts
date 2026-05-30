import type { AppRole } from '@/shared/lib/roles'

export const userSettingsKeys = {
  all: ['user-settings'] as const,
  page: (role: AppRole) => [...userSettingsKeys.all, 'page', role] as const,
}
