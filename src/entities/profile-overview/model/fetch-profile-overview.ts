import { getMyProfileApi } from '@/entities/profile'
import { meApi } from '@/entities/session/api/session.api'
import { buildMockProfileOverview } from '@/entities/profile-overview/model/mock-profile-overview'
import { buildProfileOverview } from '@/entities/profile-overview/model/build-overview'
import { resolveStudentBuddyInfo } from '@/entities/profile-overview/model/resolve-buddy'
import type {
  ActivityEntryApi,
  BlockProgressApi,
  BonusBalanceApi,
  UserAchievementApi,
} from '@/entities/profile-overview/model/api-types'
import type { ProfileOverview } from '@/entities/profile-overview/model/types'
import type { ProfileDto } from '@/entities/profile'
import { apiClient } from '@/shared/api/client'
import type { ApiEnvelope } from '@/shared/api/types'
import { AppError } from '@/shared/api/types'

async function loadBonus(): Promise<BonusBalanceApi | null> {
  const { data } = await apiClient.get<ApiEnvelope<BonusBalanceApi>>('/me/bonus')
  return data.data
}

async function loadAchievements(): Promise<UserAchievementApi[]> {
  const { data } = await apiClient.get<ApiEnvelope<{ items: UserAchievementApi[] }>>(
    '/me/achievements',
  )
  return data.data.items ?? []
}

async function loadProgressBlocks(): Promise<BlockProgressApi[]> {
  const { data } = await apiClient.get<ApiEnvelope<{ items: BlockProgressApi[] }>>(
    '/progress/blocks',
  )
  return data.data.items ?? []
}

async function loadActivity(): Promise<ActivityEntryApi[]> {
  const { data } = await apiClient.get<
    ApiEnvelope<{ items: ActivityEntryApi[]; meta?: unknown }>
  >('/activity/me', { params: { page: 1, per_page: 50 } })
  return data.data.items ?? []
}

export async function fetchProfileOverview(): Promise<ProfileOverview> {
  let me
  try {
    me = await meApi()
  } catch {
    return buildMockProfileOverview('student@example.com')
  }

  let profile: ProfileDto
  try {
    profile = await getMyProfileApi()
  } catch (err) {
    if (err instanceof AppError) throw err
    profile = {
      user_id: me.user.id,
      display_name: '',
      bio: '',
      avatar_url: null,
      telegram_username: null,
      visibility: 'buddies',
    }
  }

  const [bonus, achievements, progressBlocks, activityItems, buddy] = await Promise.all([
    loadBonus().catch(() => null),
    loadAchievements().catch(() => [] as UserAchievementApi[]),
    loadProgressBlocks().catch(() => [] as BlockProgressApi[]),
    loadActivity().catch(() => [] as ActivityEntryApi[]),
    resolveStudentBuddyInfo(),
  ])

  return buildProfileOverview({
    profile,
    user: me.user,
    bonus,
    achievements,
    progressBlocks,
    activityItems,
    buddy,
    useMockBuddy: false,
  })
}
