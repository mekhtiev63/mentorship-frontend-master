import { Box, Skeleton, Stack } from '@mui/material'

export function MaterialsListSkeleton() {
  return (
    <Stack spacing={2}>
      <Skeleton variant="rounded" height={56} sx={{ borderRadius: 2 }} animation="wave" />
      {[0, 1, 2, 3, 4].map((i) => (
        <Skeleton key={i} variant="rounded" height={140} sx={{ borderRadius: 3 }} animation="wave" />
      ))}
    </Stack>
  )
}

export function BlockOverviewSkeleton() {
  return (
    <Box>
      <Skeleton variant="rounded" height={220} sx={{ borderRadius: 3, mb: 2 }} animation="wave" />
      <Skeleton variant="rounded" height={48} width={240} sx={{ borderRadius: 2 }} animation="wave" />
    </Box>
  )
}
