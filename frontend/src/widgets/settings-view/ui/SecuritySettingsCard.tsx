import {
  Alert,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import type { ActiveSessionVM } from '@/entities/user-settings'
import { useChangePasswordMock, useRevokeAllSessionsMock } from '@/features/settings-security'
import { formatRuDateTime } from '@/shared/lib/datetime'
import { ru } from '@/shared/i18n/ru'
import { brandColors } from '@/shared/theme/palette'
import { SettingsCardShell } from '@/widgets/settings-view/ui/SettingsCardShell'
import { SettingsEmptyState } from '@/widgets/settings-view/ui/SettingsEmptyState'

type SecuritySettingsCardProps = {
  sessions: ActiveSessionVM[]
  onRevokeSuccess?: () => void
}

export function SecuritySettingsCard({ sessions: initialSessions, onRevokeSuccess }: SecuritySettingsCardProps) {
  const [sessions, setSessions] = useState(initialSessions)
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const changePassword = useChangePasswordMock()
  const revokeAll = useRevokeAllSessionsMock()

  const otherSessions = sessions.filter((s) => !s.current)

  const submitPassword = () => {
    if (next.length < 8) return
    if (next !== confirm) return
    changePassword.mutate({ currentPassword: current, newPassword: next })
  }

  const confirmRevoke = () => {
    revokeAll.mutate(undefined, {
      onSuccess: () => {
        setSessions((list) => list.filter((s) => s.current))
        setDialogOpen(false)
        onRevokeSuccess?.()
      },
    })
  }

  return (
    <SettingsCardShell title={ru.settingsPage.sections.security} accent={brandColors.secondary}>
      <Alert severity="info" sx={{ mb: 2 }}>
        {ru.settingsPage.security.passwordMockNotice}
      </Alert>

      <Stack spacing={2} sx={{ mb: 3 }}>
        <TextField
          type="password"
          label={ru.settingsPage.security.currentPassword}
          value={current}
          onChange={(e) => setCurrent(e.target.value)}
          fullWidth
          size="small"
        />
        <TextField
          type="password"
          label={ru.settingsPage.security.newPassword}
          value={next}
          onChange={(e) => setNext(e.target.value)}
          error={next.length > 0 && next.length < 8}
          helperText={next.length > 0 && next.length < 8 ? ru.settingsPage.security.passwordTooShort : ' '}
          fullWidth
          size="small"
        />
        <TextField
          type="password"
          label={ru.settingsPage.security.confirmPassword}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={confirm.length > 0 && confirm !== next}
          helperText={
            confirm.length > 0 && confirm !== next ? ru.settingsPage.security.passwordMismatch : ' '
          }
          fullWidth
          size="small"
        />
        <Button
          variant="outlined"
          onClick={submitPassword}
          disabled={changePassword.isPending}
          sx={{ alignSelf: 'flex-start', textTransform: 'none', fontWeight: 600 }}
        >
          {ru.settingsPage.security.submitPassword}
        </Button>
        {changePassword.isSuccess ? (
          <Alert severity="success">{ru.settingsPage.security.passwordSuccess}</Alert>
        ) : null}
      </Stack>

      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Chip label={ru.settingsPage.security.activeSessions} size="small" />
        <Button
          color="warning"
          size="small"
          onClick={() => setDialogOpen(true)}
          disabled={otherSessions.length === 0}
          sx={{ textTransform: 'none' }}
        >
          {ru.settingsPage.security.revokeAll}
        </Button>
      </Stack>

      {otherSessions.length === 0 ? (
        <SettingsEmptyState />
      ) : (
        <List dense disablePadding>
          {sessions.map((s) => (
            <ListItem key={s.id} disableGutters sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <ListItemText
                primary={
                  <>
                    {s.deviceLabel}{' '}
                    {s.current ? (
                      <Chip label={ru.settingsPage.security.currentSession} size="small" color="primary" />
                    ) : null}
                  </>
                }
                secondary={`${s.browser} · ${s.os} · ${formatRuDateTime(s.lastActiveAt)}`}
              />
            </ListItem>
          ))}
        </List>
      )}

      {revokeAll.isSuccess ? (
        <Alert severity="success" sx={{ mt: 2 }}>
          {ru.settingsPage.security.revokeAllSuccess}
        </Alert>
      ) : null}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>{ru.settingsPage.security.revokeAllTitle}</DialogTitle>
        <DialogContent>{ru.settingsPage.security.revokeAllBody}</DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>{ru.common.cancel}</Button>
          <Button color="warning" onClick={confirmRevoke} disabled={revokeAll.isPending}>
            {ru.settingsPage.security.revokeAllConfirm}
          </Button>
        </DialogActions>
      </Dialog>
    </SettingsCardShell>
  )
}
