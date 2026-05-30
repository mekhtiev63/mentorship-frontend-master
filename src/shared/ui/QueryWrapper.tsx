import { Box } from '@mui/material'
import type { ReactNode } from 'react'
import { EmptyState } from '@/shared/ui/EmptyState'
import { LoadErrorState } from '@/shared/ui/LoadErrorState'
import { LoadingSkeleton } from '@/shared/ui/LoadingSkeleton'
import { ru } from '@/shared/i18n/ru'

type QueryWrapperProps = {
  isLoading: boolean
  isError: boolean
  errorMessage?: string
  isEmpty?: boolean
  emptyTitle?: string
  children: ReactNode
}

export function QueryWrapper({
  isLoading,
  isError,
  errorMessage,
  isEmpty,
  emptyTitle = ru.errors.noData,
  children,
}: QueryWrapperProps) {
  if (isLoading) {
    return <LoadingSkeleton />
  }
  if (isError) {
    return <LoadErrorState message={errorMessage ?? ru.errors.failedToLoad} />
  }
  if (isEmpty) {
    return <EmptyState title={emptyTitle} />
  }
  return <Box>{children}</Box>
}
