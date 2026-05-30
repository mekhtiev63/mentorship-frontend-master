import { Box, Grid, Skeleton } from '@mui/material'

export function ProfilePageSkeleton() {
  return (
    <Box>
      <Skeleton variant="rounded" height={56} sx={{ mb: 3, borderRadius: 2 }} />
      <Skeleton variant="rounded" height={320} sx={{ mb: 3, borderRadius: 3 }} />
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[0, 1, 2, 3].map((i) => (
          <Grid key={i} size={{ xs: 6, md: 3 }}>
            <Skeleton variant="rounded" height={120} sx={{ borderRadius: 2 }} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Skeleton variant="rounded" height={140} sx={{ borderRadius: 2, mb: 2 }} />
          <Skeleton variant="rounded" height={200} sx={{ borderRadius: 2 }} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Skeleton variant="rounded" height={280} sx={{ borderRadius: 2, mb: 2 }} />
          <Skeleton variant="rounded" height={320} sx={{ borderRadius: 2 }} />
        </Grid>
      </Grid>
    </Box>
  )
}
