import CloseIcon from '@mui/icons-material/Close'
import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import type { StudentInterviewVM } from '@/entities/student-interviews'
import { formatRuTimeRange } from '@/shared/lib/datetime'
import { ru } from '@/shared/i18n/ru'
import { InterviewFormatChip } from '@/widgets/student-interviews/ui/InterviewFormatChip'
import { InterviewStatusChipFromInterview } from '@/widgets/student-interviews/ui/InterviewStatusChip'

type InterviewDetailsDrawerProps = {
  open: boolean
  interview: StudentInterviewVM | null
  onClose: () => void
}

export function InterviewDetailsDrawer({ open, interview, onClose }: InterviewDetailsDrawerProps) {
  const when =
    interview?.scheduledAt && interview.endsAt
      ? formatRuTimeRange(interview.scheduledAt, interview.endsAt)
      : '—'

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: { xs: '100%', sm: 420 } } } }}
    >
      <Box sx={{ p: 2.5 }}>
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            {ru.interviewsPage.drawer.title}
          </Typography>
          <IconButton onClick={onClose} aria-label={ru.interviewsPage.actions.closeDrawer}>
            <CloseIcon />
          </IconButton>
        </Stack>

        {interview ? (
          <Box component={motion.div} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
              {interview.title}
            </Typography>
            <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
              <InterviewFormatChip format={interview.format} />
              <InterviewStatusChipFromInterview interview={interview} />
            </Stack>

            <Stack spacing={2}>
              <Box>
                <Typography variant="overline" color="text.secondary">
                  {ru.interviewsPage.fields.date}
                </Typography>
                <Typography variant="body1">{when}</Typography>
              </Box>
              <Box>
                <Typography variant="overline" color="text.secondary">
                  {ru.interviewsPage.fields.interviewer}
                </Typography>
                <Typography variant="body1">{interview.interviewerName}</Typography>
              </Box>
              {interview.score != null ? (
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    {ru.interviewsPage.fields.score}
                  </Typography>
                  <Typography variant="body1">
                    {interview.score} / {interview.scoreMax}
                  </Typography>
                </Box>
              ) : null}
              <Box>
                <Typography variant="overline" color="text.secondary">
                  {ru.interviewsPage.fields.comment}
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                  {interview.comment}
                </Typography>
              </Box>
              {interview.recommendations.length > 0 ? (
                <Box>
                  <Typography variant="overline" color="text.secondary">
                    {ru.interviewsPage.detail.recommendations}
                  </Typography>
                  <Box component="ul" sx={{ pl: 2.5, m: 0 }}>
                    {interview.recommendations.map((r) => (
                      <Typography component="li" variant="body2" key={r}>
                        {r}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              ) : null}
            </Stack>

            <Stack spacing={1} sx={{ mt: 3 }}>
              <Button
                component={RouterLink}
                to={interview.href}
                variant="contained"
                fullWidth
                sx={{ textTransform: 'none', fontWeight: 700 }}
                onClick={onClose}
              >
                {ru.interviewsPage.actions.openFull}
              </Button>
              <Button fullWidth onClick={onClose} sx={{ textTransform: 'none' }}>
                {ru.interviewsPage.actions.closeDrawer}
              </Button>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Drawer>
  )
}
