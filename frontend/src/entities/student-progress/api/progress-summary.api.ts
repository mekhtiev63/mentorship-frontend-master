import { apiClient } from '@/shared/api/client'
import type { ApiEnvelope } from '@/shared/api/types'
import type { ProgressPeriod } from '@/entities/student-progress/model/types'
import type { StudentProgressSummaryApi } from '@/entities/student-progress/model/summary-api-types'

/** V2 aggregate — returns null until backend implements the endpoint. */
export async function getProgressSummaryApi(
  period: ProgressPeriod,
): Promise<StudentProgressSummaryApi | null> {
  try {
    const { data } = await apiClient.get<ApiEnvelope<StudentProgressSummaryApi>>(
      '/me/progress/summary',
      { params: { period } },
    )
    return data.data
  } catch {
    return null
  }
}
