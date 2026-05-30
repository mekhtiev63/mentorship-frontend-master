import type { BonusTransactionApi } from '@/entities/student-progress/model/api-types'

export type StudentBonusesPageVM = {
  balance: number
  activeDiscountPercent: number
  transactions: BonusTransactionApi[]
  dataSource: 'api' | 'mock'
}
