import { Alert, Box, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import type { OneOnOneListPageVM } from '@/entities/student-one-on-one'
import { MeetingFilters, useOneOnOneFilters } from '@/features/one-on-one-meetings'
import { ru } from '@/shared/i18n/ru'
import { EmptyMeetingsState } from '@/widgets/one-on-one/ui/EmptyMeetingsState'
import { MeetingHistoryTable } from '@/widgets/one-on-one/ui/MeetingHistoryTable'
import { NextMeetingCard } from '@/widgets/one-on-one/ui/NextMeetingCard'

type OneOnOneScreenProps = {
  vm: OneOnOneListPageVM
  filters: ReturnType<typeof useOneOnOneFilters>
}

export function OneOnOneScreen({ vm, filters }: OneOnOneScreenProps) {
  const { group, search, setGroup, setSearch } = filters
  const showNext =
    vm.nextMeeting && (group === 'all' || group === 'scheduled') && vm.nextMeeting.uiGroup === 'scheduled'
  const tableMeetings = vm.meetings
  const isEmpty = tableMeetings.length === 0 && !showNext
  const filteredEmpty = isEmpty && (search.length > 0 || group !== 'all')

  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {ru.oneOnOnePage.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {ru.oneOnOnePage.subtitle}
        </Typography>
      </Stack>

      {vm.dataSource === 'mock' ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          {ru.oneOnOnePage.mockBanner}
        </Alert>
      ) : null}

      <MeetingFilters
        group={group}
        search={search}
        onGroupChange={setGroup}
        onSearchChange={setSearch}
      />

      <Stack spacing={3} sx={{ mt: 3 }}>
        {showNext && vm.nextMeeting ? (
          <NextMeetingCard meeting={vm.nextMeeting} />
        ) : null}

        {isEmpty ? (
          <EmptyMeetingsState filtered={filteredEmpty} />
        ) : (
          <MeetingHistoryTable meetings={tableMeetings} excludeId={showNext ? vm.nextMeeting?.id : null} />
        )}
      </Stack>
    </Box>
  )
}
