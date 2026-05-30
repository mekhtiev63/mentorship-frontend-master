import { Grid } from '@mui/material'
import { BookOpen, Flame, Layers, Percent, Timer } from 'lucide-react'
import type { StudentProgressPageVM } from '@/entities/student-progress'
import { ru } from '@/shared/i18n/ru'
import { MetricCard } from '@/widgets/student-dashboard/ui/MetricCard'

type ProgressKpiGridProps = {
  vm: StudentProgressPageVM
}

export function ProgressKpiGrid({ vm }: ProgressKpiGridProps) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
        <MetricCard
          label={ru.progressPage.kpi.program}
          value={vm.programPercent}
          suffix="%"
          icon={<Percent size={20} />}
          delay={0.05}
          glow="primary"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
        <MetricCard
          label={ru.progressPage.kpi.blocks}
          value={vm.blocksCompleted}
          suffix={` / ${vm.blocksTotal}`}
          icon={<Layers size={20} />}
          delay={0.08}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
        <MetricCard
          label={ru.progressPage.kpi.materials}
          value={vm.materialsCompleted}
          suffix={` / ${vm.materialsTotal}`}
          icon={<BookOpen size={20} />}
          delay={0.11}
          glow="violet"
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
        <MetricCard
          label={ru.progressPage.kpi.learningHours}
          value={vm.learningHoursDisplay}
          suffix=" ч"
          icon={<Timer size={20} />}
          delay={0.14}
          decimals={1}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
        <MetricCard
          label={ru.progressPage.kpi.streak}
          value={vm.streakDays}
          icon={<Flame size={20} />}
          delay={0.17}
        />
      </Grid>
    </Grid>
  )
}
