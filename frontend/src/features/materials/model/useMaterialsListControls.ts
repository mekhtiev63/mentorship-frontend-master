import { useCallback, useMemo, useState } from 'react'
import {
  applyMaterialFilters,
  defaultMaterialsListControls,
  type MaterialsListControls,
  type MaterialsSortKey,
} from '@/features/materials/model/apply-material-filters'
import type { MaterialListItemVM, UiMaterialStatus, UiMaterialType } from '@/entities/materials'

export function useMaterialsListControls(items: MaterialListItemVM[]) {
  const [controls, setControls] = useState<MaterialsListControls>(defaultMaterialsListControls)

  const filtered = useMemo(() => applyMaterialFilters(items, controls), [items, controls])

  const setQuery = useCallback((query: string) => {
    setControls((c) => ({ ...c, query }))
  }, [])

  const setStatus = useCallback((status: UiMaterialStatus | 'all') => {
    setControls((c) => ({ ...c, status }))
  }, [])

  const setType = useCallback((type: UiMaterialType | 'all') => {
    setControls((c) => ({ ...c, type }))
  }, [])

  const setSort = useCallback((sort: MaterialsSortKey) => {
    setControls((c) => ({ ...c, sort }))
  }, [])

  const resetFilters = useCallback(() => {
    setControls(defaultMaterialsListControls)
  }, [])

  return {
    controls,
    filtered,
    setQuery,
    setStatus,
    setType,
    setSort,
    resetFilters,
  }
}
