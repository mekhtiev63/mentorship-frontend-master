import { Alert, Box, Grid, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import type { StudentProgressPageVM } from '@/entities/student-progress'
import { ProgressPeriodTabs } from '@/features/progress-stats'
import { ru } from '@/shared/i18n/ru'
import {
  BlockCompletionChart,
  DailyActivityChart,
  WeeklyProgressChartWidget,
} from '@/widgets/progress-charts'
import { ProgressAchievementsSection } from '@/widgets/progress-overview/ui/ProgressAchievementsSection'
import { ProgressHeroMetrics } from '@/widgets/progress-overview/ui/ProgressHeroMetrics'
import { ProgressKpiGrid } from '@/widgets/progress-overview/ui/ProgressKpiGrid'
import { ProgressMotivationCard } from '@/widgets/progress-overview/ui/ProgressMotivationCard'
import { RoadmapBlocksStatsTable } from '@/widgets/progress-roadmap'

type ProgressOverviewScreenProps = {
  vm: StudentProgressPageVM
  period: import('@/entities/student-progress').ProgressPeriod
  onPeriodChange: (p: import('@/entities/student-progress').ProgressPeriod) => void
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
}

export function ProgressOverviewScreen({ vm, period, onPeriodChange }: ProgressOverviewScreenProps) {
  return (
    <Box component={motion.div} variants={container} initial="hidden" animate="show">
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ mb: 3, alignItems: { sm: 'flex-end' }, justifyContent: 'space-between' }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            {ru.progressPage.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {ru.progressPage.subtitle}
          </Typography>
        </Box>
        <ProgressPeriodTabs value={period} onChange={onPeriodChange} />
      </Stack>

      {vm.dataSource === 'mock' ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          {ru.progressPage.mockBanner}
        </Alert>
      ) : null}
      {vm.partialErrors.length > 0 ? (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {ru.progressPage.partialDataWarning}
        </Alert>
      ) : null}

      <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
        {ru.progressPage.periodHint}
      </Typography>

      <Stack spacing={3}>
        <ProgressHeroMetrics vm={vm} />
        <ProgressKpiGrid vm={vm} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, lg: 4 }}>
            <DailyActivityChart data={vm.activityByDay} />
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <WeeklyProgressChartWidget data={vm.progressByWeek} />
          </Grid>
          <Grid size={{ xs: 12, lg: 4 }}>
            <BlockCompletionChart data={vm.blockCompletion} />
          </Grid>
        </Grid>

        <RoadmapBlocksStatsTable blocks={vm.roadmapBlocks} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 7 }}>
            <ProgressAchievementsSection vm={vm} />
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <ProgressMotivationCard vm={vm} />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  )
}
