import { Alert, Avatar, Button, Stack, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import type { SettingsAccountVM } from '@/entities/user-settings'
import { useSaveAccountSettings } from '@/features/settings-account'
import { ru } from '@/shared/i18n/ru'
import { brandColors } from '@/shared/theme/palette'
import { ROLES } from '@/shared/lib/roles'
import type { AppRole } from '@/shared/lib/roles'
import { SettingsCardShell } from '@/widgets/settings-view/ui/SettingsCardShell'

type AccountSettingsCardProps = {
  account: SettingsAccountVM
  role: AppRole
  onSaved?: () => void
  mockFallback?: boolean
}

export function AccountSettingsCard({ account, role, onSaved, mockFallback }: AccountSettingsCardProps) {
  const save = useSaveAccountSettings(role)
  const [displayName, setDisplayName] = useState(account.displayName)
  const [telegram, setTelegram] = useState(account.telegram)
  const [avatarUrl, setAvatarUrl] = useState(account.avatarUrl ?? '')

  useEffect(() => {
    setDisplayName(account.displayName)
    setTelegram(account.telegram)
    setAvatarUrl(account.avatarUrl ?? '')
  }, [account])

  const profilePath = role === ROLES.buddy ? '/buddy/students' : '/student/profile'

  const handleSave = () => {
    save.mutate(
      { displayName, telegram, avatarUrl },
      {
        onSuccess: () => onSaved?.(),
      },
    )
  }

  return (
    <SettingsCardShell title={ru.settingsPage.sections.account} accent={brandColors.primary}>
      {mockFallback ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          {ru.settingsPage.mockBanner}
        </Alert>
      ) : null}
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Avatar src={avatarUrl || undefined} sx={{ width: 64, height: 64 }}>
            {displayName.slice(0, 1)}
          </Avatar>
          <TextField
            label={ru.settingsPage.account.avatarUrl}
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            fullWidth
            size="small"
          />
        </Stack>
        <TextField
          label={ru.settingsPage.account.displayName}
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          fullWidth
        />
        <TextField
          label={ru.settingsPage.account.email}
          value={account.email}
          disabled
          helperText={ru.settingsPage.account.emailHint}
          fullWidth
        />
        <TextField
          label={ru.settingsPage.account.telegram}
          value={telegram}
          onChange={(e) => setTelegram(e.target.value)}
          fullWidth
          placeholder="@username"
        />
        {save.isError ? <Alert severity="error">{ru.settingsPage.saveError}</Alert> : null}
        {save.isSuccess ? (
          <Alert severity="success">
            {mockFallback ? ru.settingsPage.account.mockSave : ru.settingsPage.saved}
          </Alert>
        ) : null}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
          <Button
            variant="contained"
            onClick={handleSave}
            disabled={save.isPending}
            sx={{ textTransform: 'none', fontWeight: 700 }}
          >
            {ru.settingsPage.account.save}
          </Button>
          {role === ROLES.student ? (
            <Button component={RouterLink} to={profilePath} sx={{ textTransform: 'none' }}>
              {ru.settingsPage.account.profileLink}
            </Button>
          ) : null}
        </Stack>
      </Stack>
    </SettingsCardShell>
  )
}
