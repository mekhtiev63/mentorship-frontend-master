import { getUserProfileApi } from '@/entities/profile'
import { listOneOnOneRequestsApi } from '@/entities/student-one-on-one/api/one-on-one.api'
import type { BuddyInfo } from '@/entities/profile-overview/model/types'

/**
 * TODO(backend): add GET /me/buddy or include buddy in profile-overview aggregate.
 * Until then, best-effort resolution from the latest 1-on-1 request + public profile.
 */
export async function resolveStudentBuddyInfo(): Promise<BuddyInfo> {
  try {
    const items = await listOneOnOneRequestsApi({ perPage: 20 })
    const buddyId = items.find((r) => r.buddy_id)?.buddy_id
    if (!buddyId) return null
    const profile = await getUserProfileApi(buddyId)
    return {
      id: buddyId,
      displayName: profile.display_name?.trim() || buddyId,
      avatarUrl: profile.avatar_url,
      telegram: profile.telegram_username,
    }
  } catch {
    return null
  }
}
