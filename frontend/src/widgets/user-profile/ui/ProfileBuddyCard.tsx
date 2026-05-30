import GroupsIcon from '@mui/icons-material/Groups'
import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import type { ProfileOverview } from '@/entities/profile-overview'
import { PanelCard } from '@/widgets/student-dashboard/ui/PanelCard'
import { ru } from '@/shared/i18n/ru'

type ProfileBuddyCardProps = {
  profile: ProfileOverview
  delay?: number
}

export function ProfileBuddyCard({ profile, delay = 0.15 }: ProfileBuddyCardProps) {
  const buddy = profile.buddy

  return (
    <PanelCard title={ru.profile.buddy} delay={delay}>
      {!buddy ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
          {ru.profile.buddyEmpty}
          <br />
          {ru.profile.buddyEmptyHint}
        </Typography>
      ) : (
        <Stack spacing={2} sx={{ alignItems: { xs: 'center', sm: 'flex-start' } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
              <GroupsIcon />
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                {buddy.displayName}
              </Typography>
              {buddy.email ? (
                <Typography variant="caption" color="text.secondary">
                  {buddy.email}
                </Typography>
              ) : null}
            </Box>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ width: '100%' }}>
            {buddy.telegram ? (
              <Button
                variant="outlined"
                size="small"
                href={`https://t.me/${buddy.telegram.replace(/^@/, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ flex: 1 }}
              >
                {ru.profile.buddyWrite}
              </Button>
            ) : null}
            <Button
              component={RouterLink}
              to="/student/one-on-one"
              variant="contained"
              size="small"
              sx={{ flex: 1 }}
            >
              {ru.profile.scheduleOneOnOne}
            </Button>
          </Stack>
        </Stack>
      )}
    </PanelCard>
  )
}
