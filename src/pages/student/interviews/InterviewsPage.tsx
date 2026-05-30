import { Box } from '@mui/material'
import { useInterviewsPage } from '@/entities/student-interviews'
import { useInterviewFilters } from '@/features/interview-filters'
import { LoadErrorState } from '@/shared/ui/LoadErrorState'
import { InterviewsPageSkeleton, InterviewsScreen } from '@/widgets/student-interviews'

export function InterviewsPage() {
  const filters = useInterviewFilters()
  const { status, format, kind, search } = filters
  const { data, isLoading, isError, refetch } = useInterviewsPage(status, format, kind, search)

  if (isLoading) {
    return (
      <Box sx={{ py: 2, maxWidth: 1200, mx: 'auto', width: '100%', px: { xs: 1, sm: 0 } }}>
        <InterviewsPageSkeleton />
      </Box>
    )
  }

  if (isError || !data) {
    return <LoadErrorState onRetry={() => void refetch()} />
  }

  return (
    <Box sx={{ py: 2, maxWidth: 1200, mx: 'auto', width: '100%', px: { xs: 1, sm: 0 } }}>
      <InterviewsScreen vm={data} filters={filters} />
    </Box>
  )
}
