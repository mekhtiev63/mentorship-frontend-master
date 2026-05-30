export type UiBlockStatus = 'completed' | 'in_progress' | 'locked'

export type ProgressApiStatus =
  | 'not_started'
  | 'in_progress'
  | 'awaiting_approval'
  | 'approved'
  | 'rejected'
  | ''

export type RoadmapMaterialDto = {
  id: string
  blockId: string
  sortOrder: number
  title: string
  materialType: string
  url: string
  required: boolean
  isActive: boolean
}

export type RoadmapBlockDto = {
  id: string
  sortOrder: number
  title: string
  description: string
  expectedSkills?: string[]
  status: string
  isActive: boolean
}

export type BlockProgressDto = {
  blockId: string
  sortOrder: number
  title: string
  status: ProgressApiStatus
  submittedAt?: string | null
  approvedAt?: string | null
  rejectedAt?: string | null
  rejectReason?: string | null
  requiredMaterials: number
  viewedMaterials: number
}

export type RoadmapMaterialVM = {
  id: string
  title: string
  materialType: string
  url: string
  required: boolean
  viewed: boolean
}

export type RoadmapBlockVM = {
  id: string
  sortOrder: number
  title: string
  description: string
  skills: string[]
  uiStatus: UiBlockStatus
  progressStatus: ProgressApiStatus
  rejectReason?: string | null
  totalMaterials: number
  requiredCount: number
  completedCount: number
  percent: number
  materials: RoadmapMaterialVM[]
}

export type RoadmapPageSummary = {
  completedBlocks: number
  totalBlocks: number
  programPercent: number
  currentBlockTitle?: string
}

export type StudentRoadmapPageData = {
  blocks: RoadmapBlockVM[]
  summary: RoadmapPageSummary
  progressPartialError: boolean
}

export type StudentRoadmapBlockDetail = {
  block: RoadmapBlockVM
  materials: RoadmapMaterialVM[]
}
