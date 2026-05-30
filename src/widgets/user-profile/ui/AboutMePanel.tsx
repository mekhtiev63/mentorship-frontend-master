import { Typography } from '@mui/material'
import type { ProfileOverview } from '@/entities/profile-overview'
import { PanelCard } from '@/widgets/student-dashboard/ui/PanelCard'
import { ru } from '@/shared/i18n/ru'

type AboutMePanelProps = {
  profile: ProfileOverview
  delay?: number
}

export function AboutMePanel({ profile, delay = 0.2 }: AboutMePanelProps) {
  const text = profile.bio?.trim()

  return (
    <PanelCard title={ru.profile.aboutMe} delay={delay}>
      {text ? (
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {text}
        </Typography>
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
          {ru.profile.aboutEmpty}
        </Typography>
      )}
    </PanelCard>
  )
}
