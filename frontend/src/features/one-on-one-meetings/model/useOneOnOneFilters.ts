import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { OneOnOneFilterGroup } from '@/entities/student-one-on-one'

const DEFAULT_GROUP: OneOnOneFilterGroup = 'all'

function isGroup(g: string | null): g is OneOnOneFilterGroup {
  return g === 'all' || g === 'scheduled' || g === 'completed' || g === 'cancelled'
}

export function useOneOnOneFilters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const group = useMemo(() => {
    const raw = searchParams.get('group')
    return isGroup(raw) ? raw : DEFAULT_GROUP
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
    group,
    search,
    setGroup: (g: OneOnOneFilterGroup) => patch({ group: g === 'all' ? null : g }),
    setSearch: (q: string) => patch({ q: q || null }),
  }
}
