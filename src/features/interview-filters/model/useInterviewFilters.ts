import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type {
  InterviewFilterFormat,
  InterviewFilterKind,
  InterviewFilterStatus,
} from '@/entities/student-interviews'

const DEFAULT_STATUS: InterviewFilterStatus = 'all'
const DEFAULT_FORMAT: InterviewFilterFormat = 'all'
const DEFAULT_KIND: InterviewFilterKind = 'all'

function isStatus(v: string | null): v is InterviewFilterStatus {
  return (
    v === 'all' ||
    v === 'scheduled' ||
    v === 'completed' ||
    v === 'cancelled' ||
    v === 'awaiting_score'
  )
}

function isFormat(v: string | null): v is InterviewFilterFormat {
  return (
    v === 'all' ||
    v === 'technical' ||
    v === 'behavioral' ||
    v === 'go' ||
    v === 'system_design' ||
    v === 'hr'
  )
}

function isKind(v: string | null): v is InterviewFilterKind {
  return v === 'all' || v === 'mock' || v === 'real'
}

export function useInterviewFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const status = useMemo(() => {
    const raw = searchParams.get('status')
    return isStatus(raw) ? raw : DEFAULT_STATUS
  }, [searchParams])

  const format = useMemo(() => {
    const raw = searchParams.get('format')
    return isFormat(raw) ? raw : DEFAULT_FORMAT
  }, [searchParams])

  const kind = useMemo(() => {
    const raw = searchParams.get('kind')
    return isKind(raw) ? raw : DEFAULT_KIND
  }, [searchParams])

  const search = useMemo(() => searchParams.get('q') ?? '', [searchParams])

  const patch = useCallback(
    (patch: Record<string, string | null>) => {
      setSearchParams(
        (prev) => {
          const p = new URLSearchParams(prev)
          for (const [k, v] of Object.entries(patch)) {
            if (v === null || v === '') p.delete(k)
            else p.set(k, v)
          }
          return p
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  return {
    status,
    format,
    kind,
    search,
    setStatus: (s: InterviewFilterStatus) => patch({ status: s === 'all' ? null : s }),
    setFormat: (f: InterviewFilterFormat) => patch({ format: f === 'all' ? null : f }),
    setKind: (k: InterviewFilterKind) => patch({ kind: k === 'all' ? null : k }),
    setSearch: (q: string) => patch({ q: q || null }),
  }
}
