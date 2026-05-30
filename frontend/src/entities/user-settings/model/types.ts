import type { AppRole } from '@/shared/lib/roles'

export type SettingsSectionId = 'account' | 'security' | 'notifications' | 'interface' | 'info'

export type SettingsAccountVM = {
  displayName: string
  email: string
  telegram: string
  avatarUrl: string | null
}

export type ActiveSessionVM = {
  id: string
  deviceLabel: string
  browser: string
  os: string
  lastActiveAt: string
  current: boolean
}

export type NotificationPrefsVM = {
  emailEnabled: boolean
  telegramEnabled: boolean
  inAppEnabled: boolean
}

export type PlatformInfoVM = {
  version: string
  supportEmail: string
  supportTelegram: string
}

export type SettingsPageVM = {
  role: AppRole
  account: SettingsAccountVM
  security: { sessions: ActiveSessionVM[] }
  notifications: NotificationPrefsVM
  info: PlatformInfoVM
  dataSource: 'mock' | 'api' | 'mixed'
}
