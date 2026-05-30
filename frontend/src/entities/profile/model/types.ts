export type ProfileDto = {
  user_id: string
  display_name: string
  bio: string
  avatar_url: string | null
  telegram_username: string | null
  visibility: string
}

export type UpdateProfilePayload = {
  display_name?: string
  bio?: string
  avatar_url?: string | null
  telegram_username?: string | null
  visibility?: string
}
