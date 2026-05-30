import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { NotificationPrefsVM } from '@/entities/user-settings'
import { DEFAULT_NOTIFICATION_PREFS } from '@/entities/user-settings/model/mock-notification-prefs'

type NotificationPrefsState = NotificationPrefsVM & {
  setEmailEnabled: (v: boolean) => void
  setTelegramEnabled: (v: boolean) => void
  setInAppEnabled: (v: boolean) => void
}

export const useNotificationPrefsStore = create<NotificationPrefsState>()(
  persist(
    (set) => ({
      ...DEFAULT_NOTIFICATION_PREFS,
      setEmailEnabled: (emailEnabled) => set({ emailEnabled }),
      setTelegramEnabled: (telegramEnabled) => set({ telegramEnabled }),
      setInAppEnabled: (inAppEnabled) => set({ inAppEnabled }),
    }),
    { name: 'go-mentorship-notification-prefs' },
  ),
)

export function useNotificationPrefs() {
  const emailEnabled = useNotificationPrefsStore((s) => s.emailEnabled)
  const telegramEnabled = useNotificationPrefsStore((s) => s.telegramEnabled)
  const inAppEnabled = useNotificationPrefsStore((s) => s.inAppEnabled)
  const setEmailEnabled = useNotificationPrefsStore((s) => s.setEmailEnabled)
  const setTelegramEnabled = useNotificationPrefsStore((s) => s.setTelegramEnabled)
  const setInAppEnabled = useNotificationPrefsStore((s) => s.setInAppEnabled)
  return {
    emailEnabled,
    telegramEnabled,
    inAppEnabled,
    setEmailEnabled,
    setTelegramEnabled,
    setInAppEnabled,
  }
}
