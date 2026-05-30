import { Alert, FormControlLabel, Stack, Switch, Typography } from '@mui/material'
import { useNotificationPrefs } from '@/features/settings-notifications'
import { ru } from '@/shared/i18n/ru'
import { brandColors } from '@/shared/theme/palette'
import { SettingsCardShell } from '@/widgets/settings-view/ui/SettingsCardShell'

export function NotificationSettingsCard() {
  const {
    emailEnabled,
    telegramEnabled,
    inAppEnabled,
    setEmailEnabled,
    setTelegramEnabled,
    setInAppEnabled,
  } = useNotificationPrefs()

  return (
    <SettingsCardShell title={ru.settingsPage.sections.notifications} accent={brandColors.warning}>
      <Alert severity="info" sx={{ mb: 2 }}>
        {ru.settingsPage.notificationsLocalBanner}
      </Alert>
      <Stack spacing={1}>
        <FormControlLabel
          control={<Switch checked={emailEnabled} onChange={(_, v) => setEmailEnabled(v)} />}
          label={
            <Stack>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {ru.settingsPage.notifications.email}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {ru.settingsPage.notifications.emailHint}
              </Typography>
            </Stack>
          }
        />
        <FormControlLabel
          control={<Switch checked={telegramEnabled} onChange={(_, v) => setTelegramEnabled(v)} />}
          label={
            <Stack>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {ru.settingsPage.notifications.telegram}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {ru.settingsPage.notifications.telegramHint}
              </Typography>
            </Stack>
          }
        />
        <FormControlLabel
          control={<Switch checked={inAppEnabled} onChange={(_, v) => setInAppEnabled(v)} />}
          label={
            <Stack>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {ru.settingsPage.notifications.inApp}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {ru.settingsPage.notifications.inAppHint}
              </Typography>
            </Stack>
          }
        />
      </Stack>
    </SettingsCardShell>
  )
}
