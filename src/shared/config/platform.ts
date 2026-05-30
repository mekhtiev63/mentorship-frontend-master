/** Версия платформы для экрана «О платформе». */
export const PLATFORM_VERSION = import.meta.env.VITE_APP_VERSION ?? '0.0.0'

export const PLATFORM_SUPPORT = {
  email: 'support@go-mentorship.example',
  telegram: 'go_mentorship_support',
} as const
