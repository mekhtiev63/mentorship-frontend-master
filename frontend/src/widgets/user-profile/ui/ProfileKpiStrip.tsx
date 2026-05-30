import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import WalletIcon from '@mui/icons-material/Wallet'
import { Grid } from '@mui/material'
import type { ProfileOverview } from '@/entities/profile-overview'
import { MetricCard } from '@/widgets/student-dashboard/ui/MetricCard'
import { ru } from '@/shared/i18n/ru'

type ProfileKpiStripProps = {
  profile: ProfileOverview
}

export function ProfileKpiStrip({ profile }: ProfileKpiStripProps) {
  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      <Grid size={{ xs: 6, md: 3 }}>
        <MetricCard
          label={ru.profile.statsAchievements}
          value={profile.achievementsUnlocked}
          suffix={` / ${profile.achievementsTotal}`}
          icon={<EmojiEventsIcon />}
          delay={0.05}
          glow="primary"
        />
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <MetricCard
          label={ru.profile.statsBonuses}
          value={profile.bonusBalance}
          icon={<WalletIcon />}
          delay={0.1}
          glow="violet"
        />
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <MetricCard
          label={ru.profile.statsMaterials}
          value={profile.materialsDone}
          suffix={` / ${profile.materialsTotal}`}
          icon={<MenuBookIcon />}
          delay={0.15}
        />
      </Grid>
      <Grid size={{ xs: 6, md: 3 }}>
        <MetricCard
          label={ru.profile.statsProgramPercent}
          value={profile.programPercent}
          suffix="%"
          icon={<TrendingUpIcon />}
          delay={0.2}
          glow="primary"
        />
      </Grid>
    </Grid>
  )
}
