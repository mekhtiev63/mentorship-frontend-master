import {
  getBonusBalanceApi,
  listBonusTransactionsApi,
} from '@/entities/student-bonus/api/bonus.api'
import type { StudentBonusesPageVM } from '@/entities/student-bonus/model/types'
import { meApi } from '@/entities/session/api/session.api'

const mockVm: StudentBonusesPageVM = {
  balance: 120,
  activeDiscountPercent: 10,
  transactions: [
    {
      id: 'mock-1',
      amount: 50,
      type: 'credit',
      createdAt: '2026-05-01T12:00:00Z',
    },
  ],
  dataSource: 'mock',
}

export async function fetchStudentBonusesPage(): Promise<StudentBonusesPageVM> {
  const me = await meApi().catch(() => null)
  if (!me) {
    return mockVm
  }

  const [balance, transactions] = await Promise.all([
    getBonusBalanceApi(),
    listBonusTransactionsApi(),
  ])

  return {
    balance: balance.balance,
    activeDiscountPercent: balance.activeDiscountPercent ?? 0,
    transactions,
    dataSource: 'api',
  }
}
