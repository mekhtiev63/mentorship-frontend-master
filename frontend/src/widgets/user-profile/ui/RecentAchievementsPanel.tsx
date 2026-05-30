import { Button, Grid, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import type { ProfileOverview } from '@/entities/profile-overview'
import { AchievementBadgeCard } from '@/widgets/achievements/ui/AchievementBadgeCard'
import { PanelCard } from '@/widgets/student-dashboard/ui/PanelCard'
import { ru } from '@/shared/i18n/ru'

type RecentAchievementsPanelProps = {
  profile: ProfileOverview
  delay?: number
}

export function RecentAchievementsPanel({ profile, delay = 0.3 }: RecentAchievementsPanelProps) {
  const items = profile.recentAchievements

  return (
    <PanelCard
      title={ru.profile.recentAchievements}
      delay={delay}
      action={
        <Button component={RouterLink} to="/student/achievements" size="small">
          {ru.common.viewAll}
        </Button>
      }
    >
      {items.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
          {ru.profile.achievementsEmpty}
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {items.map((achievement, index) => (
            <Grid key={achievement.id} size={{ xs: 12, sm: 6 }}>
              <AchievementBadgeCard achievement={achievement} index={index} compact />
            </Grid>
          ))}
        </Grid>
      )}
    </PanelCard>
  )
}
