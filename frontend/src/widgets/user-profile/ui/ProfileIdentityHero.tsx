import GroupsIcon from '@mui/icons-material/Groups'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import { Avatar, Box, Chip, LinearProgress, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import type { ProfileOverview } from '@/entities/profile-overview'
import { CountUp } from '@/shared/ui/CountUp'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'
import { brandColors, glassSurface } from '@/shared/theme/palette'
import { ru } from '@/shared/i18n/ru'
import { ROLES } from '@/shared/lib/roles'

type ProfileIdentityHeroProps = {
  profile: ProfileOverview
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase() || 'U'
}

function formatRegistered(iso: string | null): string | null {
  if (!iso) return null
  return new Date(iso).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function ProfileIdentityHero({ profile }: ProfileIdentityHeroProps) {
  const reduced = useReducedMotion()
  const roleLabel =
    profile.activeRole === ROLES.buddy ? ru.roles.buddy : ru.roles.student
  const registered = formatRegistered(profile.registeredAt)
  const xpProgress = profile.xpToNextLevel > 0
    ? 100 - Math.round((profile.xpToNextLevel / 500) * 100)
    : 100

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      sx={{
        ...glassSurface,
        borderRadius: 4,
        p: { xs: 2.5, md: 4 },
        background: brandColors.heroGradient,
        color: '#F8FAFC',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', lg: '1fr 280px' },
        gap: { xs: 3, lg: 4 },
        alignItems: 'center',
        boxShadow: '0 24px 80px rgba(37, 99, 235, 0.35)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, alignItems: { xs: 'center', sm: 'flex-start' } }}>
        <Box sx={{ position: 'relative', width: 120, height: 120, flexShrink: 0 }}>
          <CircularProgressbar
            value={profile.programPercent}
            styles={buildStyles({
              pathColor: '#F8FAFC',
              trailColor: 'rgba(255,255,255,0.2)',
              textColor: 'transparent',
            })}
          />
          <Avatar
            src={profile.avatarUrl ?? undefined}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 88,
              height: 88,
              fontSize: '1.75rem',
              fontWeight: 800,
              bgcolor: 'secondary.main',
              border: '3px solid rgba(255,255,255,0.3)',
            }}
          >
            {initials(profile.displayName)}
          </Avatar>
        </Box>
        <Box sx={{ textAlign: { xs: 'center', sm: 'left' }, minWidth: 0 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            {profile.displayName}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: { xs: 'center', sm: 'flex-start' }, mb: 1 }}>
            <Chip
              size="small"
              icon={<EmailOutlinedIcon />}
              label={profile.email}
              sx={{ bgcolor: 'rgba(255,255,255,0.12)', color: 'inherit' }}
            />
            <Chip size="small" label={`${ru.profile.role}: ${roleLabel}`} sx={{ bgcolor: 'rgba(255,255,255,0.12)', color: 'inherit' }} />
          </Box>
          {registered ? (
            <Typography variant="caption" sx={{ opacity: 0.85, display: 'block', mb: 1 }}>
              {ru.profile.registeredAt} {registered}
            </Typography>
          ) : null}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            <GroupsIcon fontSize="small" sx={{ opacity: 0.9 }} />
            <Typography variant="body2" sx={{ opacity: 0.92 }}>
              {ru.profile.buddy}:{' '}
              <strong>{profile.buddy?.displayName ?? ru.profile.buddyEmpty}</strong>
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        sx={{
          p: 2.5,
          borderRadius: 3,
          bgcolor: 'rgba(0,0,0,0.2)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Typography variant="overline" sx={{ opacity: 0.85 }}>
          {ru.gamification.yourLevel} {profile.level}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          {profile.levelTitle}
        </Typography>
        <Typography variant="caption" sx={{ display: 'block', mb: 0.5, opacity: 0.85 }}>
          {ru.gamification.xpLabel}:{' '}
          {reduced ? profile.xp : <CountUp end={profile.xp} duration={1.2} />}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={Math.min(100, xpProgress)}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: 'rgba(255,255,255,0.15)',
            '& .MuiLinearProgress-bar': { bgcolor: '#C4B5FD', borderRadius: 4 },
          }}
        />
        <Typography variant="caption" sx={{ mt: 0.75, display: 'block', opacity: 0.75 }}>
          {ru.profile.statsProgramPercent}: {profile.programPercent}%
        </Typography>
      </Box>
    </Box>
  )
}
