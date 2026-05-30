export {
  XP_PER_APPROVED_BLOCK,
  XP_PER_ACHIEVEMENT,
  XP_PER_BONUS_DIVISOR,
  XP_PER_LEVEL,
} from '@/shared/lib/gamification/constants'

/** Fallback buddy when backend has no student-facing assignment API. */
export const MOCK_BUDDY = {
  id: 'mock-buddy',
  displayName: 'Алексей Иванов',
  email: 'buddy@example.com',
  avatarUrl: null as string | null,
  telegram: 'alexbuddy',
}

export const STATIC_SKILL_LABELS = [
  { id: 'go', label: 'Go' },
  { id: 'pg', label: 'PostgreSQL' },
  { id: 'docker', label: 'Docker' },
  { id: 'rest', label: 'REST API' },
  { id: 'conc', label: 'Concurrency' },
] as const
