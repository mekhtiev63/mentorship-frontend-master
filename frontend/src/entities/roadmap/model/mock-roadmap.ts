import type { RoadmapBlockWithMaterials } from '@/entities/roadmap/model/merge-roadmap-progress'
import { mergeRoadmapWithProgress } from '@/entities/roadmap/model/merge-roadmap-progress'
import type { BlockProgressDto, RoadmapBlockVM, StudentRoadmapPageData } from '@/entities/roadmap/model/types'
import { ru } from '@/shared/i18n/ru'

const stepTitles = Object.values(ru.roadmap.steps)

function mockBlockId(index: number): string {
  return `mock-block-${index + 1}`
}

export function buildMockRoadmapBlocks(): RoadmapBlockWithMaterials[] {
  return stepTitles.map((title, index) => {
    const id = mockBlockId(index)
    const sortOrder = index + 1
    const materialCount = 3 + (index % 3)
    const materials = Array.from({ length: materialCount }, (_, m) => ({
      id: `${id}-mat-${m + 1}`,
      blockId: id,
      sortOrder: m + 1,
      title: `Материал ${m + 1}: ${title}`,
      materialType: m % 2 === 0 ? 'article' : 'video',
      url: 'https://go.dev/doc/',
      required: true,
      isActive: true,
    }))

    const description =
      index === 2
        ? 'Изучите горутины, каналы и типовые паттерны конкурентности в Go.'
        : `Блок «${title}»: практика и теория для роста как Go-разработчик.`

    return {
      block: {
        id,
        sortOrder,
        title,
        description,
        expectedSkills: [],
        status: 'published',
        isActive: true,
      },
      materials,
    }
  })
}

export function buildMockProgress(blocks: RoadmapBlockWithMaterials[]): BlockProgressDto[] {
  return blocks.map(({ block, materials }, index) => {
    const required = materials.filter((m) => m.required).length || materials.length

    if (index < 2) {
      return {
        blockId: block.id,
        sortOrder: block.sortOrder,
        title: block.title,
        status: 'approved' as const,
        requiredMaterials: required,
        viewedMaterials: required,
      }
    }
    if (index === 2) {
      return {
        blockId: block.id,
        sortOrder: block.sortOrder,
        title: block.title,
        status: 'in_progress' as const,
        requiredMaterials: required,
        viewedMaterials: Math.max(1, Math.floor(required / 2)),
      }
    }
    return {
      blockId: block.id,
      sortOrder: block.sortOrder,
      title: block.title,
      status: 'not_started' as const,
      requiredMaterials: required,
      viewedMaterials: 0,
    }
  })
}

export function buildMockStudentRoadmapPage(): StudentRoadmapPageData {
  const roadmapBlocks = buildMockRoadmapBlocks()
  const progress = buildMockProgress(roadmapBlocks)
  return mergeRoadmapWithProgress(roadmapBlocks, progress)
}

export function buildMockBlockDetail(blockId: string): RoadmapBlockVM | null {
  const page = buildMockStudentRoadmapPage()
  return page.blocks.find((b) => b.id === blockId) ?? null
}
