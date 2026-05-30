import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Box, Button, Grid, LinearProgress, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import type { StudentProgressPageVM } from '@/entities/student-progress'
import { ru } from '@/shared/i18n/ru'
import { brandColors } from '@/shared/theme/palette'
import { AchievementBadgeCard } from '@/widgets/achievements/ui/AchievementBadgeCard'
import { PanelCard } from '@/widgets/student-dashboard/ui/PanelCard'

type ProgressAchievementsSectionProps = {
  vm: StudentProgressPageVM
  delay?: number
}

export function ProgressAchievementsSection({ vm, delay = 0.4 }: ProgressAchievementsSectionProps) {
  return (
    <PanelCard
      title={ru.progressPage.achievements.title}
      delay={delay}
      action={
        <Button component={RouterLink} to="/student/achievements" size="small" endIcon={<ArrowForwardIcon />}>
          {ru.progressPage.achievements.allLink}
        </Button>
      }
    >
      {vm.recentAchievements.length === 0 ? (
        <Typography variant="body2" color="text.secondary">
          {ru.progressPage.achievements.empty}
        </Typography>
      ) : (
        <Grid container spacing={1.5}>
          {vm.recentAchievements.map((a, i) => (
            <Grid key={a.id} size={{ xs: 12, sm: 6 }}>
              <AchievementBadgeCard achievement={a} index={i} compact />
            </Grid>
          ))}
        </Grid>
      )}

      {vm.nextAchievement ? (
        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
            {ru.progressPage.achievements.nextTitle}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {vm.nextAchievement.title}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            {vm.nextAchievement.description}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <LinearProgress
              variant="determinate"
              value={vm.nextAchievement.progressPercent}
              sx={{
                flex: 1,
                height: 8,
                borderRadius: 4,
                '& .MuiLinearProgress-bar': { background: brandColors.heroGradient },
              }}
            />
            <Typography variant="caption">{vm.nextAchievement.label}</Typography>
          </Stack>
        </Box>
      ) : null}
    </PanelCard>
  )
}
