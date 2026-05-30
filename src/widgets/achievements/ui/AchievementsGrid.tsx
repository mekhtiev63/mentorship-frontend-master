import { Grid, Skeleton, Stack, Typography } from '@mui/material'
import { useAchievementsPage } from '@/entities/student-achievements'
import { achievementsCatalog } from '@/widgets/achievements/model/achievements-catalog'
import { AchievementBadgeCard } from '@/widgets/achievements/ui/AchievementBadgeCard'
import { LoadErrorState } from '@/shared/ui/LoadErrorState'
import { ru } from '@/shared/i18n/ru'

type AchievementsGridProps = {
  title?: string
  limit?: number
}

export function AchievementsGrid({ title = ru.nav.achievements, limit }: AchievementsGridProps) {
  const { data, isLoading, isError, refetch } = useAchievementsPage()

  if (isLoading) {
    return (
      <Stack spacing={2}>
        <Skeleton variant="rounded" height={32} width="40%" />
        <Skeleton variant="rounded" height={20} width="30%" />
        <Grid container spacing={2}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
              <Skeleton variant="rounded" height={160} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    )
  }

  if (isError) {
    return <LoadErrorState onRetry={() => void refetch()} />
  }

  const catalog = data?.items ?? achievementsCatalog
  const items = limit ? catalog.slice(0, limit) : catalog
  const unlockedCount = catalog.filter((a) => a.unlocked).length

  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
        {title}
      </Typography>
      <Typography color="text.secondary" variant="body2" sx={{ mb: 2 }}>
        {unlockedCount} {ru.achievements.gridSubtitle}
      </Typography>
      <Grid container spacing={2}>
        {items.map((achievement, index) => (
          <Grid key={achievement.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <AchievementBadgeCard achievement={achievement} index={index} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}
