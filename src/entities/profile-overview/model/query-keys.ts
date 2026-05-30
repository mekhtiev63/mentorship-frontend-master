export const profileOverviewKeys = {
  all: ['profile', 'overview'] as const,
  me: () => [...profileOverviewKeys.all, 'me'] as const,
}
