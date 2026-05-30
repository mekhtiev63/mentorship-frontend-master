import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useStudentRoadmapBlock } from '@/entities/roadmap'
import { LoadErrorState } from '@/shared/ui/LoadErrorState'
import { RoadmapBlockDetailView } from '@/widgets/student-roadmap'
import { RoadmapPageSkeleton } from '@/widgets/student-roadmap/ui/RoadmapPageSkeleton'

export function StudentRoadmapBlockPage() {
  const { blockId = '' } = useParams()
  const { data, isLoading, isError, refetch } = useStudentRoadmapBlock(blockId)

  if (isLoading) {
    return (
      <Box sx={{ py: 2 }}>
        <RoadmapPageSkeleton />
      </Box>
    )
  }

  if (isError || !data) {
    return <LoadErrorState onRetry={() => void refetch()} />
  }

  return (
    <Box sx={{ py: 2, maxWidth: 900, mx: 'auto', width: '100%' }}>
      <RoadmapBlockDetailView detail={data} />
    </Box>
  )
}
