import type { RecommendationBlockVM, StudentInterviewVM } from '@/entities/student-interviews/model/types'

export function buildRecommendationBlocks(
  interviews: StudentInterviewVM[],
  limit = 3,
): RecommendationBlockVM[] {
  return interviews
    .filter((i) => i.kind === 'mock' && i.recommendations.length > 0)
    .sort((a, b) => (b.scheduledAt ?? '').localeCompare(a.scheduledAt ?? ''))
    .slice(0, limit)
    .map((i) => ({
      sourceInterviewId: i.id,
      buddyName: i.interviewerName,
      date: i.scheduledAt ?? '',
      format: i.format,
      items: i.recommendations,
      href: i.href,
    }))
}
