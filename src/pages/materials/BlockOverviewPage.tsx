import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useStudentRoadmapBlock } from '@/entities/roadmap'
import { LoadErrorState } from '@/shared/ui/LoadErrorState'
import { BlockOverviewView, BlockOverviewSkeleton } from '@/widgets/materials-list'

export function BlockOverviewPage() {
  const { blockId = '' } = useParams()
  const { data, isLoading, isError, refetch } = useStudentRoadmapBlock(blockId)

  if (isLoading) {
    return (
      <Box sx={{ py: 2, maxWidth: 900, mx: 'auto', width: '100%' }}>
        <BlockOverviewSkeleton />
      </Box>
    )
  }

  if (isError || !data) {
    return <LoadErrorState onRetry={() => void refetch()} />
  }

  return (
    <Box sx={{ py: 2, maxWidth: 900, mx: 'auto', width: '100%' }}>
      <BlockOverviewView block={data.block} />
    </Box>
  )
}
