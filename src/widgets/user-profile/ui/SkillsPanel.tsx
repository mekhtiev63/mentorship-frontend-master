import { Box, Chip, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import type { ProfileOverview, SkillChip } from '@/entities/profile-overview'
import { PanelCard } from '@/widgets/student-dashboard/ui/PanelCard'
import { ru } from '@/shared/i18n/ru'

type SkillsPanelProps = {
  profile: ProfileOverview
  delay?: number
}

function skillColor(status: SkillChip['status']): 'success' | 'primary' | 'default' {
  if (status === 'mastered') return 'success'
  if (status === 'learning') return 'primary'
  return 'default'
}

function skillLabel(status: SkillChip['status']): string {
  return ru.profile.skillStatus[status]
}

export function SkillsPanel({ profile, delay = 0.25 }: SkillsPanelProps) {
  const skills = profile.skills

  return (
    <PanelCard title={ru.profile.skills} delay={delay}>
      {skills.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
          {ru.profile.skillsEmpty}
        </Typography>
      ) : (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {skills.map((skill, index) => (
            <Box
              key={skill.id}
              component={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + index * 0.04 }}
            >
            <Chip
              label={`${skill.label} · ${skillLabel(skill.status)}`}
              color={skillColor(skill.status)}
              variant={skill.status === 'planned' ? 'outlined' : 'filled'}
              sx={{
                fontWeight: 600,
                fontSize: '0.8rem',
                px: 0.5,
                boxShadow:
                  skill.status === 'mastered'
                    ? '0 0 16px rgba(34, 197, 94, 0.25)'
                    : skill.status === 'learning'
                      ? '0 0 16px rgba(59, 130, 246, 0.2)'
                      : 'none',
              }}
            />
            </Box>
          ))}
        </Box>
      )}
    </PanelCard>
  )
}
