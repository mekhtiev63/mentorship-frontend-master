import { Box, Skeleton } from '@mui/material'

export function RoadmapPageSkeleton() {
  return (
    <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', lg: 'row' } }}>
      <Skeleton variant="rounded" width={4} height={480} sx={{ display: { xs: 'none', lg: 'block' } }} />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {[0, 1, 2, 3].map((i) => (
          <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
            <Skeleton variant="circular" width={48} height={48} />
            <Skeleton variant="rounded" height={160} sx={{ flex: 1, borderRadius: 3 }} animation="wave" />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
