import type { UiMaterialType } from '@/entities/materials'

export type MaterialDetailStatus = 'not_started' | 'in_progress' | 'completed'

export type ArticleSectionDto = {
  id: string
  title: string
  bodyMarkdown: string
  sortOrder: number
}

export type VideoChapterDto = {
  id: string
  title: string
  startSec: number
}

export type QuizOptionDto = { id: string; label: string }

export type QuizQuestionDto = {
  id: string
  prompt: string
  options: QuizOptionDto[]
  multiSelect?: boolean
  correctOptionIds?: string[]
}

export type MaterialContentDto =
  | {
      kind: 'article'
      summary: string
      estimatedMinutes: number
      sections: ArticleSectionDto[]
    }
  | {
      kind: 'video'
      summary: string
      estimatedMinutes: number
      playbackUrl: string
      posterUrl?: string
      chapters: VideoChapterDto[]
      durationSec: number
    }
  | {
      kind: 'practice'
      taskMarkdown: string
      acceptanceCriteria: string[]
      submitHint: string
    }
  | {
      kind: 'quiz'
      passingScorePercent: number
      questions: QuizQuestionDto[]
    }

export type MaterialMetaDto = {
  id: string
  blockId: string
  sortOrder: number
  title: string
  url: string
  required: boolean
}

export type MaterialProgressDto = {
  materialId: string
  status: MaterialDetailStatus
  progressPercent: number
  lastOpenedAt: string | null
}

export type QuizResultDto = {
  scorePercent: number
  passed: boolean
  correctCount: number
  totalCount: number
}

export type MaterialDetailPageVM = {
  meta: MaterialMetaDto
  uiType: UiMaterialType
  blockTitle: string
  progress: MaterialProgressDto
  content: MaterialContentDto
  neighbors: { prevId: string | null; nextId: string | null }
}
