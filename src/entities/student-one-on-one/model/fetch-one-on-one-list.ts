import {
  getOneOnOneRequestApi,
  listOneOnOneRequestsApi,
} from '@/entities/student-one-on-one/api/one-on-one.api'
import { applyMeetingFilters } from '@/entities/student-one-on-one/model/filter-meetings'
import { mapOneOnOneMeeting } from '@/entities/student-one-on-one/model/map-one-on-one-meeting'
import { buildMockOneOnOneMeetings, findMockMeetingById } from '@/entities/student-one-on-one/model/mock-one-on-one-meetings'
import { pickNextMeeting, splitMeetingsLists } from '@/entities/student-one-on-one/model/pick-next-meeting'
import type { OneOnOneFilterGroup, OneOnOneListPageVM } from '@/entities/student-one-on-one/model/types'
import { getUserProfileApi } from '@/entities/profile'
import { meApi } from '@/entities/session/api/session.api'
import { isApiSessionActive } from '@/shared/lib/session'

function buildListVm(
  allMeetings: import('@/entities/student-one-on-one/model/types').OneOnOneMeetingVM[],
  filteredMeetings: import('@/entities/student-one-on-one/model/types').OneOnOneMeetingVM[],
  dataSource: OneOnOneListPageVM['dataSource'],
): OneOnOneListPageVM {
  const { scheduled, history } = splitMeetingsLists(allMeetings)
  return {
    meetings: filteredMeetings,
    nextMeeting: pickNextMeeting(allMeetings),
    scheduled,
    history,
    dataSource,
  }
}

async function mapWithBuddyProfiles(
  items: Awaited<ReturnType<typeof listOneOnOneRequestsApi>>,
) {
  const buddyIds = [...new Set(items.map((i) => i.buddy_id).filter(Boolean))]
  const profiles = new Map<string, Awaited<ReturnType<typeof getUserProfileApi>>>()
  await Promise.all(
    buddyIds.map(async (id) => {
      try {
        profiles.set(id, await getUserProfileApi(id))
      } catch {
        /* ignore */
      }
    }),
  )
  return items.map((dto) => {
    const profile = profiles.get(dto.buddy_id)
    const buddy = profile
      ? {
          id: dto.buddy_id,
          displayName: profile.display_name,
          avatarUrl: profile.avatar_url,
          telegram: profile.telegram_username,
        }
      : undefined
    return mapOneOnOneMeeting(dto, { buddy })
  })
}

export async function fetchOneOnOneList(
  group: OneOnOneFilterGroup,
  search: string,
): Promise<OneOnOneListPageVM> {
  const me = await meApi().catch(() => null)
  if (!me) {
    const all = buildMockOneOnOneMeetings()
    const filtered = applyMeetingFilters(all, group, search)
    return buildListVm(all, filtered, 'mock')
  }

  try {
    const items = await listOneOnOneRequestsApi()
    const mapped = await mapWithBuddyProfiles(items)
    const filtered = applyMeetingFilters(mapped, group, search)
    return buildListVm(mapped, filtered, 'api')
  } catch {
    const all = buildMockOneOnOneMeetings()
    const filtered = applyMeetingFilters(all, group, search)
    return buildListVm(all, filtered, 'mock')
  }
}

export async function fetchOneOnOneDetail(requestId: string) {
  if (!isApiSessionActive()) {
    const mockHit = findMockMeetingById(requestId)
    if (mockHit) return { meeting: mockHit, dataSource: 'mock' as const }
  }

  const dto = await getOneOnOneRequestApi(requestId)
  const profile = await getUserProfileApi(dto.buddy_id).catch(() => null)
  const buddy = profile
    ? {
        id: dto.buddy_id,
        displayName: profile.display_name,
        avatarUrl: profile.avatar_url,
        telegram: profile.telegram_username,
      }
    : undefined
  return { meeting: mapOneOnOneMeeting(dto, { buddy }), dataSource: 'api' as const }
}
