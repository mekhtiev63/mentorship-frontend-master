import { StudentDashboardPage } from '@/pages/student/dashboard/StudentDashboardPage'
import { StudentProfilePage } from '@/pages/student/profile/StudentProfilePage'

export { StudentProfilePage }

export { StudentRoadmapPage } from '@/pages/student/roadmap/StudentRoadmapPage'
export { BlockOverviewPage } from '@/pages/materials/BlockOverviewPage'

export { ProgressPage as StudentProgressPage } from '@/pages/progress'

export { StudentAchievementsPage } from '@/pages/student/achievements/StudentAchievementsPage'

export { StudentBonusesPage } from '@/pages/student/bonuses/StudentBonusesPage'

export {
  InterviewsPage as StudentInterviewsPage,
  InterviewRealDetailPage as StudentInterviewRealPage,
  InterviewMockDetailPage as StudentInterviewMockPage,
} from '@/pages/student/interviews'

export { CalendarPage as StudentCalendarPage } from '@/pages/calendar/CalendarPage'
export { CalendarEventPage as StudentCalendarEventPage } from '@/pages/calendar/CalendarEventPage'

export {
  OneOnOneListPage as StudentOneOnOnePage,
  OneOnOneDetailPage as StudentOneOnOneDetailPage,
} from '@/pages/student/one-on-one'

export { StudentSettingsPage } from '@/pages/student/settings'

export function StudentHomePage() {
  return <StudentDashboardPage />
}

export { StudentDashboardPage }
