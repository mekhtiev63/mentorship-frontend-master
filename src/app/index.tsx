import { RouterProvider } from 'react-router-dom'
import { AppProviders } from '@/app/providers/AppProviders'
import { router } from '@/app/routes/router'
import { setupApiInterceptors } from '@/shared/api'

setupApiInterceptors()

export function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  )
}
