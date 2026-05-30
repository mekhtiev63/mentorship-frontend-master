import { Chip } from '@mui/material'
import type { InterviewUiStatus, StudentInterviewVM } from '@/entities/student-interviews'
import { uiStatusAccentColor } from '@/entities/student-interviews'
import { ru } from '@/shared/i18n/ru'

type InterviewStatusChipProps = {
  uiStatus: InterviewUiStatus
  size?: 'small' | 'medium'
}

export function InterviewStatusChip({ uiStatus, size = 'small' }: InterviewStatusChipProps) {
  const color = uiStatusAccentColor(uiStatus)
  return (
    <Chip
      label={ru.interviewsPage.uiStatus[uiStatus]}
      size={size}
      variant="outlined"
      sx={{ fontWeight: 600, borderColor: color, color, bgcolor: `${color}22` }}
    />
  )
}

export function InterviewStatusChipFromInterview({ interview }: { interview: StudentInterviewVM }) {
  return <InterviewStatusChip uiStatus={interview.uiStatus} />
}
