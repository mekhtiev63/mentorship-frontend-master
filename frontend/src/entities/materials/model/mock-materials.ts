import { mergeRoadmapWithProgress } from '@/entities/roadmap/model/merge-roadmap-progress'
import { buildMockRoadmapBlocks } from '@/entities/roadmap/model/mock-roadmap'
import type { BlockMaterialsPageVM, MaterialApiDto } from '@/entities/materials/model/types'
import { mergeBlockMaterials } from '@/entities/materials/model/merge-block-materials'

const MOCK_DESCRIPTIONS = [
  'Краткий обзор темы и ключевые термины для самостоятельного изучения.',
  'Практические примеры и типовые ошибки, которые встречаются в проектах.',
  'Видеоразбор с демонстрацией кода и чек-лист для закрепления.',
  'Тестовые вопросы для проверки понимания материала блока.',
]

export function buildMockMaterialsApi(blockId: string): MaterialApiDto[] {
  const blocks = buildMockRoadmapBlocks()
  const entry = blocks.find((b) => b.block.id === blockId) ?? blocks[0]
  return entry.materials.map((m, index) => ({
    ...m,
    materialType: index % 4 === 0 ? 'article' : index % 4 === 1 ? 'video' : index % 4 === 2 ? 'task' : 'video',
    description: MOCK_DESCRIPTIONS[index % MOCK_DESCRIPTIONS.length],
    durationMinutes: 10 + index * 5,
  }))
}

export function buildMockBlockMaterialsPage(blockId: string): BlockMaterialsPageVM {
  const blocks = buildMockRoadmapBlocks()
  const entry = blocks.find((b) => b.block.id === blockId) ?? blocks[0]
  const page = mergeRoadmapWithProgress([entry], null)
  const block = page.blocks[0]
  const materials = buildMockMaterialsApi(block.id)

  const progressItems = materials.map((m, i) => {
    const viewed = i < 2
    const inProgress = i === 2
    return {
      materialId: m.id,
      required: m.required,
      viewed: viewed || inProgress,
      progressPercent: viewed ? 100 : inProgress ? 55 : 0,
      lastOpenedAt: viewed || inProgress ? new Date(Date.now() - i * 86400000).toISOString() : null,
    }
  })

  return mergeBlockMaterials(block, materials, progressItems)
}
