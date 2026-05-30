import type { NotificationPrefsVM } from '@/entities/user-settings/model/types'

export const DEFAULT_NOTIFICATION_PREFS: NotificationPrefsVM = {
  emailEnabled: true,
  telegramEnabled: false,
  inAppEnabled: true,
}
