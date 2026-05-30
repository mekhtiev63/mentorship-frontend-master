import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import type { AchievementDefinition } from '@/widgets/achievements/model/achievements-catalog'
import { achievementsCatalog } from '@/widgets/achievements/model/achievements-catalog'
import type { UserAchievementApi } from '@/entities/profile-overview/model/api-types'

export function mapApiAchievements(items: UserAchievementApi[]): AchievementDefinition[] {
  return items.map((item, index) => {
    const fromCatalog = achievementsCatalog.find((c) => c.code === item.code)
    if (fromCatalog) {
      return {
        ...fromCatalog,
        unlocked: true,
        unlockedAt: item.grantedAt,
      }
    }
    return {
      id: `api-${item.code}-${index}`,
      code: 'first_block',
      title: item.title,
      description: item.description,
      icon: EmojiEventsIcon,
      unlocked: true,
      unlockedAt: item.grantedAt,
    }
  })
}
