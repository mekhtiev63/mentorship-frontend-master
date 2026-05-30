import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import EventIcon from '@mui/icons-material/Event'
import GroupsIcon from '@mui/icons-material/Groups'
import NotificationsIcon from '@mui/icons-material/Notifications'
import RateReviewIcon from '@mui/icons-material/RateReview'
import VideocamIcon from '@mui/icons-material/Videocam'
import { Box } from '@mui/material'
import type { UiCalendarEventType } from '@/entities/student-calendar'
import { colorForEventType } from '@/entities/student-calendar'

type CalendarEventTypeIconProps = {
  uiType: UiCalendarEventType
  size?: number
}

export function CalendarEventTypeIcon({ uiType, size = 22 }: CalendarEventTypeIconProps) {
  const color = colorForEventType(uiType)
  const icon =
    uiType === 'interview' ? (
      <VideocamIcon sx={{ fontSize: size, color }} />
    ) : uiType === 'one_on_one' ? (
      <GroupsIcon sx={{ fontSize: size, color }} />
    ) : uiType === 'block_deadline' ? (
      <EventIcon sx={{ fontSize: size, color }} />
    ) : uiType === 'project_review' ? (
      <RateReviewIcon sx={{ fontSize: size, color }} />
    ) : (
      <NotificationsIcon sx={{ fontSize: size, color }} />
    )

  return (
    <Box
      sx={{
        width: 40,
        height: 40,
        borderRadius: 2,
        display: 'grid',
        placeItems: 'center',
        bgcolor: `${color}22`,
        boxShadow: `0 0 16px ${color}33`,
      }}
    >
      {icon}
    </Box>
  )
}

export function CalendarPageIcon() {
  return <CalendarMonthIcon />
}
