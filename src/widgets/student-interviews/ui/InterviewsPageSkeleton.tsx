import { Grid, Skeleton, Stack } from '@mui/material'

export function InterviewsPageSkeleton() {
  return (
    <Stack spacing={3}>
      <Skeleton variant="rounded" height={48} width={320} animation="wave" />
      <Skeleton variant="rounded" height={160} animation="wave" sx={{ borderRadius: 3 }} />
      <Grid container spacing={2}>
        {[0, 1, 2, 3].map((i) => (
          <Grid key={i} size={{ xs: 6, md: 3 }}>
            <Skeleton variant="rounded" height={100} animation="wave" sx={{ borderRadius: 3 }} />
          </Grid>
        ))}
      </Grid>
      <Skeleton variant="rounded" height={200} animation="wave" sx={{ borderRadius: 3 }} />
      <Skeleton variant="rounded" height={56} animation="wave" />
      <Skeleton variant="rounded" height={320} animation="wave" sx={{ borderRadius: 3 }} />
    </Stack>
  )
}
