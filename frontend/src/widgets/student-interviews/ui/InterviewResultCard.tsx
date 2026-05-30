import { Box, Grid, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import type { ResultsSummaryVM } from '@/entities/student-interviews'
import { ru } from '@/shared/i18n/ru'
import { brandColors, glassSurface, motionCardHover } from '@/shared/theme/palette'

type InterviewResultCardProps = {
  summary: ResultsSummaryVM
}

function KpiCard({
  label,
  value,
  accent,
  delay,
}: {
  label: string
  value: string
  accent: string
  delay: number
}) {
  return (
    <Grid size={{ xs: 6, md: 3 }}>
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        whileHover={motionCardHover}
        sx={{
          ...glassSurface,
          p: 2,
          borderRadius: 3,
          borderLeft: `4px solid ${accent}`,
          height: '100%',
        }}
      >
        <Typography variant="overline" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5 }}>
          {value}
        </Typography>
      </Box>
    </Grid>
  )
}

export function InterviewResultCard({ summary }: InterviewResultCardProps) {
  const avg =
    summary.averageScore != null
      ? `${summary.averageScore.toFixed(1)} ${ru.interviewsPage.results.scoreOf} ${10}`
      : '—'

  return (
    <Box>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 0.5 }}>
        {ru.interviewsPage.results.title}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2 }}>
        {ru.interviewsPage.results.caption}
      </Typography>
      <Grid container spacing={2}>
        <KpiCard label={ru.interviewsPage.results.averageScore} value={avg} accent={brandColors.primary} delay={0} />
        <KpiCard
          label={ru.interviewsPage.results.completed}
          value={String(summary.completedCount)}
          accent={brandColors.success}
          delay={0.05}
        />
        <KpiCard
          label={ru.interviewsPage.results.awaiting}
          value={String(summary.awaitingCount)}
          accent={brandColors.warning}
          delay={0.1}
        />
        <KpiCard
          label={ru.interviewsPage.results.lastRealOutcome}
          value={summary.lastOutcomeLabel}
          accent={brandColors.secondary}
          delay={0.15}
        />
      </Grid>
    </Box>
  )
}
