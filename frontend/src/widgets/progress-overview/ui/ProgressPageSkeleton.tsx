import { Grid, Skeleton, Stack } from '@mui/material'

export function ProgressPageSkeleton() {
  return (
    <Stack spacing={3}>
      <Skeleton variant="rounded" height={48} width={320} animation="wave" />
      <Skeleton variant="rounded" height={140} animation="wave" sx={{ borderRadius: 3 }} />
      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
            <Skeleton variant="rounded" height={120} animation="wave" sx={{ borderRadius: 2 }} />
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Skeleton variant="rounded" height={320} animation="wave" sx={{ borderRadius: 2 }} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Skeleton variant="rounded" height={320} animation="wave" sx={{ borderRadius: 2 }} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Skeleton variant="rounded" height={320} animation="wave" sx={{ borderRadius: 2 }} />
        </Grid>
      </Grid>
      <Skeleton variant="rounded" height={240} animation="wave" sx={{ borderRadius: 2 }} />
    </Stack>
  )
}
