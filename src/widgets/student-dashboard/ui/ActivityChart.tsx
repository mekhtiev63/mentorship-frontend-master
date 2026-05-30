import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { mockActivityChart } from '@/entities/student-dashboard/model/chart-mock'
import { glassSurface } from '@/shared/theme/palette'
import { ru } from '@/shared/i18n/ru'
import { PanelCard } from '@/widgets/student-dashboard/ui/PanelCard'

type ActivityChartProps = {
  loading?: boolean
}

export function ActivityChart({ loading = false }: ActivityChartProps) {
  return (
    <PanelCard title={ru.charts.activity} delay={0.28}>
      <Box
        component={motion.div}
        initial={{ opacity: loading ? 0.4 : 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        sx={{ ...glassSurface, p: 1, borderRadius: 2, height: 280 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockActivityChart} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="activityStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
              <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148,163,184,0.1)" vertical={false} />
            <XAxis dataKey="day" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: '#111827',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
              }}
              labelStyle={{ color: '#F8FAFC' }}
            />
            <Area
              type="monotone"
              dataKey="minutes"
              stroke="url(#activityStroke)"
              strokeWidth={2.5}
              fill="url(#activityFill)"
              name={ru.charts.minutes}
              isAnimationActive={!loading}
              animationDuration={1200}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        {ru.charts.activityCaption}
      </Typography>
    </PanelCard>
  )
}
