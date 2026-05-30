import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import {
  Box,
  IconButton,
  LinearProgress,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import type { StudentProgressPageVM } from '@/entities/student-progress'
import { ru } from '@/shared/i18n/ru'
import { brandColors, glassSurface } from '@/shared/theme/palette'
import { PanelCard } from '@/widgets/student-dashboard/ui/PanelCard'

type RoadmapBlocksStatsTableProps = {
  blocks: StudentProgressPageVM['roadmapBlocks']
  delay?: number
}

function statusLabel(status: string) {
  if (status === 'approved' || status === 'completed') return ru.blockStatus.completed
  if (status === 'locked') return ru.blockStatus.locked
  return ru.blockStatus.in_progress
}

export function RoadmapBlocksStatsTable({ blocks, delay = 0.35 }: RoadmapBlocksStatsTableProps) {
  return (
    <PanelCard title={ru.progressPage.roadmapStats.title} delay={delay}>
      <Box sx={{ ...glassSurface, borderRadius: 2, overflow: 'hidden' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>{ru.progressPage.roadmapStats.block}</TableCell>
              <TableCell>{ru.progressPage.roadmapStats.progress}</TableCell>
              <TableCell>{ru.progressPage.roadmapStats.materials}</TableCell>
              <TableCell>{ru.progressPage.roadmapStats.status}</TableCell>
              <TableCell align="right" />
            </TableRow>
          </TableHead>
          <TableBody>
            {blocks.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {row.title}
                  </Typography>
                </TableCell>
                <TableCell sx={{ minWidth: 140 }}>
                  <Stack spacing={0.5}>
                    <Typography variant="caption">{row.percent}%</Typography>
                    <LinearProgress
                      variant="determinate"
                      value={row.percent}
                      sx={{
                        height: 6,
                        borderRadius: 3,
                        '& .MuiLinearProgress-bar': { background: brandColors.heroGradient },
                      }}
                    />
                  </Stack>
                </TableCell>
                <TableCell>
                  {row.materialsDone} / {row.materialsTotal}
                </TableCell>
                <TableCell>{statusLabel(row.uiStatus)}</TableCell>
                <TableCell align="right">
                  <IconButton
                    component={RouterLink}
                    to={row.href}
                    size="small"
                    aria-label={ru.progressPage.roadmapStats.open}
                  >
                    <OpenInNewIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PanelCard>
  )
}
