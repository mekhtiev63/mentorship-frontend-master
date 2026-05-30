export type ApiEnvelope<T> = {
  data: T
}

export type ApiErrorBody = {
  error: {
    code: string
    message: string
  }
}

export type PaginationMeta = {
  page: number
  page_size: number
  total: number
  total_pages: number
}

export class AppError extends Error {
  readonly code: string
  readonly status?: number

  constructor(code: string, message: string, status?: number) {
    super(message)
    this.name = 'AppError'
    this.code = code
    this.status = status
  }
}
