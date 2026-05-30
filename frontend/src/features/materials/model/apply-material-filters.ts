import type { MaterialListItemVM, UiMaterialStatus, UiMaterialType } from '@/entities/materials'

export type MaterialsSortKey = 'order' | 'title' | 'status' | 'lastOpened'

export type MaterialsListControls = {
  query: string
  status: UiMaterialStatus | 'all'
  type: UiMaterialType | 'all'
  sort: MaterialsSortKey
}

export const defaultMaterialsListControls: MaterialsListControls = {
  query: '',
  status: 'all',
  type: 'all',
  sort: 'order',
}

const STATUS_ORDER: Record<UiMaterialStatus, number> = {
  not_started: 0,
  in_progress: 1,
  completed: 2,
}

export function applyMaterialFilters(
  items: MaterialListItemVM[],
  controls: MaterialsListControls,
): MaterialListItemVM[] {
  const q = controls.query.trim().toLowerCase()
  let result = items.filter((item) => {
    if (controls.status !== 'all' && item.uiStatus !== controls.status) {
      return false
    }
    if (controls.type !== 'all' && item.uiType !== controls.type) {
      return false
    }
    if (q && !item.title.toLowerCase().includes(q)) {
      return false
    }
    return true
  })

  result = [...result].sort((a, b) => {
    switch (controls.sort) {
      case 'title':
        return a.title.localeCompare(b.title, 'ru')
      case 'status':
        return STATUS_ORDER[a.uiStatus] - STATUS_ORDER[b.uiStatus]
      case 'lastOpened': {
        const ta = a.lastOpenedAt ? Date.parse(a.lastOpenedAt) : 0
        const tb = b.lastOpenedAt ? Date.parse(b.lastOpenedAt) : 0
        return tb - ta
      }
      case 'order':
      default:
        return a.sortOrder - b.sortOrder
    }
  })

  return result
}
