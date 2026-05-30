import { Card, CardContent, Typography } from '@mui/material'
import type { ReactNode } from 'react'

type StatCardProps = {
  label: string
  value: ReactNode
}

export function StatCard({ label, value }: StatCardProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h5" sx={{ mt: 0.5 }}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  )
}
