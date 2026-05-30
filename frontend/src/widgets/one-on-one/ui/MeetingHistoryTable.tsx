import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import type { OneOnOneMeetingVM } from '@/entities/student-one-on-one'
import { formatRuDateTime } from '@/shared/lib/datetime'
import { ru } from '@/shared/i18n/ru'
import { glassSurface } from '@/shared/theme/palette'
import { MeetingStatusChipFromMeeting } from '@/widgets/one-on-one/ui/MeetingStatusChip'

type MeetingHistoryTableProps = {
  meetings: OneOnOneMeetingVM[]
  excludeId?: string | null
}

export function MeetingHistoryTable({ meetings, excludeId }: MeetingHistoryTableProps) {
  const rows = meetings.filter((m) => m.id !== excludeId)

  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
        {ru.oneOnOnePage.historyTitle}
      </Typography>
      <TableContainer sx={{ ...glassSurface, borderRadius: 3, overflowX: 'auto' }}>
        <Table size="small" sx={{ minWidth: 520 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>{ru.oneOnOnePage.fields.buddy}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>{ru.oneOnOnePage.fields.date}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>{ru.oneOnOnePage.fields.status}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((m, i) => (
              <TableRow
                key={m.id}
                component={motion.tr}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                hover
                sx={{ cursor: 'pointer' }}
              >
                <TableCell>
                  <Box
                    component={RouterLink}
                    to={m.href}
                    sx={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}
                  >
                    {m.buddyName}
                  </Box>
                </TableCell>
                <TableCell>
                  {m.scheduledAt ? formatRuDateTime(m.scheduledAt) : '—'}
                </TableCell>
                <TableCell>
                  <MeetingStatusChipFromMeeting meeting={m} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
