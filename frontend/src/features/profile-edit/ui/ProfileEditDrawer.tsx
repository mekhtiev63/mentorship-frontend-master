import {
  Alert,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import type { ProfileOverview } from '@/entities/profile-overview'
import { validateProfileEdit } from '@/features/profile-edit/model/profile-edit.schema'
import type { ProfileEditFormValues } from '@/features/profile-edit/model/profile-edit.types'
import { useUpdateProfileMutation } from '@/features/profile-edit/model/useUpdateProfileMutation'
import { ru } from '@/shared/i18n/ru'

type ProfileEditDrawerProps = {
  open: boolean
  onClose: () => void
  profile: ProfileOverview
  onSaved?: () => void
}

function ProfileEditForm({
  profile,
  onClose,
  onSaved,
}: {
  profile: ProfileOverview
  onClose: () => void
  onSaved?: () => void
}) {
  const update = useUpdateProfileMutation()
  const [values, setValues] = useState<ProfileEditFormValues>({
    displayName: profile.displayName,
    bio: profile.bio,
    avatarUrl: profile.avatarUrl ?? '',
    telegram: profile.telegramUsername ?? '',
    visibility: profile.visibility || 'buddies',
  })
  const [fieldErrors, setFieldErrors] = useState<{ displayName?: string; bio?: string }>({})

  const handleSave = () => {
    const validation = validateProfileEdit(values)
    if (!validation.ok) {
      setFieldErrors({
        displayName: validation.displayName,
        bio: validation.bio,
      })
      return
    }
    setFieldErrors({})
    update.mutate(values, {
      onSuccess: () => {
        onSaved?.()
        onClose()
      },
    })
  }

  return (
    <>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
        {ru.profile.editProfile}
      </Typography>
      <Stack spacing={2}>
        <TextField
          label={ru.profile.displayName}
          value={values.displayName}
          onChange={(e) => setValues((v) => ({ ...v, displayName: e.target.value }))}
          error={Boolean(fieldErrors.displayName)}
          helperText={fieldErrors.displayName}
          fullWidth
        />
        <TextField
          label={ru.profile.bio}
          value={values.bio}
          onChange={(e) => setValues((v) => ({ ...v, bio: e.target.value }))}
          error={Boolean(fieldErrors.bio)}
          helperText={fieldErrors.bio}
          multiline
          minRows={3}
          fullWidth
        />
        <TextField
          label={ru.profile.avatarUrl}
          value={values.avatarUrl}
          onChange={(e) => setValues((v) => ({ ...v, avatarUrl: e.target.value }))}
          fullWidth
        />
        <TextField
          label={ru.profile.telegram}
          value={values.telegram}
          onChange={(e) => setValues((v) => ({ ...v, telegram: e.target.value }))}
          fullWidth
          placeholder="@username"
        />
        <FormControl fullWidth>
          <InputLabel id="profile-visibility-label">{ru.profile.visibility}</InputLabel>
          <Select
            labelId="profile-visibility-label"
            label={ru.profile.visibility}
            value={values.visibility}
            onChange={(e) => setValues((v) => ({ ...v, visibility: e.target.value }))}
          >
            <MenuItem value="public">{ru.profile.visibilityPublic}</MenuItem>
            <MenuItem value="buddies">{ru.profile.visibilityBuddies}</MenuItem>
            <MenuItem value="private">{ru.profile.visibilityPrivate}</MenuItem>
          </Select>
        </FormControl>
        {update.isError ? (
          <Alert severity="error">{ru.errors.generic}</Alert>
        ) : null}
        <Stack direction="row" spacing={1} sx={{ pt: 1, justifyContent: 'flex-end' }}>
          <Button onClick={onClose} disabled={update.isPending}>
            {ru.common.cancel}
          </Button>
          <Button variant="contained" onClick={handleSave} disabled={update.isPending}>
            {update.isPending ? '…' : ru.profile.saveProfile}
          </Button>
        </Stack>
      </Stack>
    </>
  )
}

export function ProfileEditDrawer({ open, onClose, profile, onSaved }: ProfileEditDrawerProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: { xs: '100%', sm: 400 }, p: 3 } } }}
    >
      {open ? (
        <ProfileEditForm
          key={`${profile.userId}-${profile.displayName}`}
          profile={profile}
          onClose={onClose}
          onSaved={onSaved}
        />
      ) : null}
    </Drawer>
  )
}
