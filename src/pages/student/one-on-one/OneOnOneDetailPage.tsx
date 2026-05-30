import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useOneOnOneDetail } from '@/entities/student-one-on-one'
import { ru } from '@/shared/i18n/ru'
import { LoadErrorState } from '@/shared/ui/LoadErrorState'
import {
  EmptyMeetingsState,
  OneOnOneDetailCard,
  OneOnOnePageSkeleton,
} from '@/widgets/one-on-one'

export function OneOnOneDetailPage() {
  const { requestId = '' } = useParams()
  const { data, isLoading, isError, error, refetch } = useOneOnOneDetail(requestId)

  if (isLoading) {
    return (
      <Box sx={{ py: 2, maxWidth: 720, mx: 'auto', width: '100%', px: { xs: 1, sm: 0 } }}>
        <OneOnOnePageSkeleton />
      </Box>
    )
  }

  if (isError) {
    const notFound = error instanceof Error && error.message === 'not_found'
    if (notFound) {
      return (
        <Box sx={{ py: 4, maxWidth: 720, mx: 'auto', px: { xs: 1, sm: 0 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}>
            {ru.oneOnOnePage.detail.notFound}
          </Typography>
          <EmptyMeetingsState />
        </Box>
      )
    }
    return <LoadErrorState onRetry={() => void refetch()} />
  }

  if (!data?.meeting) {
    return (
      <Box sx={{ py: 4, maxWidth: 720, mx: 'auto', px: { xs: 1, sm: 0 } }}>
        <EmptyMeetingsState />
      </Box>
    )
  }

  return (
    <Box sx={{ py: 2, maxWidth: 720, mx: 'auto', width: '100%', px: { xs: 1, sm: 0 } }}>
      <OneOnOneDetailCard meeting={data.meeting} />
    </Box>
  )
}
