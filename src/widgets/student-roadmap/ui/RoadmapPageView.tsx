import { Alert, Box } from '@mui/material'
import { motion } from 'framer-motion'
import { useStudentRoadmapPage } from '@/entities/roadmap'
import { LoadErrorState } from '@/shared/ui/LoadErrorState'
import { ru } from '@/shared/i18n/ru'
import {
  RoadmapEmptyState,
  RoadmapLegend,
  RoadmapSummaryChips,
} from '@/widgets/student-roadmap/ui/RoadmapLegend'
import { RoadmapPageSkeleton } from '@/widgets/student-roadmap/ui/RoadmapPageSkeleton'
import { RoadmapSkillTree } from '@/widgets/student-roadmap/ui/RoadmapSkillTree'

export function RoadmapPageView() {
  const { data, isLoading, isError, refetch } = useStudentRoadmapPage()

  if (isLoading) {
    return <RoadmapPageSkeleton />
  }

  if (isError || !data) {
    return <LoadErrorState onRetry={() => void refetch()} />
  }

  if (data.blocks.length === 0) {
    return <RoadmapEmptyState />
  }

  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
      <RoadmapSummaryChips
        completed={data.summary.completedBlocks}
        total={data.summary.totalBlocks}
        programPercent={data.summary.programPercent}
        currentTitle={data.summary.currentBlockTitle}
      />
      {data.progressPartialError ? (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {ru.roadmap.progressPartialWarning}
        </Alert>
      ) : null}
      <RoadmapLegend />
      <RoadmapSkillTree blocks={data.blocks} />
    </Box>
  )
}
