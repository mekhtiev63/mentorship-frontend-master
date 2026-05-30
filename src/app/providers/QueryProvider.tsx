import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { ReactNode } from 'react'
import { defaultQueryOptions, queryStaleTimeMs } from '@/shared/lib/query-options'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: queryStaleTimeMs.short,
      retry: defaultQueryOptions.retry,
      refetchOnWindowFocus: true,
    },
    mutations: {
      retry: 0,
    },
  },
})

type QueryProviderProps = {
  children: ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export { queryClient }
