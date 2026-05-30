import { Grid, Skeleton, Stack } from '@mui/material'

export function SettingsPageSkeleton() {
  return (
    <Stack spacing={3}>
      <Skeleton variant="rounded" height={48} width={280} animation="wave" />
      <Skeleton variant="rounded" height={48} animation="wave" />
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Skeleton variant="rounded" height={320} animation="wave" sx={{ borderRadius: 3 }} />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <Skeleton variant="rounded" height={420} animation="wave" sx={{ borderRadius: 3 }} />
        </Grid>
      </Grid>
    </Stack>
  )
}
