import { Box, Skeleton, Stack } from '@mui/material'
import { glassSurface } from '@/shared/theme/palette'

export function MaterialDetailSkeleton() {
  return (
    <Stack spacing={3}>
      <Skeleton variant="rounded" height={40} width={220} animation="wave" />
      <Box sx={{ ...glassSurface, p: 3, borderRadius: 3 }}>
        <Skeleton variant="text" width="70%" height={48} animation="wave" />
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Skeleton variant="rounded" width={80} height={32} animation="wave" />
          <Skeleton variant="rounded" width={100} height={32} animation="wave" />
        </Stack>
        <Skeleton variant="rounded" height={8} sx={{ mt: 3 }} animation="wave" />
      </Box>
      <Box sx={{ ...glassSurface, p: 3, borderRadius: 3 }}>
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="text" animation="wave" />
        <Skeleton variant="rounded" height={200} sx={{ mt: 2 }} animation="wave" />
      </Box>
    </Stack>
  )
}
