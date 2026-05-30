import type { ProfileEditFormValues } from '@/features/profile-edit/model/profile-edit.types'

export type ProfileEditValidation = {
  ok: true
} | {
  ok: false
  displayName?: string
  bio?: string
}

export function validateProfileEdit(values: ProfileEditFormValues): ProfileEditValidation {
  const displayName = values.displayName.trim()
  if (displayName.length < 2) {
    return { ok: false, displayName: 'Имя должно быть не короче 2 символов' }
  }
  if (displayName.length > 80) {
    return { ok: false, displayName: 'Слишком длинное имя' }
  }
  if (values.bio.length > 2000) {
    return { ok: false, bio: 'Не более 2000 символов' }
  }
  return { ok: true }
}
