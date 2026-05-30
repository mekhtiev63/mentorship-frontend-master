import { AppError } from '@/shared/api/types'
import { ru } from '@/shared/i18n/ru'

const messages: Record<string, string> = {
  invalid_credentials: ru.errors.invalidCredentials,
  account_inactive: ru.errors.accountInactive,
  invalid_role: ru.errors.invalidRole,
  active_role_not_allowed: ru.errors.activeRoleNotAllowed,
  active_role_required: ru.errors.activeRoleRequired,
  admin_only: ru.errors.adminOnly,
  missing_principal: ru.errors.missingPrincipal,
}

export function authErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return messages[error.code] ?? error.message
  }
  if (error instanceof Error) {
    return error.message
  }
  return ru.errors.generic
}
