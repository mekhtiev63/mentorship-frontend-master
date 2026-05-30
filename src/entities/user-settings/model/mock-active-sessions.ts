import { addDays } from '@/shared/lib/datetime'
import type { ActiveSessionVM } from '@/entities/user-settings/model/types'

/** Отдельный mock: активные сессии. */
export function buildMockActiveSessions(): ActiveSessionVM[] {
  const now = new Date()
  return [
    {
      id: 'sess-current',
      deviceLabel: 'Это устройство',
      browser: 'Chrome 122',
      os: 'Linux',
      lastActiveAt: now.toISOString(),
      current: true,
    },
    {
      id: 'sess-2',
      deviceLabel: 'MacBook Pro',
      browser: 'Safari 17',
      os: 'macOS',
      lastActiveAt: addDays(now, -1).toISOString(),
      current: false,
    },
    {
      id: 'sess-3',
      deviceLabel: 'iPhone 15',
      browser: 'Mobile Safari',
      os: 'iOS',
      lastActiveAt: addDays(now, -3).toISOString(),
      current: false,
    },
  ]
}
