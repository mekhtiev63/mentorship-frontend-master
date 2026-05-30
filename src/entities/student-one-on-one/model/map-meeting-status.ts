import type { OneOnOneUiGroup } from '@/entities/student-one-on-one/model/types'
import { ru } from '@/shared/i18n/ru'

export function apiStatusToUiGroup(status: string): OneOnOneUiGroup {
  if (status === 'completed') return 'completed'
  if (status === 'cancelled') return 'cancelled'
  return 'scheduled'
}

export function statusLabelForApi(status: string): string {
  const key = status as keyof typeof ru.oneOnOnePage.status
  return ru.oneOnOnePage.status[key] ?? status
}

export function uiGroupAccentColor(group: OneOnOneUiGroup): string {
  switch (group) {
    case 'completed':
      return '#22C55E'
    case 'cancelled':
      return '#94A3B8'
    default:
      return '#A78BFA'
  }
}
