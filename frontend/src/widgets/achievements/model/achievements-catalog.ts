import type { SvgIconComponent } from '@mui/icons-material'
import BoltIcon from '@mui/icons-material/Bolt'
import CodeIcon from '@mui/icons-material/Code'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import SavingsIcon from '@mui/icons-material/Savings'
import SchoolIcon from '@mui/icons-material/School'
import StarIcon from '@mui/icons-material/Star'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import { ru } from '@/shared/i18n/ru'

export type AchievementDefinition = {
  id: string
  code: keyof typeof ru.achievements.byCode
  title: string
  description: string
  icon: SvgIconComponent
  unlocked: boolean
  unlockedAt?: string
}

function entry(
  id: string,
  code: keyof typeof ru.achievements.byCode,
  icon: SvgIconComponent,
  unlocked: boolean,
  unlockedAt?: string,
): AchievementDefinition {
  const text = ru.achievements.byCode[code]
  return {
    id,
    code,
    title: text.title,
    description: text.description,
    icon,
    unlocked,
    unlockedAt,
  }
}

export const achievementsCatalog: AchievementDefinition[] = [
  entry('a1', 'first_block', EmojiEventsIcon, true, '2026-05-27T11:00:00Z'),
  entry('a2', 'material_marathon', SchoolIcon, true, '2026-05-20T15:30:00Z'),
  entry('a3', 'early_bird', BoltIcon, true, '2026-05-12T07:00:00Z'),
  entry('a4', 'go_ninja', CodeIcon, false),
  entry('a5', 'micro_master', RocketLaunchIcon, false),
  entry('a6', 'design_guru', WorkspacePremiumIcon, false),
  entry('a7', 'streak_7', StarIcon, true, '2026-05-18T20:00:00Z'),
  entry('a8', 'bonus_hunter', SavingsIcon, false),
]
