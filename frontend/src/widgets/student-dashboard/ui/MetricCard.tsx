import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { CountUp } from '@/shared/ui/CountUp'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'
import { brandColors, glassSurface, motionCardHover } from '@/shared/theme/palette'

type MetricCardProps = {
  label: string
  value: number
  suffix?: string
  prefix?: string
  icon: ReactNode
  delay?: number
  decimals?: number
  glow?: 'primary' | 'violet'
}

export function MetricCard({
  label,
  value,
  suffix = '',
  prefix = '',
  icon,
  delay = 0,
  decimals = 0,
  glow,
}: MetricCardProps) {
  const reduced = useReducedMotion()

  const hoverShadow =
    glow === 'violet'
      ? brandColors.neonViolet
      : glow === 'primary'
        ? brandColors.neonBlue
        : '0 16px 48px rgba(0, 0, 0, 0.35)'

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
      whileHover={motionCardHover}
      sx={{
        ...glassSurface,
        p: 2.5,
        borderRadius: 2,
        height: '100%',
        bgcolor: brandColors.card,
        cursor: 'default',
        transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
        '&:hover': {
          boxShadow: hoverShadow,
          borderColor: glow ? 'rgba(59, 130, 246, 0.35)' : 'rgba(255,255,255,0.12)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
        <Box
          sx={{
            color: 'primary.light',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 44,
            height: 44,
            borderRadius: 2,
            background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))',
            boxShadow: glow ? hoverShadow : 'none',
          }}
        >
          {icon}
        </Box>
      </Box>
      <Typography variant="h4" component="p" sx={{ fontWeight: 800 }}>
        {prefix}
        {reduced ? value : <CountUp end={value} duration={1.2} decimals={decimals} useEasing />}
        {suffix}
      </Typography>
    </Box>
  )
}
