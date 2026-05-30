import { Box, Skeleton } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useMaterialDetail } from '@/entities/materials'
import { LoadErrorState } from '@/shared/ui/LoadErrorState'
import { MaterialDetailView } from '@/widgets/materials-list'

export function MaterialDetailPage() {
  const { blockId = '', materialId = '' } = useParams()
  const { data, isLoading, isError, refetch } = useMaterialDetail(blockId, materialId)

  if (isLoading) {
    return (
      <Box sx={{ py: 2, maxWidth: 900, mx: 'auto' }}>
        <Skeleton variant="rounded" height={280} sx={{ borderRadius: 3 }} animation="wave" />
      </Box>
    )
  }

  if (isError || !data) {
    return <LoadErrorState onRetry={() => void refetch()} />
  }

  return (
    <Box sx={{ py: 2, maxWidth: 900, mx: 'auto', width: '100%' }}>
      <MaterialDetailView material={data} />
    </Box>
  )
}
