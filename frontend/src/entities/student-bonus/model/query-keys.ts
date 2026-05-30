export const studentBonusKeys = {
  all: ['student-bonus'] as const,
  page: () => [...studentBonusKeys.all, 'page'] as const,
}
