import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import type { OneOnOneMeetingVM } from '@/entities/student-one-on-one'
import { formatRuTimeRange } from '@/shared/lib/datetime'
import { ru } from '@/shared/i18n/ru'
import { glassSurface } from '@/shared/theme/palette'
import { uiGroupAccentColor } from '@/entities/student-one-on-one'
import { MeetingStatusChipFromMeeting } from '@/widgets/one-on-one/ui/MeetingStatusChip'

type OneOnOneDetailCardProps = {
  meeting: OneOnOneMeetingVM
}

export function OneOnOneDetailCard({ meeting }: OneOnOneDetailCardProps) {
  const accent = uiGroupAccentColor(meeting.uiGroup)
  const when =
    meeting.scheduledAt && meeting.endsAt
      ? formatRuTimeRange(meeting.scheduledAt, meeting.endsAt)
      : '—'

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{
        ...glassSurface,
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        borderLeft: `4px solid ${accent}`,
        boxShadow: `0 0 28px ${accent}33`,
      }}
    >
      <Button
        component={RouterLink}
        to="/student/one-on-one"
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 2 }}
        size="small"
      >
        {ru.oneOnOnePage.detail.back}
      </Button>

      <Stack direction="row" spacing={2} sx={{ alignItems: 'flex-start', mb: 3 }}>
        <Avatar src={meeting.buddyAvatarUrl ?? undefined} sx={{ width: 64, height: 64 }}>
          {meeting.buddyName.slice(0, 1)}
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            {ru.oneOnOnePage.detail.title}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            {meeting.buddyName}
          </Typography>
          <MeetingStatusChipFromMeeting meeting={meeting} size="medium" />
        </Box>
      </Stack>

      <Stack spacing={2.5}>
        <Box>
          <Typography variant="overline" color="text.secondary">
            {ru.oneOnOnePage.fields.date}
          </Typography>
          <Typography variant="body1">{when}</Typography>
        </Box>
        <Box>
          <Typography variant="overline" color="text.secondary">
            {ru.oneOnOnePage.fields.comment}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {meeting.comment}
          </Typography>
        </Box>
        <Box>
          <Typography variant="overline" color="text.secondary">
            {ru.oneOnOnePage.fields.cost}
          </Typography>
          <Typography variant="body1">
            {meeting.costPoints} {ru.oneOnOnePage.fields.points}
          </Typography>
        </Box>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mt: 3 }}>
        {meeting.callLink ? (
          <Button
            variant="contained"
            startIcon={<VideocamOutlinedIcon />}
            href={meeting.callLink}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textTransform: 'none', fontWeight: 700 }}
          >
            {ru.oneOnOnePage.actions.joinCall}
          </Button>
        ) : null}
        {meeting.calendarEventId ? (
          <Button
            component={RouterLink}
            to={`/student/calendar/events/${meeting.calendarEventId}`}
            variant="outlined"
            startIcon={<CalendarMonthOutlinedIcon />}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            {ru.oneOnOnePage.actions.openCalendar}
          </Button>
        ) : null}
      </Stack>
    </Box>
  )
}
