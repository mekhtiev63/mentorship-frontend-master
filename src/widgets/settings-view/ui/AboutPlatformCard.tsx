import { Button, Link, Stack, Typography } from '@mui/material'
import type { PlatformInfoVM } from '@/entities/user-settings/model/types'
import { ru } from '@/shared/i18n/ru'
import { brandColors } from '@/shared/theme/palette'
import { SettingsCardShell } from '@/widgets/settings-view/ui/SettingsCardShell'

type AboutPlatformCardProps = {
  info: PlatformInfoVM
}

export function AboutPlatformCard({ info }: AboutPlatformCardProps) {
  const mailto = `mailto:${info.supportEmail}`
  const tg = `https://t.me/${info.supportTelegram.replace(/^@/, '')}`

  return (
    <SettingsCardShell title={ru.settingsPage.sections.info} accent={brandColors.textSecondary}>
      <Stack spacing={2}>
        <Stack>
          <Typography variant="overline" color="text.secondary">
            {ru.settingsPage.info.version}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            v{info.version}
          </Typography>
        </Stack>
        <Stack>
          <Typography variant="overline" color="text.secondary">
            {ru.settingsPage.info.support}
          </Typography>
          <Typography variant="body1">{info.supportEmail}</Typography>
          <Typography variant="body2" color="text.secondary">
            @{info.supportTelegram.replace(/^@/, '')}
          </Typography>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
          <Button component={Link} href={mailto} variant="outlined" sx={{ textTransform: 'none' }}>
            {ru.settingsPage.info.writeSupport}
          </Button>
          <Button component={Link} href={tg} target="_blank" rel="noopener noreferrer" sx={{ textTransform: 'none' }}>
            {ru.settingsPage.info.telegramSupport}
          </Button>
        </Stack>
      </Stack>
    </SettingsCardShell>
  )
}
