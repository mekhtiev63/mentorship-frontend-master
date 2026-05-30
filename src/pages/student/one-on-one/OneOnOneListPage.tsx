import { Box } from '@mui/material'
import { useOneOnOneList } from '@/entities/student-one-on-one'
import { useOneOnOneFilters } from '@/features/one-on-one-meetings'
import { LoadErrorState } from '@/shared/ui/LoadErrorState'
import { OneOnOnePageSkeleton, OneOnOneScreen } from '@/widgets/one-on-one'

export function OneOnOneListPage() {
  const filters = useOneOnOneFilters()
  const { group, search } = filters
  const { data, isLoading, isError, refetch } = useOneOnOneList(group, search)

  if (isLoading) {
    return (
      <Box sx={{ py: 2, maxWidth: 960, mx: 'auto', width: '100%', px: { xs: 1, sm: 0 } }}>
        <OneOnOnePageSkeleton />
      </Box>
    )
  }

  if (isError || !data) {
    return <LoadErrorState onRetry={() => void refetch()} />
  }

  return (
    <Box sx={{ py: 2, maxWidth: 960, mx: 'auto', width: '100%', px: { xs: 1, sm: 0 } }}>
      <OneOnOneScreen vm={data} filters={filters} />
    </Box>
  )
}
