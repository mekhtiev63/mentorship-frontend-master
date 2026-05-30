import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import type { StudentInterviewVM } from '@/entities/student-interviews'
import { ru } from '@/shared/i18n/ru'
import { glassSurface } from '@/shared/theme/palette'
import { InterviewFormatChip } from '@/widgets/student-interviews/ui/InterviewFormatChip'
import { InterviewStatusChipFromInterview } from '@/widgets/student-interviews/ui/InterviewStatusChip'

type InterviewHistoryTableProps = {
  interviews: StudentInterviewVM[]
  onRowClick: (interview: StudentInterviewVM) => void
}

function formatTime(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}

function formatDate(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
}

function scoreDisplay(interview: StudentInterviewVM) {
  if (interview.uiStatus === 'awaiting_score') {
    return <InterviewStatusChipFromInterview interview={interview} />
  }
  if (interview.score != null) {
    return `${interview.score} / ${interview.scoreMax}`
  }
  return '—'
}

export function InterviewHistoryTable({ interviews, onRowClick }: InterviewHistoryTableProps) {
  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
        {ru.interviewsPage.sections.history}
      </Typography>

      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <Stack spacing={1.5}>
          {interviews.map((item, i) => (
            <Box
              key={item.id}
              component={motion.div}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => onRowClick(item)}
              sx={{
                ...glassSurface,
                p: 2,
                borderRadius: 2,
                cursor: 'pointer',
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                {item.title}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {formatDate(item.scheduledAt)} · {formatTime(item.scheduledAt)}
              </Typography>
              <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5, my: 1 }}>
                <InterviewFormatChip format={item.format} />
                <InterviewStatusChipFromInterview interview={item} />
              </Stack>
              <Typography variant="body2">{item.interviewerName}</Typography>
              <Typography variant="body2" sx={{ mt: 0.5, fontWeight: 600 }}>
                {ru.interviewsPage.fields.score}: {typeof item.score === 'number' ? `${item.score}/${item.scoreMax}` : '—'}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      <TableContainer sx={{ ...glassSurface, borderRadius: 3, display: { xs: 'none', md: 'block' }, overflowX: 'auto' }}>
        <Table size="small" sx={{ minWidth: 900 }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>{ru.interviewsPage.fields.title}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>{ru.interviewsPage.fields.date}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>{ru.interviewsPage.fields.time}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>{ru.interviewsPage.fields.type}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>{ru.interviewsPage.fields.interviewer}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>{ru.interviewsPage.fields.status}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>{ru.interviewsPage.fields.score}</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>{ru.interviewsPage.fields.comment}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {interviews.map((item, i) => (
              <TableRow
                key={item.id}
                hover
                onClick={() => onRowClick(item)}
                sx={{ cursor: 'pointer' }}
                component={motion.tr}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
              >
                <TableCell sx={{ fontWeight: 600 }}>{item.title}</TableCell>
                <TableCell>{formatDate(item.scheduledAt)}</TableCell>
                <TableCell>{formatTime(item.scheduledAt)}</TableCell>
                <TableCell>
                  <InterviewFormatChip format={item.format} />
                </TableCell>
                <TableCell>{item.interviewerName}</TableCell>
                <TableCell>
                  <InterviewStatusChipFromInterview interview={item} />
                </TableCell>
                <TableCell>{scoreDisplay(item)}</TableCell>
                <TableCell sx={{ maxWidth: 220 }}>
                  <Tooltip title={item.comment}>
                    <Typography
                      variant="body2"
                      sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.comment}
                    </Typography>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
