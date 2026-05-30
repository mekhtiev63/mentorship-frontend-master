import { Box, Grid } from '@mui/material'
import { BookOpen, CalendarDays, Gem, Trophy } from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { mockStudentDashboard } from '@/entities/student-dashboard'
import { useCelebration } from '@/shared/hooks/useCelebration'
import { ru } from '@/shared/i18n/ru'
import { DashboardSkeleton } from '@/widgets/student-dashboard/ui/DashboardSkeleton'
import { MetricCard } from '@/widgets/student-dashboard/ui/MetricCard'
import { ProgressHero } from '@/widgets/student-dashboard/ui/ProgressHero'
import { ActivityChart } from '@/widgets/student-dashboard/ui/ActivityChart'
import { WeeklyProgressChart } from '@/widgets/student-dashboard/ui/WeeklyProgressChart'
import { DashboardAchievementsPanel } from '@/widgets/student-dashboard/ui/DashboardAchievementsPanel'
import { DashboardEventsPanel } from '@/widgets/student-dashboard/ui/DashboardEventsPanel'
import { RoadmapDevelopmentMap } from '@/widgets/roadmap/ui/RoadmapDevelopmentMap'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

export function StudentDashboardView() {
  const [loading, setLoading] = useState(true)
  const data = mockStudentDashboard

  useEffect(() => {
    const t = window.setTimeout(() => setLoading(false), 900)
    return () => window.clearTimeout(t)
  }, [])

  const hasFreshAchievement = data.recentAchievements.length > 0
  useCelebration({
    enabled: !loading && hasFreshAchievement,
    storageKey: 'dashboard-achievement-confetti',
  })

  return (
    <Box component={motion.div} variants={container} initial="hidden" animate="show">
      <DashboardSkeleton loading={loading} height={400}>
        <ProgressHero
          percent={data.progressPercent}
          blockTitle={data.currentBlock.title}
          materialsDone={data.currentBlock.materialsDone}
          materialsTotal={data.currentBlock.materialsTotal}
        />
      </DashboardSkeleton>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardSkeleton loading={loading} height={120}>
            <MetricCard
              label={ru.dashboard.metricsAchievements}
              value={data.achievementsCount}
              suffix={` / ${data.achievementsTotal}`}
              icon={<Trophy size={20} />}
              delay={0.08}
              glow="primary"
            />
          </DashboardSkeleton>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardSkeleton loading={loading} height={120}>
            <MetricCard
              label={ru.dashboard.bonusBalance}
              value={data.bonusBalance}
              icon={<Gem size={20} />}
              delay={0.12}
              glow="violet"
            />
          </DashboardSkeleton>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardSkeleton loading={loading} height={120}>
            <MetricCard
              label={ru.dashboard.metricsMaterials}
              value={data.currentBlock.materialsDone}
              suffix={` / ${data.currentBlock.materialsTotal}`}
              icon={<BookOpen size={20} />}
              delay={0.16}
            />
          </DashboardSkeleton>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <DashboardSkeleton loading={loading} height={120}>
            <MetricCard
              label={ru.dashboard.metricsEvents}
              value={data.upcomingEvents.length}
              icon={<CalendarDays size={20} />}
              delay={0.2}
            />
          </DashboardSkeleton>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, xl: 8 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <DashboardSkeleton loading={loading} height={340}>
                <ActivityChart loading={loading} />
              </DashboardSkeleton>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <DashboardSkeleton loading={loading} height={340}>
                <WeeklyProgressChart />
              </DashboardSkeleton>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <DashboardSkeleton loading={loading} height={280}>
                <RoadmapDevelopmentMap />
              </DashboardSkeleton>
            </Grid>
          </Grid>
        </Grid>
        <Grid size={{ xs: 12, xl: 4 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <DashboardSkeleton loading={loading} height={320}>
                <DashboardAchievementsPanel items={data.recentAchievements} />
              </DashboardSkeleton>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <DashboardSkeleton loading={loading} height={280}>
                <DashboardEventsPanel />
              </DashboardSkeleton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}
