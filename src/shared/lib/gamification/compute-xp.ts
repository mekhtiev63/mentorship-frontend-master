import {
  XP_PER_ACHIEVEMENT,
  XP_PER_APPROVED_BLOCK,
  XP_PER_BONUS_DIVISOR,
  XP_PER_LEVEL,
} from '@/shared/lib/gamification/constants'
import { ru } from '@/shared/i18n/ru'

export function computeXp(
  programPercent: number,
  unlockedCount: number,
  bonusBalance: number,
  approvedBlocks: number,
): number {
  return (
    approvedBlocks * XP_PER_APPROVED_BLOCK +
    unlockedCount * XP_PER_ACHIEVEMENT +
    Math.floor(bonusBalance / XP_PER_BONUS_DIVISOR) +
    Math.floor(programPercent / 5)
  )
}

export function levelFromXp(xp: number): { level: number; title: string; xpToNextLevel: number } {
  const level = Math.floor(xp / XP_PER_LEVEL) + 1
  const xpInLevel = xp % XP_PER_LEVEL
  const xpToNextLevel = XP_PER_LEVEL - xpInLevel
  const titles = ru.profile.levelTitles
  const title = titles[Math.min(level - 1, titles.length - 1)]
  return { level, title, xpToNextLevel }
}
