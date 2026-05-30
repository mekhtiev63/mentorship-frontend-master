import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useMaterialDetailPage } from '@/entities/material-detail'
import { LoadErrorState } from '@/shared/ui/LoadErrorState'
import {
  MaterialDetailEmpty,
  MaterialDetailScreen,
  MaterialDetailSkeleton,
} from '@/widgets/material-content'

export function MaterialDetailPage() {
  const { blockId = '', materialId = '' } = useParams()
  const { data, isLoading, isError, error, refetch } = useMaterialDetailPage(blockId, materialId)

  if (isLoading) {
    return (
      <Box sx={{ py: 2, maxWidth: 960, mx: 'auto', width: '100%' }}>
        <MaterialDetailSkeleton />
      </Box>
    )
  }

  if (isError) {
    const notFound = error instanceof Error && error.message === 'not_found'
    if (notFound) {
      return (
        <Box sx={{ py: 4, maxWidth: 960, mx: 'auto', width: '100%' }}>
          <MaterialDetailEmpty blockId={blockId} />
        </Box>
      )
    }
    return <LoadErrorState onRetry={() => void refetch()} />
  }

  if (!data) {
    return (
      <Box sx={{ py: 4, maxWidth: 960, mx: 'auto', width: '100%' }}>
        <MaterialDetailEmpty blockId={blockId} />
      </Box>
    )
  }

  return (
    <Box sx={{ py: 2, maxWidth: 960, mx: 'auto', width: '100%' }}>
      <MaterialDetailScreen vm={data} />
    </Box>
  )
}
