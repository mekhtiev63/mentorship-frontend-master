import { getMockInterviewApi, getRealInterviewApi } from '@/entities/student-interviews/api/interviews.api'
import { mapStudentInterview } from '@/entities/student-interviews/model/map-student-interview'
import { findMockInterviewById } from '@/entities/student-interviews/model/mock-student-interviews'
import type { StudentInterviewVM } from '@/entities/student-interviews/model/types'
import { isApiSessionActive } from '@/shared/lib/session'

export async function fetchInterviewRealDetail(interviewId: string): Promise<StudentInterviewVM> {
  if (!isApiSessionActive()) {
    const mockHit = findMockInterviewById(interviewId)
    if (mockHit?.kind === 'real') return mockHit
  }

  const dto = await getRealInterviewApi(interviewId)
  return mapStudentInterview(dto)
}

export async function fetchInterviewMockDetail(interviewId: string): Promise<StudentInterviewVM> {
  if (!isApiSessionActive()) {
    const mockHit = findMockInterviewById(interviewId)
    if (mockHit) return mockHit
  }

  const dto = await getMockInterviewApi(interviewId)
  return mapStudentInterview(dto)
}

export function findInterviewInMock(id: string): StudentInterviewVM | null {
  return findMockInterviewById(id)
}
