import { Box } from '@mui/material'
import { useParams } from 'react-router-dom'
import { MaterialsListView } from '@/widgets/materials-list'

export function BlockMaterialsPage() {
  const { blockId = '' } = useParams()

  return (
    <Box sx={{ py: 2, maxWidth: 960, mx: 'auto', width: '100%', px: { xs: 0, sm: 1 } }}>
      <MaterialsListView blockId={blockId} />
    </Box>
  )
}
