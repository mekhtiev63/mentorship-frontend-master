import { AppThemeProvider } from '@/app/providers/ThemeProvider'
import { QueryProvider } from '@/app/providers/QueryProvider'
import { AuthProvider } from '@/app/providers/AuthProvider'
import { RoleProvider } from '@/app/providers/RoleProvider'
import { MotionProvider } from '@/app/providers/MotionProvider'
import { ErrorBoundary } from '@/shared/ui'
import type { ReactNode } from 'react'

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ErrorBoundary>
      <QueryProvider>
        <AppThemeProvider>
          <AuthProvider>
            <RoleProvider>
              <MotionProvider>{children}</MotionProvider>
            </RoleProvider>
          </AuthProvider>
        </AppThemeProvider>
      </QueryProvider>
    </ErrorBoundary>
  )
}
