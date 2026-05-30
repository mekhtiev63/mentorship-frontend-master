import { createContext, useContext, type ReactNode } from 'react'
import { useAuthBootstrap } from '@/features/auth-bootstrap/model/useAuthBootstrap'

type AuthContextValue = {
  isBootstrapping: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextValue>({
  isBootstrapping: true,
  isAuthenticated: false,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isBootstrapping, isAuthenticated } = useAuthBootstrap()

  return (
    <AuthContext.Provider value={{ isBootstrapping, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  return useContext(AuthContext)
}
