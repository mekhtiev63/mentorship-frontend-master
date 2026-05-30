export type MaterialApiType = 'video' | 'article' | 'task' | 'link'

export type MaterialApiDto = {
  id: string
  blockId: string
  sortOrder: number
  title: string
  materialType: MaterialApiType | string
  url: string
  required: boolean
  isActive: boolean
  createdAt?: string
  updatedAt?: string
  description?: string
  durationMinutes?: number
}

export type MaterialProgressApiDto = {
  materialId: string
  title?: string
  required: boolean
  viewed: boolean
  progressPercent?: number
  lastOpenedAt?: string | null
}

export type UiMaterialType = 'article' | 'video' | 'practice' | 'quiz'

export type UiMaterialStatus = 'not_started' | 'in_progress' | 'completed'

export type MaterialListItemVM = {
  id: string
  blockId: string
  title: string
  description: string
  uiType: UiMaterialType
  durationMinutes: number | null
  uiStatus: UiMaterialStatus
  progressPercent: number
  lastOpenedAt: string | null
  required: boolean
  url: string
  sortOrder: number
}

export type BlockMaterialsPageVM = {
  blockId: string
  blockTitle: string
  blockDescription: string
  blockLocked: boolean
  blockPercent: number
  items: MaterialListItemVM[]
  progressPartialError: boolean
}

export type MaterialDetailVM = MaterialListItemVM & {
  blockTitle: string
}
