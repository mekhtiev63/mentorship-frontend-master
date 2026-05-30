import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import { Avatar, Box, Button, Chip, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import type { StudentInterviewVM } from '@/entities/student-interviews'
import { formatRuTimeRange } from '@/shared/lib/datetime'
import { ru } from '@/shared/i18n/ru'
import { glassSurface, motionCardHover } from '@/shared/theme/palette'
import { InterviewFormatChip } from '@/widgets/student-interviews/ui/InterviewFormatChip'
import { InterviewStatusChipFromInterview } from '@/widgets/student-interviews/ui/InterviewStatusChip'

type UpcomingInterviewsCardProps = {
  interview: StudentInterviewVM
  onOpenDetails?: (interview: StudentInterviewVM) => void
}

export function UpcomingInterviewsCard({ interview, onOpenDetails }: UpcomingInterviewsCardProps) {
  const when =
    interview.scheduledAt && interview.endsAt
      ? formatRuTimeRange(interview.scheduledAt, interview.endsAt)
      : '—'

  return (
    <Box
      component={motion.div}
      whileHover={motionCardHover}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{
        ...glassSurface,
        p: 2,
        borderRadius: 3,
        minWidth: { xs: 280, sm: 320 },
        flex: '0 0 auto',
        borderLeft: `4px solid #60A5FA`,
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1 }}>
        {interview.title}
      </Typography>
      <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
        <InterviewFormatChip format={interview.format} />
        <InterviewStatusChipFromInterview interview={interview} />
        <Chip label={ru.interviewsPage.kind[interview.kind]} size="small" variant="outlined" />
      </Stack>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 1 }}>
        <Avatar src={interview.interviewerAvatarUrl ?? undefined} sx={{ width: 36, height: 36 }}>
          {interview.interviewerName.slice(0, 1)}
        </Avatar>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {ru.interviewsPage.fields.interviewer}
          </Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {interview.interviewerName}
          </Typography>
        </Box>
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {when}
      </Typography>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
        <Button
          size="small"
          variant="contained"
          onClick={() => onOpenDetails?.(interview)}
          sx={{ textTransform: 'none', fontWeight: 700 }}
        >
          {ru.interviewsPage.actions.details}
        </Button>
        {interview.calendarEventId ? (
          <Button
            component={RouterLink}
            to={`/student/calendar/events/${interview.calendarEventId}`}
            size="small"
            variant="outlined"
            startIcon={<CalendarMonthOutlinedIcon />}
            sx={{ textTransform: 'none' }}
          >
            {ru.interviewsPage.actions.openCalendar}
          </Button>
        ) : null}
      </Stack>
    </Box>
  )
}
