export const studentAchievementsKeys = {
  all: ['student-achievements'] as const,
  page: () => [...studentAchievementsKeys.all, 'page'] as const,
}
