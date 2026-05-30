import { aggregateResultsSummary } from '@/entities/student-interviews/model/aggregate-results'
import { buildRecommendationBlocks } from '@/entities/student-interviews/model/build-recommendations'
import { applyInterviewFilters } from '@/entities/student-interviews/model/filter-interviews'
import { mapStudentInterview } from '@/entities/student-interviews/model/map-student-interview'
import {
  buildMockPreparation,
  buildMockStudentInterviews,
} from '@/entities/student-interviews/model/mock-student-interviews'
import { pickUpcomingInterviews } from '@/entities/student-interviews/model/pick-upcoming'
import { splitInterviewHistory } from '@/entities/student-interviews/model/split-history'
import type {
  InterviewFilterFormat,
  InterviewFilterKind,
  InterviewFilterStatus,
  InterviewsPageVM,
} from '@/entities/student-interviews/model/types'
import {
  listMockInterviewsApi,
  listRealInterviewsApi,
} from '@/entities/student-interviews/api/interviews.api'
import { meApi } from '@/entities/session/api/session.api'

async function loadAllInterviewsFromApi() {
  const [real, mock] = await Promise.all([listRealInterviewsApi(), listMockInterviewsApi()])
  return [...real, ...mock].map((dto) => mapStudentInterview(dto))
}

export async function fetchInterviewsPage(
  status: InterviewFilterStatus,
  format: InterviewFilterFormat,
  kind: InterviewFilterKind,
  search: string,
): Promise<InterviewsPageVM> {
  const me = await meApi().catch(() => null)
  if (!me) {
    const all = buildMockStudentInterviews()
    const upcoming = pickUpcomingInterviews(all)
    const history = splitInterviewHistory(all)
    const filteredHistory = applyInterviewFilters(history, status, format, kind, search)
    return {
      allInterviews: all,
      upcoming,
      history,
      filteredHistory,
      resultsSummary: aggregateResultsSummary(all),
      recommendations: buildRecommendationBlocks(all),
      preparation: buildMockPreparation(),
      dataSource: 'mock',
    }
  }

  const all = await loadAllInterviewsFromApi()
  const upcoming = pickUpcomingInterviews(all)
  const history = splitInterviewHistory(all)
  const filteredHistory = applyInterviewFilters(history, status, format, kind, search)

  return {
    allInterviews: all,
    upcoming,
    history,
    filteredHistory,
    resultsSummary: aggregateResultsSummary(all),
    recommendations: buildRecommendationBlocks(all),
    preparation: buildMockPreparation(),
    dataSource: 'api',
  }
}
