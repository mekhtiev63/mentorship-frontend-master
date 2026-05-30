import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import { Box, Button, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import type { StudentProgressPageVM } from '@/entities/student-progress'
import { ru } from '@/shared/i18n/ru'
import { brandColors, glassSurface } from '@/shared/theme/palette'

type ProgressMotivationCardProps = {
  vm: StudentProgressPageVM
}

export function ProgressMotivationCard({ vm }: ProgressMotivationCardProps) {
  const m = vm.motivation

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45 }}
      sx={{
        ...glassSurface,
        p: 3,
        borderRadius: 3,
        background: `linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(124, 58, 237, 0.12) 100%)`,
        boxShadow: brandColors.neonViolet,
      }}
    >
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ alignItems: { md: 'center' } }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="overline" color="text.secondary">
            {ru.progressPage.motivation.title}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5, mb: 1 }}>
            {m.currentGoalTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {ru.progressPage.motivation.milestone}: {m.nextMilestoneTitle}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
            {m.nextMilestoneHint}
          </Typography>
        </Box>
        <Button
          component={RouterLink}
          to={m.currentGoalHref}
          variant="contained"
          size="large"
          startIcon={<RocketLaunchIcon />}
        >
          {ru.progressPage.motivation.continue}
        </Button>
      </Stack>
    </Box>
  )
}
