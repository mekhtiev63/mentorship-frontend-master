import { Tab, Tabs } from '@mui/material'
import type { ProgressPeriod } from '@/entities/student-progress'
import { PROGRESS_PERIODS } from '@/entities/student-progress/model/period'
import { ru } from '@/shared/i18n/ru'

type ProgressPeriodTabsProps = {
  value: ProgressPeriod
  onChange: (period: ProgressPeriod) => void
}

const labels: Record<ProgressPeriod, string> = {
  week: ru.progressPage.period.week,
  month: ru.progressPage.period.month,
  all: ru.progressPage.period.all,
}

export function ProgressPeriodTabs({ value, onChange }: ProgressPeriodTabsProps) {
  return (
    <Tabs
      value={value}
      onChange={(_, v) => onChange(v as ProgressPeriod)}
      variant="scrollable"
      scrollButtons="auto"
      sx={{
        minHeight: 40,
        '& .MuiTab-root': { minHeight: 40, textTransform: 'none', fontWeight: 600 },
      }}
    >
      {PROGRESS_PERIODS.map((p) => (
        <Tab key={p} value={p} label={labels[p]} />
      ))}
    </Tabs>
  )
}
