import type { ProfileDto } from '@/entities/profile/model/types'
import type { UserDto } from '@/entities/session/model/types'
import type { SettingsAccountVM } from '@/entities/user-settings/model/types'
import { ru } from '@/shared/i18n/ru'

export function mapSettingsAccount(profile: ProfileDto, user: UserDto): SettingsAccountVM {
  return {
    displayName: profile.display_name?.trim() || ru.settingsPage.account.nameFallback,
    email: user.email,
    telegram: profile.telegram_username?.trim() ? `@${profile.telegram_username.replace(/^@/, '')}` : '',
    avatarUrl: profile.avatar_url,
  }
}

export function buildMockSettingsAccount(email: string): SettingsAccountVM {
  return {
    displayName: ru.settingsPage.account.nameFallback,
    email: email || 'student@example.com',
    telegram: '@student_demo',
    avatarUrl: null,
  }
}
