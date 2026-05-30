export type BlockProgressApi = {
  blockId: string
  title: string
  status: string
  requiredMaterials: number
  viewedMaterials: number
}

export type UserAchievementApi = {
  code: string
  title: string
  description: string
  grantedAt: string
}

export type BonusBalanceApi = {
  balance: number
  activeDiscountPercent?: number
  remainingDiscountHeadroom?: number
}

export type ActivityEntryApi = {
  id: string
  verb: string
  activity_type: string
  occurred_at: string
}

export type RoadmapBlockApi = {
  block: {
    id: string
    title: string
    status: string
  }
}
