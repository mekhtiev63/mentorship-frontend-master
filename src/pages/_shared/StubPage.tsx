import type { ReactNode } from 'react'
import { Paper, Typography } from '@mui/material'
import { PageHeader } from '@/shared/ui'
import { ru } from '@/shared/i18n/ru'

type StubPageProps = {
  title: string
  description?: string
  children?: ReactNode
}

export function StubPage({ title, description, children }: StubPageProps) {
  return (
    <>
      <PageHeader title={title} subtitle={description ?? ru.stub.defaultDescription} />
      <Paper sx={{ p: 3 }}>
        {children ?? (
          <Typography color="text.secondary" variant="body2">
            {ru.stub.apiHint}
          </Typography>
        )}
      </Paper>
    </>
  )
}
