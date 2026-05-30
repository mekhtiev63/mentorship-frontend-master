import { Box, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useInterviewMockDetail } from '@/entities/student-interviews'
import { ru } from '@/shared/i18n/ru'
import { LoadErrorState } from '@/shared/ui/LoadErrorState'
import {
  EmptyInterviewsState,
  InterviewDetailCard,
  InterviewsPageSkeleton,
} from '@/widgets/student-interviews'

export function InterviewMockDetailPage() {
  const { interviewId = '' } = useParams()
  const { data, isLoading, isError, error, refetch } = useInterviewMockDetail(interviewId)

  if (isLoading) {
    return (
      <Box sx={{ py: 2, maxWidth: 720, mx: 'auto', width: '100%', px: { xs: 1, sm: 0 } }}>
        <InterviewsPageSkeleton />
      </Box>
    )
  }

  if (isError) {
    const notFound = error instanceof Error && error.message === 'not_found'
    if (notFound) {
      return (
        <Box sx={{ py: 4, maxWidth: 720, mx: 'auto', px: { xs: 1, sm: 0 } }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, textAlign: 'center' }}>
            {ru.interviewsPage.detail.notFound}
          </Typography>
          <EmptyInterviewsState />
        </Box>
      )
    }
    return <LoadErrorState onRetry={() => void refetch()} />
  }

  if (!data) {
    return (
      <Box sx={{ py: 4, maxWidth: 720, mx: 'auto', px: { xs: 1, sm: 0 } }}>
        <EmptyInterviewsState />
      </Box>
    )
  }

  return (
    <Box sx={{ py: 2, maxWidth: 720, mx: 'auto', width: '100%', px: { xs: 1, sm: 0 } }}>
      <InterviewDetailCard interview={data} />
    </Box>
  )
}
