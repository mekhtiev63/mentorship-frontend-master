import { Box, Typography } from '@mui/material'
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
import { mockWeeklyProgress } from '@/entities/student-dashboard/model/chart-mock'
import { glassSurface } from '@/shared/theme/palette'
import { ru } from '@/shared/i18n/ru'
import { PanelCard } from '@/widgets/student-dashboard/ui/PanelCard'

export function WeeklyProgressChart() {
  return (
    <PanelCard title={ru.charts.weeklyProgress} delay={0.32}>
      <Box sx={{ ...glassSurface, p: 1, borderRadius: 2, height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockWeeklyProgress} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
            <XAxis dataKey="week" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: '#1E293B',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
              }}
            />
            <Legend wrapperStyle={{ fontSize: 12, color: '#CBD5E1' }} />
            <Bar dataKey="completed" fill="#3B82F6" radius={[6, 6, 0, 0]} name={ru.charts.completed} />
            <Bar dataKey="target" fill="#8B5CF6" radius={[6, 6, 0, 0]} name={ru.charts.target} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        {ru.charts.weeklyCaption}
      </Typography>
    </PanelCard>
  )
}
