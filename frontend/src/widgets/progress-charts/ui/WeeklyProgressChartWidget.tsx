import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { WeeklyProgressPoint } from '@/entities/student-progress'
import { ru } from '@/shared/i18n/ru'
import { glassSurface } from '@/shared/theme/palette'
import { PanelCard } from '@/widgets/student-dashboard/ui/PanelCard'

type WeeklyProgressChartProps = {
  data: WeeklyProgressPoint[]
  delay?: number
}

export function WeeklyProgressChartWidget({ data, delay = 0.25 }: WeeklyProgressChartProps) {
  return (
    <PanelCard title={ru.progressPage.charts.weeklyTitle} delay={delay}>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        sx={{ ...glassSurface, p: 1, borderRadius: 2, height: 280 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid stroke="rgba(148,163,184,0.1)" vertical={false} />
            <XAxis dataKey="weekLabel" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: '#111827',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
              }}
            />
            <Legend />
            <Bar
              dataKey="completedUnits"
              name={ru.progressPage.charts.completed}
              fill="#3B82F6"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="targetUnits"
              name={ru.progressPage.charts.target}
              fill="rgba(139, 92, 246, 0.45)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        {ru.progressPage.charts.weeklyCaption}
      </Typography>
    </PanelCard>
  )
}
