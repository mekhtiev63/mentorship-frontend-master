import { Chip } from '@mui/material'
import type { OneOnOneMeetingVM, OneOnOneUiGroup } from '@/entities/student-one-on-one'
import { uiGroupAccentColor } from '@/entities/student-one-on-one'
import { ru } from '@/shared/i18n/ru'

type MeetingStatusChipProps = {
  uiGroup: OneOnOneUiGroup
  /** Детальный статус API (например «Ожидает ответа») */
  detailLabel?: string
  size?: 'small' | 'medium'
}

export function MeetingStatusChip({ uiGroup, detailLabel, size = 'small' }: MeetingStatusChipProps) {
  const color = uiGroupAccentColor(uiGroup)
  const label = detailLabel ?? ru.oneOnOnePage.group[uiGroup]

  return (
    <Chip
      label={label}
      size={size}
      sx={{
        fontWeight: 600,
        borderColor: color,
        color,
        bgcolor: `${color}22`,
      }}
      variant="outlined"
    />
  )
}

export function MeetingStatusChipFromMeeting({
  meeting,
  size = 'small',
}: {
  meeting: OneOnOneMeetingVM
  size?: 'small' | 'medium'
}) {
  return (
    <MeetingStatusChip
      uiGroup={meeting.uiGroup}
      detailLabel={meeting.uiGroup === 'scheduled' ? meeting.statusLabel : undefined}
      size={size}
    />
  )
}
