import { Alert, Box, Grid, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import type { CalendarPageVM } from '@/entities/student-calendar'
import { CalendarEventsFilterBar, useCalendarViewState } from '@/features/calendar-events'
import { ru } from '@/shared/i18n/ru'
import { StudentBigCalendar } from '@/widgets/calendar-view/ui/StudentBigCalendar'
import { UpcomingEventsPanel } from '@/widgets/calendar-view/ui/UpcomingEventsPanel'

type CalendarScreenProps = {
  vm: CalendarPageVM
  viewState: ReturnType<typeof useCalendarViewState>
}

export function CalendarScreen({ vm, viewState }: CalendarScreenProps) {
  const { setView, setAnchorDate, setFilter, setSearch, view, anchorDate, filter, search } =
    viewState

  const showEmpty = vm.events.length === 0

  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {ru.calendarPage.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {ru.calendarPage.subtitle}
        </Typography>
      </Stack>

      {vm.dataSource === 'mock' ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          {ru.calendarPage.mockBanner}
        </Alert>
      ) : null}
      {vm.partialError ? (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {ru.calendarPage.partialWarning}
        </Alert>
      ) : null}

      <CalendarEventsFilterBar
        filter={filter}
        search={search}
        onFilterChange={setFilter}
        onSearchChange={setSearch}
      />

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {showEmpty ? (
            <Alert severity="info" sx={{ mt: 2 }}>
              {search || filter !== 'all' ? ru.calendarPage.emptyFiltered : ru.calendarPage.empty}
            </Alert>
          ) : null}
          <StudentBigCalendar
            events={vm.events}
            view={view}
            anchorDate={anchorDate}
            onViewChange={setView}
            onDateChange={setAnchorDate}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <UpcomingEventsPanel events={vm.upcoming} />
        </Grid>
      </Grid>
    </Box>
  )
}
