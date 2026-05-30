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
import type { ActivityByDayPoint } from '@/entities/student-progress'
import { ru } from '@/shared/i18n/ru'
import { glassSurface } from '@/shared/theme/palette'
import { PanelCard } from '@/widgets/student-dashboard/ui/PanelCard'

type DailyActivityChartProps = {
  data: ActivityByDayPoint[]
  delay?: number
}

export function DailyActivityChart({ data, delay = 0.2 }: DailyActivityChartProps) {
  const empty = data.every((d) => d.minutes === 0)

  return (
    <PanelCard title={ru.progressPage.charts.activityTitle} delay={delay}>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        sx={{ ...glassSurface, p: 1, borderRadius: 2, height: 280 }}
      >
        {empty ? (
          <Box sx={{ height: '100%', display: 'grid', placeItems: 'center' }}>
            <Typography color="text.secondary">{ru.progressPage.charts.empty}</Typography>
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="progressActivityStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
                <linearGradient id="progressActivityFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(148,163,184,0.1)" vertical={false} />
              <XAxis dataKey="label" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
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
                stroke="url(#progressActivityStroke)"
                strokeWidth={2.5}
                fill="url(#progressActivityFill)"
                name={ru.progressPage.charts.minutes}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        {ru.progressPage.charts.activityCaption}
      </Typography>
    </PanelCard>
  )
}
