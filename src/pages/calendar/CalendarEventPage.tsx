import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useCalendarEventDetail } from '@/entities/student-calendar'
import { LoadErrorState } from '@/shared/ui/LoadErrorState'
import {
  CalendarEmptyState,
  CalendarEventDetailCard,
  CalendarPageSkeleton,
} from '@/widgets/calendar-view'

export function CalendarEventPage() {
  const { eventId = '' } = useParams()
  const { data, isLoading, isError, error, refetch } = useCalendarEventDetail(eventId)

  if (isLoading) {
    return (
      <Box sx={{ py: 2, maxWidth: 720, mx: 'auto', width: '100%' }}>
        <CalendarPageSkeleton />
      </Box>
    )
  }

  if (isError) {
    const notFound = error instanceof Error && error.message === 'not_found'
    if (notFound) {
      return (
        <Box sx={{ py: 4, maxWidth: 720, mx: 'auto' }}>
          <CalendarEmptyState />
        </Box>
      )
    }
    return <LoadErrorState onRetry={() => void refetch()} />
  }

  if (!data?.event) {
    return (
      <Box sx={{ py: 4, maxWidth: 720, mx: 'auto' }}>
        <CalendarEmptyState />
      </Box>
    )
  }

  return (
    <Box sx={{ py: 2, maxWidth: 720, mx: 'auto', width: '100%' }}>
      <CalendarEventDetailCard event={data.event} />
    </Box>
  )
}
