import type { MaterialApiType, UiMaterialType } from '@/entities/materials/model/types'

export function mapApiTypeToUi(apiType: string, sortOrder: number): UiMaterialType {
  switch (apiType as MaterialApiType) {
    case 'video':
      return 'video'
    case 'task':
      return 'practice'
    case 'article':
    case 'link':
      return 'article'
    default:
      return sortOrder % 4 === 3 ? 'quiz' : 'article'
  }
}

export function defaultDurationForType(uiType: UiMaterialType): number {
  switch (uiType) {
    case 'video':
      return 25
    case 'practice':
      return 45
    case 'quiz':
      return 20
    case 'article':
    default:
      return 15
  }
}
