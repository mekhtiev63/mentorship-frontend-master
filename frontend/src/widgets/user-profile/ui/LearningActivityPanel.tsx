import { Box, Typography } from '@mui/material'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ProfileOverview } from '@/entities/profile-overview'
import { glassSurface } from '@/shared/theme/palette'
import { PanelCard } from '@/widgets/student-dashboard/ui/PanelCard'
import { ru } from '@/shared/i18n/ru'

type LearningActivityPanelProps = {
  profile: ProfileOverview
  delay?: number
}

export function LearningActivityPanel({ profile, delay = 0.35 }: LearningActivityPanelProps) {
  const data = profile.activityChart

  return (
    <PanelCard title={ru.profile.learningActivity} delay={delay}>
      {data.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
          {ru.common.nothingYet}
        </Typography>
      ) : (
        <>
          <Box sx={{ ...glassSurface, p: 1, borderRadius: 2, height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <defs>
                  <linearGradient id="profileActivityFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(148,163,184,0.12)" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94A3B8', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: '#1E293B',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 8,
                  }}
                  labelStyle={{ color: '#F8FAFC' }}
                />
                <Area
                  type="monotone"
                  dataKey="minutes"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  fill="url(#profileActivityFill)"
                  name={ru.charts.minutes}
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            {ru.charts.activityCaption}
          </Typography>
        </>
      )}
    </PanelCard>
  )
}
