import { apiClient } from '@/shared/api/client'
import type { ApiEnvelope } from '@/shared/api/types'
import type { InterviewApiDto } from '@/entities/student-interviews/model/types'

type ListPayload = { items: InterviewApiDto[]; meta?: unknown }

export async function listRealInterviewsApi(params?: { page?: number; perPage?: number; status?: string }) {
  const { data } = await apiClient.get<ApiEnvelope<ListPayload>>('/interviews/real', {
    params: { page: params?.page ?? 1, per_page: params?.perPage ?? 50, status: params?.status },
  })
  return data.data.items ?? []
}

export async function listMockInterviewsApi(params?: { page?: number; perPage?: number; status?: string }) {
  const { data } = await apiClient.get<ApiEnvelope<ListPayload>>('/interviews/mock', {
    params: { page: params?.page ?? 1, per_page: params?.perPage ?? 50, status: params?.status },
  })
  return data.data.items ?? []
}

export async function getRealInterviewApi(interviewId: string): Promise<InterviewApiDto> {
  const { data } = await apiClient.get<ApiEnvelope<InterviewApiDto>>(`/interviews/real/${interviewId}`)
  return data.data
}

export async function getMockInterviewApi(interviewId: string): Promise<InterviewApiDto> {
  const { data } = await apiClient.get<ApiEnvelope<InterviewApiDto>>(`/interviews/mock/${interviewId}`)
  return data.data
}

export async function getMockInterviewFeedbackApi(interviewId: string): Promise<string> {
  const { data } = await apiClient.get<ApiEnvelope<{ feedback: string }>>(
    `/interviews/mock/${interviewId}/feedback`,
  )
  return data.data.feedback ?? ''
}
