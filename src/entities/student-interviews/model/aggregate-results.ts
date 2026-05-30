import type { ResultsSummaryVM, StudentInterviewVM } from '@/entities/student-interviews/model/types'
import { ru } from '@/shared/i18n/ru'

export function aggregateResultsSummary(interviews: StudentInterviewVM[]): ResultsSummaryVM {
  const history = interviews.filter(
    (i) => i.uiStatus === 'completed' || i.uiStatus === 'awaiting_score' || i.uiStatus === 'cancelled',
  )
  const completed = history.filter((i) => i.uiStatus === 'completed')
  const awaiting = history.filter((i) => i.uiStatus === 'awaiting_score')
  const scored = completed.filter((i) => i.score != null)
  const averageScore =
    scored.length > 0 ? scored.reduce((s, i) => s + (i.score ?? 0), 0) / scored.length : null

  const lastReal = interviews
    .filter((i) => i.kind === 'real' && i.apiStatus === 'completed')
    .sort((a, b) => (b.scheduledAt ?? '').localeCompare(a.scheduledAt ?? ''))[0]

  const outcomeKey = lastReal?.apiOutcome as keyof typeof ru.interviewsPage.outcome | undefined
  const lastOutcomeLabel = outcomeKey
    ? (ru.interviewsPage.outcome[outcomeKey] ?? ru.interviewsPage.results.noOutcome)
    : ru.interviewsPage.results.noOutcome

  return {
    averageScore,
    completedCount: completed.length,
    awaitingCount: awaiting.length,
    lastOutcomeLabel,
  }
}
