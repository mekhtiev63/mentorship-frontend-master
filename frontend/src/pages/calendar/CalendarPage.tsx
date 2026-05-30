import { Box } from '@mui/material'
import { useCalendarPage } from '@/entities/student-calendar'
import { useCalendarViewState } from '@/features/calendar-events'
import { LoadErrorState } from '@/shared/ui/LoadErrorState'
import {
  CalendarEmptyState,
  CalendarPageSkeleton,
  CalendarScreen,
} from '@/widgets/calendar-view'

export function CalendarPage() {
  const viewState = useCalendarViewState()
  const { view, anchorDate, filter, search } = viewState

  const { data, isLoading, isError, refetch } = useCalendarPage({
    anchorDate,
    view,
    filter,
    search,
  })

  if (isLoading) {
    return (
      <Box sx={{ py: 2, maxWidth: 1280, mx: 'auto', width: '100%' }}>
        <CalendarPageSkeleton />
      </Box>
    )
  }

  if (isError || !data) {
    if (isError) return <LoadErrorState onRetry={() => void refetch()} />
    return (
      <Box sx={{ py: 4, maxWidth: 1280, mx: 'auto', width: '100%' }}>
        <CalendarEmptyState />
      </Box>
    )
  }

  return (
    <Box sx={{ py: 2, maxWidth: 1280, mx: 'auto', width: '100%' }}>
      <CalendarScreen vm={data} viewState={viewState} />
    </Box>
  )
}
