import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Avatar, Box, Button, Chip, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import type { StudentInterviewVM } from '@/entities/student-interviews'
import { formatAccentColor, uiStatusAccentColor } from '@/entities/student-interviews'
import { formatRuTimeRange } from '@/shared/lib/datetime'
import { ru } from '@/shared/i18n/ru'
import { glassSurface } from '@/shared/theme/palette'
import { InterviewFormatChip } from '@/widgets/student-interviews/ui/InterviewFormatChip'
import { InterviewStatusChipFromInterview } from '@/widgets/student-interviews/ui/InterviewStatusChip'

type InterviewDetailCardProps = {
  interview: StudentInterviewVM
}

export function InterviewDetailCard({ interview }: InterviewDetailCardProps) {
  const accent =
    interview.uiStatus === 'completed'
      ? uiStatusAccentColor('completed')
      : formatAccentColor(interview.format)
  const when =
    interview.scheduledAt && interview.endsAt
      ? formatRuTimeRange(interview.scheduledAt, interview.endsAt)
      : '—'

  const pageTitle =
    interview.kind === 'real' ? ru.interviewsPage.detail.realTitle : ru.interviewsPage.detail.mockTitle

  const outcomeLabel =
    interview.kind === 'real' && interview.apiOutcome
      ? ru.interviewsPage.outcome[interview.apiOutcome as keyof typeof ru.interviewsPage.outcome] ??
        interview.apiOutcome
      : null

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{
        ...glassSurface,
        p: { xs: 2, sm: 3 },
        borderRadius: 3,
        borderLeft: `4px solid ${accent}`,
        boxShadow: `0 0 28px ${accent}33`,
      }}
    >
      <Button
        component={RouterLink}
        to="/student/interviews"
        startIcon={<ArrowBackIcon />}
        size="small"
        sx={{ mb: 2 }}
      >
        {ru.interviewsPage.detail.back}
      </Button>

      <Stack direction="row" spacing={2} sx={{ mb: 2, alignItems: 'flex-start' }}>
        {interview.kind === 'mock' ? (
          <Avatar src={interview.interviewerAvatarUrl ?? undefined} sx={{ width: 56, height: 56 }}>
            {interview.interviewerName.slice(0, 1)}
          </Avatar>
        ) : null}
        <Box sx={{ flex: 1 }}>
          <Typography variant="overline" color="text.secondary">
            {pageTitle}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            {interview.title}
          </Typography>
          <Stack direction="row" spacing={0.5} sx={{ flexWrap: 'wrap', gap: 0.5 }}>
            <InterviewFormatChip format={interview.format} size="medium" />
            <InterviewStatusChipFromInterview interview={interview} />
            <Chip label={ru.interviewsPage.kind[interview.kind]} size="small" variant="outlined" />
          </Stack>
        </Box>
      </Stack>

      {interview.score != null ? (
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: accent }}>
          {interview.score} / {interview.scoreMax}
        </Typography>
      ) : null}

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
        {outcomeLabel ? (
          <Box>
            <Typography variant="overline" color="text.secondary">
              {ru.interviewsPage.fields.outcome}
            </Typography>
            <Typography variant="body1">{outcomeLabel}</Typography>
          </Box>
        ) : null}
        <Box>
          <Typography variant="overline" color="text.secondary">
            {interview.kind === 'mock'
              ? ru.interviewsPage.detail.mentorComment
              : ru.interviewsPage.fields.comment}
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
            {interview.comment}
          </Typography>
        </Box>
        {interview.recommendations.length > 0 ? (
          <Box>
            <Typography variant="overline" color="text.secondary">
              {ru.interviewsPage.detail.recommendations}
            </Typography>
            <Box component="ol" sx={{ pl: 2.5, m: 0 }}>
              {interview.recommendations.map((r) => (
                <Typography component="li" variant="body1" key={r} sx={{ mb: 0.5 }}>
                  {r}
                </Typography>
              ))}
            </Box>
          </Box>
        ) : null}
      </Stack>
    </Box>
  )
}
