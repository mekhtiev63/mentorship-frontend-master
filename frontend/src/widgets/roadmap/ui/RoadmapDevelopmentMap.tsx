import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { roadmapJourneySteps } from '@/widgets/roadmap/model/roadmap-journey-mock'
import { ru } from '@/shared/i18n/ru'
import { brandColors, glassSurface } from '@/shared/theme/palette'

const NODE_SIZE = 48
const CONNECTOR_HEIGHT = 4

function StepNode({
  index,
  title,
  completed,
  active,
}: {
  index: number
  title: string
  completed: boolean
  active: boolean
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: '0 0 auto',
        width: { xs: '100%', sm: 104 },
        maxWidth: { sm: 120 },
        px: 0.5,
      }}
    >
      <Box
        component={motion.div}
        animate={
          active
            ? {
                boxShadow: [
                  '0 0 0 0 rgba(59,130,246,0.5)',
                  '0 0 0 14px rgba(59,130,246,0)',
                ],
              }
            : undefined
        }
        transition={active ? { duration: 2, repeat: Infinity } : undefined}
        sx={{
          width: NODE_SIZE,
          height: NODE_SIZE,
          borderRadius: '50%',
          display: 'grid',
          placeItems: 'center',
          flexShrink: 0,
          bgcolor: completed
            ? brandColors.success
            : active
              ? brandColors.primary
              : 'rgba(148, 163, 184, 0.15)',
          border: active ? `2px solid ${brandColors.secondary}` : '1px solid rgba(255,255,255,0.08)',
          boxShadow: active ? brandColors.neonBlue : completed ? '0 0 20px rgba(34,197,94,0.35)' : 'none',
        }}
      >
        {completed ? (
          <Check size={22} color="#050816" strokeWidth={3} />
        ) : (
          <Typography variant="caption" sx={{ fontWeight: 800, color: active ? '#fff' : 'text.disabled' }}>
            {index + 1}
          </Typography>
        )}
      </Box>
      <Typography
        variant="caption"
        sx={{
          mt: 1.5,
          textAlign: 'center',
          width: '100%',
          fontWeight: active ? 700 : 500,
          color: completed ? 'success.light' : active ? 'primary.light' : 'text.secondary',
          lineHeight: 1.35,
          minHeight: 40,
          overflow: 'visible',
          wordBreak: 'break-word',
          hyphens: 'auto',
        }}
      >
        {title}
      </Typography>
    </Box>
  )
}

function Connector({ completed }: { completed: boolean }) {
  return (
    <Box
      sx={{
        flex: '1 1 20px',
        minWidth: 12,
        height: CONNECTOR_HEIGHT,
        alignSelf: 'flex-start',
        mt: `${NODE_SIZE / 2 - CONNECTOR_HEIGHT / 2}px`,
        borderRadius: 2,
        background: completed
          ? `linear-gradient(90deg, ${brandColors.success}, ${brandColors.primary})`
          : 'rgba(148, 163, 184, 0.25)',
      }}
    />
  )
}

export function RoadmapDevelopmentMap() {
  const theme = useTheme()
  const horizontal = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        ...glassSurface,
        p: { xs: 2, md: 3 },
        pt: { xs: 2.5, md: 3.5 },
        borderRadius: 3,
        border: '1px solid rgba(59, 130, 246, 0.15)',
        boxShadow: '0 0 48px rgba(59, 130, 246, 0.08)',
        overflow: 'visible',
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 800, mb: { xs: 2, md: 3 } }}>
        {ru.dashboard.roadmapBlockTitle}
      </Typography>

      {horizontal ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            width: '100%',
            overflowX: 'auto',
            overflowY: 'visible',
            pb: 2,
            pt: 0.5,
            gap: 0,
          }}
        >
          {roadmapJourneySteps.map((step, index) => {
            const completed = step.status === 'completed'
            const active = step.status === 'active'
            const isLast = index === roadmapJourneySteps.length - 1

            return (
              <Box key={step.id} sx={{ display: 'flex', alignItems: 'flex-start', flex: isLast ? '0 0 auto' : '1 1 0', minWidth: 0 }}>
                <StepNode
                  index={index}
                  title={step.title}
                  completed={completed}
                  active={active}
                />
                {!isLast ? <Connector completed={completed} /> : null}
              </Box>
            )
          })}
        </Box>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', pt: 0.5 }}>
          {roadmapJourneySteps.map((step, index) => {
            const completed = step.status === 'completed'
            const active = step.status === 'active'
            const isLast = index === roadmapJourneySteps.length - 1

            return (
              <Box key={step.id} sx={{ display: 'flex', alignItems: 'stretch', gap: 2 }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: NODE_SIZE,
                    flexShrink: 0,
                  }}
                >
                  <Box
                    sx={{
                      width: NODE_SIZE,
                      height: NODE_SIZE,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      bgcolor: completed
                        ? brandColors.success
                        : active
                          ? brandColors.primary
                          : 'rgba(148, 163, 184, 0.15)',
                      border: active ? `2px solid ${brandColors.secondary}` : '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {completed ? (
                      <Check size={22} color="#050816" strokeWidth={3} />
                    ) : (
                      <Typography variant="caption" sx={{ fontWeight: 800 }}>
                        {index + 1}
                      </Typography>
                    )}
                  </Box>
                  {!isLast ? (
                    <Box
                      sx={{
                        width: 2,
                        flex: 1,
                        minHeight: 28,
                        my: 0.5,
                        bgcolor: completed ? brandColors.success : 'rgba(148, 163, 184, 0.25)',
                      }}
                    />
                  ) : null}
                </Box>
                <Box sx={{ pb: isLast ? 0 : 2.5, pt: 1.25, flex: 1, minWidth: 0 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: active ? 700 : 600, lineHeight: 1.35 }}>
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
      )}
    </Box>
  )
}
