import EditIcon from '@mui/icons-material/Edit'
import { Alert, Box, Button, Grid, Snackbar, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useProfileOverview } from '@/entities/profile-overview'
import { ProfileEditDrawer } from '@/features/profile-edit'
import { LoadErrorState } from '@/shared/ui/LoadErrorState'
import { ru } from '@/shared/i18n/ru'
import { AboutMePanel } from '@/widgets/user-profile/ui/AboutMePanel'
import { LearningActivityPanel } from '@/widgets/user-profile/ui/LearningActivityPanel'
import { ProfileBuddyCard } from '@/widgets/user-profile/ui/ProfileBuddyCard'
import { ProfileIdentityHero } from '@/widgets/user-profile/ui/ProfileIdentityHero'
import { ProfileKpiStrip } from '@/widgets/user-profile/ui/ProfileKpiStrip'
import { ProfilePageSkeleton } from '@/widgets/user-profile/ui/ProfilePageSkeleton'
import { RecentAchievementsPanel } from '@/widgets/user-profile/ui/RecentAchievementsPanel'
import { SkillsPanel } from '@/widgets/user-profile/ui/SkillsPanel'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
}

export function UserProfileView() {
  const { data, isLoading, isError, refetch } = useProfileOverview()
  const [editOpen, setEditOpen] = useState(false)
  const [snackOpen, setSnackOpen] = useState(false)

  if (isLoading) {
    return <ProfilePageSkeleton />
  }

  if (isError || !data) {
    return <LoadErrorState onRetry={() => void refetch()} />
  }

  return (
    <Box component={motion.div} variants={container} initial="hidden" animate="show">
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'stretch', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {ru.profile.pageTitle}
          </Typography>
          <Typography color="text.secondary">{ru.profile.pageSubtitle}</Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => setEditOpen(true)}
          sx={{ alignSelf: { xs: 'stretch', sm: 'center' } }}
        >
          {ru.profile.editProfile}
        </Button>
      </Box>

      <ProfileIdentityHero profile={data} />
      <ProfileKpiStrip profile={data} />

      <Grid container spacing={2} sx={{ mt: 1 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <AboutMePanel profile={data} />
          <Box sx={{ mt: 2 }}>
            <SkillsPanel profile={data} />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <ProfileBuddyCard profile={data} />
          <Box sx={{ mt: 2 }}>
            <RecentAchievementsPanel profile={data} />
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <LearningActivityPanel profile={data} />
        </Grid>
      </Grid>

      <ProfileEditDrawer
        open={editOpen}
        onClose={() => setEditOpen(false)}
        profile={data}
        onSaved={() => setSnackOpen(true)}
      />

      <Snackbar
        open={snackOpen}
        autoHideDuration={4000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSnackOpen(false)}>
          {ru.profile.saved}
        </Alert>
      </Snackbar>
    </Box>
  )
}
