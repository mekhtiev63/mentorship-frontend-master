import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { CalendarEventFilter, CalendarViewMode } from '@/entities/student-calendar'

const DEFAULT_VIEW: CalendarViewMode = 'month'
const DEFAULT_FILTER: CalendarEventFilter = 'all'

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10)
}

function isView(v: string | null): v is CalendarViewMode {
  return v === 'month' || v === 'week' || v === 'day'
}

function isFilter(f: string | null): f is CalendarEventFilter {
  return f === 'all' || f === 'interviews' || f === 'meetings' || f === 'deadlines'
}

export function useCalendarViewState() {
  const [searchParams, setSearchParams] = useSearchParams()

  const view = useMemo(() => {
    const raw = searchParams.get('view')
    return isView(raw) ? raw : DEFAULT_VIEW
  }, [searchParams])

  const filter = useMemo(() => {
    const raw = searchParams.get('filter')
    return isFilter(raw) ? raw : DEFAULT_FILTER
  }, [searchParams])

  const anchorDate = useMemo(() => searchParams.get('date') ?? todayIsoDate(), [searchParams])

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
    view,
    filter,
    anchorDate,
    search,
    setView: (v: CalendarViewMode) => patch({ view: v }),
    setFilter: (f: CalendarEventFilter) => patch({ filter: f }),
    setAnchorDate: (d: string) => patch({ date: d }),
    setSearch: (q: string) => patch({ q: q || null }),
  }
}
