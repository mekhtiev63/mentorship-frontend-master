import { Box, Button, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { Link as RouterLink } from 'react-router-dom'
import { CountUp } from '@/shared/ui/CountUp'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'
import { ru } from '@/shared/i18n/ru'
import { brandColors } from '@/shared/theme/palette'

type ProgressHeroProps = {
  percent: number
  blockTitle: string
  materialsDone: number
  materialsTotal: number
  loading?: boolean
}

export function ProgressHero({
  percent,
  blockTitle,
  materialsDone,
  materialsTotal,
  loading = false,
}: ProgressHeroProps) {
  const reduced = useReducedMotion()

  if (loading) {
    return null
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 4,
        minHeight: { xs: 320, md: 380 },
        p: { xs: 2.5, md: 4 },
        pr: { md: 5 },
        background: brandColors.heroGradient,
        color: brandColors.textPrimary,
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
        gap: 3,
        alignItems: 'center',
        boxShadow: '0 32px 100px rgba(37, 99, 235, 0.4)',
      }}
    >
      <Box
        component={motion.div}
        animate={{ y: [0, -10, 0], rotate: [0, 4, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        sx={{
          position: 'absolute',
          top: { xs: 16, md: 24 },
          right: { xs: 16, md: 32 },
          zIndex: 2,
          opacity: 0.92,
          pointerEvents: 'none',
          display: { xs: 'none', sm: 'block' },
        }}
      >
        <Rocket size={56} color="#F8FAFC" strokeWidth={1.5} />
      </Box>

      <Box
        sx={{
          position: 'absolute',
          width: 320,
          height: 320,
          borderRadius: '50%',
          top: -100,
          right: -60,
          background: 'rgba(255,255,255,0.06)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: 180,
          height: 180,
          borderRadius: '50%',
          bottom: -50,
          left: '10%',
          background: 'rgba(139, 92, 246, 0.35)',
          filter: 'blur(40px)',
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 560 }}>
        <Typography variant="overline" sx={{ opacity: 0.9, letterSpacing: 1.4 }}>
          {ru.dashboard.currentBlock}
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1.15, mb: 1.5 }}>
          {blockTitle}
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.9, mb: 2 }}>
          {materialsDone} / {materialsTotal} {ru.dashboard.materialsCount}
        </Typography>
        <Button
          component={RouterLink}
          to="/student/roadmap"
          variant="contained"
          size="large"
          sx={{
            fontWeight: 700,
            borderRadius: 2,
            px: 3,
            bgcolor: 'rgba(255,255,255,0.95)',
            color: '#1e3a8a',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            '&:hover': { bgcolor: '#fff' },
          }}
        >
          {ru.dashboard.continueLearning}
        </Button>
      </Box>

      <Box
        component={motion.div}
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
        sx={{
          position: 'relative',
          zIndex: 1,
          width: { xs: 180, md: 220 },
          height: { xs: 180, md: 220 },
          mx: { xs: 'auto', md: 0 },
          flexShrink: 0,
        }}
      >
        <CircularProgressbar
          value={percent}
          styles={buildStyles({
            pathColor: '#F8FAFC',
            trailColor: 'rgba(255,255,255,0.18)',
            textColor: 'transparent',
            pathTransition: reduced ? 'none' : 'stroke-dashoffset 1.4s ease 0s',
          })}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            px: 1,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 800, lineHeight: 1 }}>
            {reduced ? (
              `${percent}%`
            ) : (
              <>
                <CountUp end={percent} duration={1.3} />%
              </>
            )}
          </Typography>
          <Typography variant="caption" sx={{ opacity: 0.88, display: 'block', mt: 0.5, lineHeight: 1.3 }}>
            {ru.dashboard.programProgress}
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}
