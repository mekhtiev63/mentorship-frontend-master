import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import type { MaterialContentDto, QuizResultDto } from '@/entities/material-detail'
import { ru } from '@/shared/i18n/ru'
import { glassSurface } from '@/shared/theme/palette'

type QuizContentPanelProps = {
  content: Extract<MaterialContentDto, { kind: 'quiz' }>
  answers: Record<string, string[]>
  onAnswer: (questionId: string, optionIds: string[]) => void
  result: QuizResultDto | null
  onSubmit: () => void
}

export function QuizContentPanel({ content, answers, onAnswer, result, onSubmit }: QuizContentPanelProps) {
  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ ...glassSurface, p: 3, borderRadius: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        {ru.materialDetail.quiz.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {ru.materialDetail.quiz.passing}: {content.passingScorePercent}%
      </Typography>

      <Stack spacing={3}>
        {content.questions.map((q) => (
          <Box key={q.id} sx={{ p: 2, borderRadius: 2, bgcolor: 'rgba(255,255,255,0.03)' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1.5 }}>
              {q.prompt}
            </Typography>
            {q.multiSelect ? (
              <FormGroup>
                {q.options.map((opt) => {
                  const selected = answers[q.id]?.includes(opt.id) ?? false
                  return (
                    <FormControlLabel
                      key={opt.id}
                      control={
                        <Checkbox
                          checked={selected}
                          onChange={() => {
                            const prev = answers[q.id] ?? []
                            const next = selected ? prev.filter((id) => id !== opt.id) : [...prev, opt.id]
                            onAnswer(q.id, next)
                          }}
                        />
                      }
                      label={opt.label}
                    />
                  )
                })}
              </FormGroup>
            ) : (
              <RadioGroup
                value={answers[q.id]?.[0] ?? ''}
                onChange={(_, v) => onAnswer(q.id, v ? [v] : [])}
              >
                {q.options.map((opt) => (
                  <FormControlLabel key={opt.id} value={opt.id} control={<Radio />} label={opt.label} />
                ))}
              </RadioGroup>
            )}
          </Box>
        ))}
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mt: 3, alignItems: 'center' }}>
        <Button variant="contained" onClick={onSubmit}>
          {ru.materialDetail.quiz.submit}
        </Button>
        {result ? (
          <Alert severity={result.passed ? 'success' : 'warning'} sx={{ flex: 1 }}>
            {ru.materialDetail.quiz.result}: {result.scorePercent}% —{' '}
            {result.passed ? ru.materialDetail.quiz.passed : ru.materialDetail.quiz.failed} (
            {ru.materialDetail.quiz.score}: {result.correctCount}/{result.totalCount})
          </Alert>
        ) : null}
      </Stack>
    </Box>
  )
}
