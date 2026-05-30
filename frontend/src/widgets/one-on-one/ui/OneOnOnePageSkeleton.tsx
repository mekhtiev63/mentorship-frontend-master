import { Skeleton, Stack } from '@mui/material'

export function OneOnOnePageSkeleton() {
  return (
    <Stack spacing={3}>
      <Skeleton variant="rounded" height={48} width={320} animation="wave" />
      <Skeleton variant="rounded" height={56} animation="wave" />
      <Skeleton variant="rounded" height={220} animation="wave" sx={{ borderRadius: 3 }} />
      <Skeleton variant="rounded" height={280} animation="wave" sx={{ borderRadius: 3 }} />
    </Stack>
  )
}
