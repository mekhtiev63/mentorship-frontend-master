import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined'
import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import type { OneOnOneMeetingVM } from '@/entities/student-one-on-one'
import { formatRuTimeRange } from '@/shared/lib/datetime'
import { ru } from '@/shared/i18n/ru'
import { brandColors, glassSurface, motionCardHover } from '@/shared/theme/palette'
import { MeetingStatusChipFromMeeting } from '@/widgets/one-on-one/ui/MeetingStatusChip'

type NextMeetingCardProps = {
  meeting: OneOnOneMeetingVM
}

export function NextMeetingCard({ meeting }: NextMeetingCardProps) {
  const when =
    meeting.scheduledAt && meeting.endsAt
      ? formatRuTimeRange(meeting.scheduledAt, meeting.endsAt)
      : meeting.scheduledAt
        ? formatRuTimeRange(meeting.scheduledAt, meeting.scheduledAt)
        : '—'

  return (
    <Box
      component={motion.div}
      whileHover={motionCardHover}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{
        ...glassSurface,
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        borderLeft: `4px solid ${brandColors.secondary}`,
        boxShadow: brandColors.neonViolet,
      }}
    >
      <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700 }}>
        {ru.oneOnOnePage.nextMeeting}
      </Typography>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ mt: 1.5, alignItems: { sm: 'center' } }}
      >
        <Avatar src={meeting.buddyAvatarUrl ?? undefined} sx={{ width: 56, height: 56 }}>
          {meeting.buddyName.slice(0, 1)}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {meeting.buddyName}
            </Typography>
            <MeetingStatusChipFromMeeting meeting={meeting} />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            {when}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {meeting.comment}
          </Typography>
        </Box>
      </Stack>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} sx={{ mt: 2.5 }}>
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
        <Button
          component={RouterLink}
          to={meeting.href}
          variant="text"
          sx={{ textTransform: 'none', fontWeight: 600 }}
        >
          {ru.oneOnOnePage.actions.openDetail}
        </Button>
      </Stack>
    </Box>
  )
}
