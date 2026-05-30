import {
  listAchievementsCatalogApi,
  listMyAchievementsApi,
} from '@/entities/student-achievements/api/achievements.api'
import { mergeAchievementsCatalogPage } from '@/entities/student-achievements/model/map-achievements-catalog'
import type { AchievementDefinition } from '@/widgets/achievements/model/achievements-catalog'
import { achievementsCatalog } from '@/widgets/achievements/model/achievements-catalog'
import { meApi } from '@/entities/session/api/session.api'

export type AchievementsPageVM = {
  items: AchievementDefinition[]
  dataSource: 'api' | 'mock'
}

export async function fetchAchievementsPage(): Promise<AchievementsPageVM> {
  const me = await meApi().catch(() => null)

  if (!me) {
    try {
      const catalog = await listAchievementsCatalogApi()
      return {
        items: mergeAchievementsCatalogPage(catalog, []),
        dataSource: 'api',
      }
    } catch {
      return { items: achievementsCatalog, dataSource: 'mock' }
    }
  }

  const [catalog, mine] = await Promise.all([
    listAchievementsCatalogApi(),
    listMyAchievementsApi(),
  ])

  return {
    items: mergeAchievementsCatalogPage(catalog, mine),
    dataSource: 'api',
  }
}
