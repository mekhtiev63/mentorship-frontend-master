import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { roadmapJourneySteps } from '@/widgets/roadmap/model/roadmap-journey-mock'
import { brandColors, glassSurface } from '@/shared/theme/palette'
import { ru } from '@/shared/i18n/ru'

export function RoadmapJourney() {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{
        ...glassSurface,
        p: { xs: 2, md: 3 },
        borderRadius: 3,
        maxWidth: 420,
        mx: 'auto',
      }}
    >
      <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 1.2 }}>
        {ru.roadmap.yourPath}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        {ru.roadmap.developmentMap}
      </Typography>

      {roadmapJourneySteps.map((step, index) => {
        const isLast = index === roadmapJourneySteps.length - 1
        const completed = step.status === 'completed'
        const active = step.status === 'active'

        return (
          <Box key={step.id} sx={{ display: 'flex', gap: 2, position: 'relative' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Box
                component={motion.div}
                animate={
                  active
                    ? {
                        boxShadow: [
                          '0 0 0 0 rgba(59,130,246,0.4)',
                          '0 0 0 12px rgba(59,130,246,0)',
                        ],
                      }
                    : undefined
                }
                transition={active ? { duration: 2, repeat: Infinity } : undefined}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  display: 'grid',
                  placeItems: 'center',
                  bgcolor: completed
                    ? brandColors.success
                    : active
                      ? brandColors.primary
                      : 'rgba(255,255,255,0.06)',
                  border: active ? `2px solid ${brandColors.secondary}` : 'none',
                }}
              >
                {completed ? (
                  <CheckCircleIcon sx={{ color: '#0F172A', fontSize: 22 }} />
                ) : (
                  <RadioButtonUncheckedIcon
                    sx={{
                      color: active ? 'common.white' : 'text.disabled',
                      fontSize: 20,
                    }}
                  />
                )}
              </Box>
              {!isLast ? (
                <Box
                  sx={{
                    width: 2,
                    flex: 1,
                    minHeight: 36,
                    my: 0.5,
                    borderRadius: 1,
                    background: completed
                      ? `linear-gradient(180deg, ${brandColors.success}, ${brandColors.primary})`
                      : 'rgba(148, 163, 184, 0.25)',
                  }}
                />
              ) : null}
            </Box>
            <Box sx={{ pb: isLast ? 0 : 2.5, pt: 0.75 }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: active ? 700 : 600,
                  color: completed
                    ? 'success.light'
                    : active
                      ? 'primary.light'
                      : 'text.secondary',
                }}
              >
                {step.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {completed
                  ? ru.roadmap.stepCompleted
                  : active
                    ? ru.roadmap.stepInProgress
                    : ru.roadmap.stepLocked}
              </Typography>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}
