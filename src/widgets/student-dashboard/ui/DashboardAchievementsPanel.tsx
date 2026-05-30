import { Box, Button, Typography } from '@mui/material'
import { CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import type { AchievementPreview } from '@/entities/student-dashboard/model/types'
import { ru } from '@/shared/i18n/ru'
import { glassSurface, motionCardHover } from '@/shared/theme/palette'
import { PanelCard } from '@/widgets/student-dashboard/ui/PanelCard'

type DashboardAchievementsPanelProps = {
  items: AchievementPreview[]
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function DashboardAchievementsPanel({ items }: DashboardAchievementsPanelProps) {
  return (
    <PanelCard
      title={ru.dashboard.achievementsPanel}
      delay={0.22}
      action={
        <Button component={RouterLink} to="/student/achievements" size="small">
          {ru.common.viewAll}
        </Button>
      }
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {items.map((item, index) => (
          <Box
            key={item.id}
            component={motion.div}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.06 }}
            whileHover={motionCardHover}
            sx={{
              ...glassSurface,
              p: 1.5,
              borderRadius: 2,
              display: 'flex',
              gap: 1.25,
              alignItems: 'flex-start',
            }}
          >
            <CheckCircle2 size={22} color="#22C55E" style={{ flexShrink: 0, marginTop: 2 }} />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {item.title}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                {ru.achievements.byCode[item.code as keyof typeof ru.achievements.byCode]?.description ??
                  ''}
              </Typography>
              <Typography variant="caption" color="primary.light" sx={{ mt: 0.5, display: 'block' }}>
                {ru.dashboard.receivedAt}: {formatDate(item.grantedAt)}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </PanelCard>
  )
}
