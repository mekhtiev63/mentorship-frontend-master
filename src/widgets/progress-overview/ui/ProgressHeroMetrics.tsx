import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import { Box, Chip, LinearProgress, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import type { StudentProgressPageVM } from '@/entities/student-progress'
import { CountUp } from '@/shared/ui/CountUp'
import { ru } from '@/shared/i18n/ru'
import { brandColors, glassSurface } from '@/shared/theme/palette'

type ProgressHeroMetricsProps = {
  vm: StudentProgressPageVM
}

export function ProgressHeroMetrics({ vm }: ProgressHeroMetricsProps) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{ ...glassSurface, p: 3, borderRadius: 3, boxShadow: brandColors.neonBlue }}
    >
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ alignItems: { md: 'center' } }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="overline" color="text.secondary">
            {ru.progressPage.hero.programLabel}
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
            <CountUp end={vm.programPercent} suffix="%" />
          </Typography>
          <LinearProgress
            variant="determinate"
            value={vm.programPercent}
            sx={{
              height: 10,
              borderRadius: 5,
              bgcolor: 'rgba(255,255,255,0.06)',
              '& .MuiLinearProgress-bar': { background: brandColors.heroGradient, borderRadius: 5 },
            }}
          />
        </Box>
        <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
          <Chip
            label={`${ru.progressPage.hero.levelLabel}: ${vm.level} · ${vm.levelTitle}`}
            color="primary"
            variant="outlined"
          />
          <Chip
            icon={<LocalFireDepartmentIcon />}
            label={`${ru.progressPage.hero.streakLabel}: ${vm.streakDays} ${ru.progressPage.achievements.days}`}
            sx={{ borderColor: 'rgba(245, 158, 11, 0.5)' }}
          />
        </Stack>
      </Stack>
    </Box>
  )
}
