import { Box, Skeleton } from '@mui/material'

type DashboardSkeletonProps = {
  loading: boolean
  children: React.ReactNode
  height?: number
}

export function DashboardSkeleton({ loading, children, height = 120 }: DashboardSkeletonProps) {
  if (loading) {
    return (
      <Skeleton
        variant="rounded"
        height={height}
        animation="wave"
        sx={{
          borderRadius: 3,
          transform: 'none',
          bgcolor: 'rgba(255,255,255,0.06)',
        }}
      />
    )
  }
  return <Box>{children}</Box>
}
