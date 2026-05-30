export const ROLES = {
  student: 'student',
  buddy: 'buddy',
  admin: 'admin',
} as const

export type AppRole = (typeof ROLES)[keyof typeof ROLES]

export const FRONTEND_ROLES: AppRole[] = [ROLES.student, ROLES.buddy]

export function isFrontendRole(role: string): role is AppRole {
  return role === ROLES.student || role === ROLES.buddy
}

export function roleHomePath(role: AppRole): string {
  return role === ROLES.buddy ? '/buddy/students' : '/student'
}
