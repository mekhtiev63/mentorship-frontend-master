import { Box, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { BlockCompletionPoint } from '@/entities/student-progress'
import { ru } from '@/shared/i18n/ru'
import { brandColors, glassSurface } from '@/shared/theme/palette'
import { PanelCard } from '@/widgets/student-dashboard/ui/PanelCard'

type BlockCompletionChartProps = {
  data: BlockCompletionPoint[]
  delay?: number
}

export function BlockCompletionChart({ data, delay = 0.3 }: BlockCompletionChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    shortTitle: d.title.length > 18 ? `${d.title.slice(0, 16)}…` : d.title,
  }))

  return (
    <PanelCard title={ru.progressPage.charts.blocksTitle} delay={delay}>
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        sx={{ ...glassSurface, p: 1, borderRadius: 2, height: Math.max(220, chartData.length * 36) }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 4 }}>
            <defs>
              <linearGradient id="blockBar" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={brandColors.primary} />
                <stop offset="100%" stopColor={brandColors.secondary} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148,163,184,0.08)" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fill: '#94A3B8', fontSize: 11 }} />
            <YAxis
              type="category"
              dataKey="shortTitle"
              width={100}
              tick={{ fill: '#94A3B8', fontSize: 11 }}
            />
            <Tooltip
              contentStyle={{
                background: '#111827',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 8,
              }}
              formatter={(value) => [`${value ?? 0}%`, ru.progressPage.roadmapStats.progress]}
            />
            <Bar dataKey="percent" fill="url(#blockBar)" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
        {ru.progressPage.charts.blocksCaption}
      </Typography>
    </PanelCard>
  )
}
