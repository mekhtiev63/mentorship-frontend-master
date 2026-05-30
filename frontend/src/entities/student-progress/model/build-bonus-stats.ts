import type { BonusTransactionApi } from '@/entities/student-progress/model/api-types'
import type { BonusPeriodStats } from '@/entities/student-progress/model/types'
import type { ProgressPeriod } from '@/entities/student-progress/model/types'
import { isWithinPeriod } from '@/entities/student-progress/model/period'

export function buildBonusStats(
  balance: number,
  transactions: BonusTransactionApi[],
  period: ProgressPeriod,
): BonusPeriodStats {
  let earned = 0
  let spent = 0
  for (const tx of transactions) {
    if (!isWithinPeriod(tx.createdAt, period)) continue
    if (tx.amount > 0) earned += tx.amount
    else spent += Math.abs(tx.amount)
  }
  return { balance, earnedInPeriod: earned, spentInPeriod: spent }
}
