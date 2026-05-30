import { Grid, Skeleton, Stack } from '@mui/material'

export function CalendarPageSkeleton() {
  return (
    <Stack spacing={3}>
      <Skeleton variant="rounded" height={48} width={280} animation="wave" />
      <Skeleton variant="rounded" height={56} animation="wave" />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Skeleton variant="rounded" height={560} animation="wave" sx={{ borderRadius: 3 }} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Skeleton variant="rounded" height={320} animation="wave" sx={{ borderRadius: 2 }} />
        </Grid>
      </Grid>
    </Stack>
  )
}
