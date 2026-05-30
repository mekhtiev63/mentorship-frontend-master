import { useState } from 'react'
import { Alert, Box, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import type { InterviewsPageVM, StudentInterviewVM } from '@/entities/student-interviews'
import { InterviewFilters, useInterviewFilters } from '@/features/interview-filters'
import { ru } from '@/shared/i18n/ru'
import { EmptyInterviewsState } from '@/widgets/student-interviews/ui/EmptyInterviewsState'
import { InterviewDetailsDrawer } from '@/widgets/student-interviews/ui/InterviewDetailsDrawer'
import { InterviewHistoryTable } from '@/widgets/student-interviews/ui/InterviewHistoryTable'
import { InterviewResultCard } from '@/widgets/student-interviews/ui/InterviewResultCard'
import { PostInterviewRecommendations } from '@/widgets/student-interviews/ui/PostInterviewRecommendations'
import { PreparationStatusCard } from '@/widgets/student-interviews/ui/PreparationStatusCard'
import { UpcomingInterviewsCard } from '@/widgets/student-interviews/ui/UpcomingInterviewsCard'

type InterviewsScreenProps = {
  vm: InterviewsPageVM
  filters: ReturnType<typeof useInterviewFilters>
}

export function InterviewsScreen({ vm, filters }: InterviewsScreenProps) {
  const { status, format, kind, search, setStatus, setFormat, setKind, setSearch } = filters
  const [drawerInterview, setDrawerInterview] = useState<StudentInterviewVM | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)

  const openDrawer = (interview: StudentInterviewVM) => {
    setDrawerInterview(interview)
    setDrawerOpen(true)
  }

  const historyEmpty = vm.filteredHistory.length === 0
  const filteredEmpty = historyEmpty && (search.length > 0 || status !== 'all' || format !== 'all' || kind !== 'all')

  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {ru.interviewsPage.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {ru.interviewsPage.subtitle}
        </Typography>
      </Stack>

      {vm.dataSource === 'mock' ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          {ru.interviewsPage.mockBanner}
        </Alert>
      ) : null}

      <Stack spacing={3}>
        <PreparationStatusCard preparation={vm.preparation} />
        <InterviewResultCard summary={vm.resultsSummary} />

        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1.5 }}>
            {ru.interviewsPage.sections.upcoming}
          </Typography>
          {vm.upcoming.length === 0 ? (
            <Alert severity="info">{ru.interviewsPage.sections.upcomingEmpty}</Alert>
          ) : (
            <Stack
              direction="row"
              spacing={2}
              sx={{ overflowX: 'auto', pb: 1, flexWrap: { xs: 'nowrap', md: 'wrap' } }}
            >
              {vm.upcoming.map((item) => (
                <UpcomingInterviewsCard key={item.id} interview={item} onOpenDetails={openDrawer} />
              ))}
            </Stack>
          )}
        </Box>

        <InterviewFilters
          status={status}
          format={format}
          kind={kind}
          search={search}
          onStatusChange={setStatus}
          onFormatChange={setFormat}
          onKindChange={setKind}
          onSearchChange={setSearch}
        />

        {historyEmpty ? (
          <EmptyInterviewsState filtered={filteredEmpty} />
        ) : (
          <InterviewHistoryTable interviews={vm.filteredHistory} onRowClick={openDrawer} />
        )}

        <PostInterviewRecommendations blocks={vm.recommendations} />
      </Stack>

      <InterviewDetailsDrawer
        open={drawerOpen}
        interview={drawerInterview}
        onClose={() => setDrawerOpen(false)}
      />
    </Box>
  )
}
