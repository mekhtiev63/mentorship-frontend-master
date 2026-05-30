import { getMyProfileApi } from '@/entities/profile/api/profile.api'
import { meApi } from '@/entities/session/api/session.api'
import { buildMockSettingsAccount, mapSettingsAccount } from '@/entities/user-settings/model/map-settings-account'
import { buildMockActiveSessions } from '@/entities/user-settings/model/mock-active-sessions'
import { DEFAULT_NOTIFICATION_PREFS } from '@/entities/user-settings/model/mock-notification-prefs'
import type { SettingsPageVM } from '@/entities/user-settings/model/types'
import { PLATFORM_SUPPORT, PLATFORM_VERSION } from '@/shared/config/platform'
import type { AppRole } from '@/shared/lib/roles'

export async function fetchSettingsPage(role: AppRole): Promise<SettingsPageVM> {
  let dataSource: SettingsPageVM['dataSource'] = 'api'

  const me = await meApi()
  let account = buildMockSettingsAccount(me.user.email)

  try {
    const profile = await getMyProfileApi()
    account = mapSettingsAccount(profile, me.user)
  } catch {
    account = buildMockSettingsAccount(me.user.email)
    dataSource = 'mixed'
  }

  return {
    role,
    account,
    security: { sessions: buildMockActiveSessions() },
    notifications: { ...DEFAULT_NOTIFICATION_PREFS },
    info: {
      version: PLATFORM_VERSION,
      supportEmail: PLATFORM_SUPPORT.email,
      supportTelegram: PLATFORM_SUPPORT.telegram,
    },
    dataSource,
  }
}
