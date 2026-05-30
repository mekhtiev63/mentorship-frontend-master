import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { SettingsSectionId } from '@/entities/user-settings'

const DEFAULT: SettingsSectionId = 'account'

function isSection(v: string | null): v is SettingsSectionId {
  return v === 'account' || v === 'security' || v === 'notifications' || v === 'interface' || v === 'info'
}

export function useSettingsSection() {
  const [searchParams, setSearchParams] = useSearchParams()

  const section = useMemo(() => {
    const raw = searchParams.get('section')
    return isSection(raw) ? raw : DEFAULT
  }, [searchParams])

  const setSection = useCallback(
    (s: SettingsSectionId) => {
      setSearchParams(
        (prev) => {
          const p = new URLSearchParams(prev)
          if (s === DEFAULT) p.delete('section')
          else p.set('section', s)
          return p
        },
        { replace: true },
      )
    },
    [setSearchParams],
  )

  return { section, setSection }
}
