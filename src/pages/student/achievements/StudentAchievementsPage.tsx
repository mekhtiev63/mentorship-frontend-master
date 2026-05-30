import { AchievementsGrid } from '@/widgets/achievements/ui/AchievementsGrid'
import { PageHeader } from '@/shared/ui'
import { ru } from '@/shared/i18n/ru'

export function StudentAchievementsPage() {
  return (
    <>
      <PageHeader title={ru.nav.achievements} subtitle={ru.achievements.pageSubtitle} />
      <AchievementsGrid />
    </>
  )
}
