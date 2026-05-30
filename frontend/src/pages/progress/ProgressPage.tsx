import { Box } from '@mui/material'
import { useStudentProgressPage } from '@/entities/student-progress'
import { useProgressPeriod } from '@/features/progress-stats'
import { LoadErrorState } from '@/shared/ui/LoadErrorState'
import {
  ProgressEmptyState,
  ProgressOverviewScreen,
  ProgressPageSkeleton,
} from '@/widgets/progress-overview'

export function ProgressPage() {
  const { period, setPeriod } = useProgressPeriod()
  const { data, isLoading, isError, refetch, isFetched } = useStudentProgressPage(period)

  if (isLoading) {
    return (
      <Box sx={{ py: 2, maxWidth: 1200, mx: 'auto', width: '100%' }}>
        <ProgressPageSkeleton />
      </Box>
    )
  }

  if (isError) {
    return <LoadErrorState onRetry={() => void refetch()} />
  }

  if (!data && isFetched) {
    return (
      <Box sx={{ py: 4, maxWidth: 1200, mx: 'auto', width: '100%' }}>
        <ProgressEmptyState />
      </Box>
    )
  }

  if (!data) {
    return (
      <Box sx={{ py: 4, maxWidth: 1200, mx: 'auto', width: '100%' }}>
        <ProgressEmptyState />
      </Box>
    )
  }

  return (
    <Box sx={{ py: 2, maxWidth: 1200, mx: 'auto', width: '100%' }}>
      <ProgressOverviewScreen vm={data} period={period} onPeriodChange={setPeriod} />
    </Box>
  )
}
