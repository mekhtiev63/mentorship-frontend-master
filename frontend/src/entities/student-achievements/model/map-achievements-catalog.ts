import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import type { AchievementDefinition } from '@/widgets/achievements/model/achievements-catalog'
import { achievementsCatalog } from '@/widgets/achievements/model/achievements-catalog'
import type {
  AchievementDefinitionApi,
  UserAchievementApi,
} from '@/entities/student-achievements/api/achievements.api'
import { ru } from '@/shared/i18n/ru'

export function mergeAchievementsCatalogPage(
  catalog: AchievementDefinitionApi[],
  granted: UserAchievementApi[],
): AchievementDefinition[] {
  const grantedAt = new Map(granted.map((g) => [g.code, g.grantedAt]))

  if (catalog.length === 0 && granted.length > 0) {
    return granted.map((item, index) => {
      const fromStatic = achievementsCatalog.find((c) => c.code === item.code)
      return {
        id: item.code || `granted-${index}`,
        code: (fromStatic?.code ?? 'first_block') as AchievementDefinition['code'],
        title: item.title,
        description: item.description,
        icon: fromStatic?.icon ?? EmojiEventsIcon,
        unlocked: true,
        unlockedAt: item.grantedAt,
      }
    })
  }

  return catalog.map((def, index) => {
    const staticMeta = achievementsCatalog.find((c) => c.code === def.code)
    const code = def.code as AchievementDefinition['code']
    const hasRu = def.code in ru.achievements.byCode
    const unlocked = grantedAt.has(def.code)
    return {
      id: def.code || `cat-${index}`,
      code: staticMeta?.code ?? (hasRu ? code : 'first_block'),
      title: def.title || staticMeta?.title || def.code,
      description: def.description || staticMeta?.description || '',
      icon: staticMeta?.icon ?? EmojiEventsIcon,
      unlocked,
      unlockedAt: grantedAt.get(def.code),
    }
  })
}
