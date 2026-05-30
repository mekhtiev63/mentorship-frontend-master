import { Box } from '@mui/material'
import { PageHeader } from '@/shared/ui'
import { ru } from '@/shared/i18n/ru'
import { RoadmapPageView } from '@/widgets/student-roadmap'

export function StudentRoadmapPage() {
  return (
    <>
      <PageHeader title={ru.roadmap.pageTitle} subtitle={ru.roadmap.pageSubtitle} />
      <Box sx={{ py: 2, maxWidth: 1200, mx: 'auto', width: '100%' }}>
        <RoadmapPageView />
      </Box>
    </>
  )
}
