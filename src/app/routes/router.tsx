import { GuestRoute, ProtectedRoute, RoleRoute, RootRedirect } from '@/app/routes/guards'
import { AuthLayout } from '@/widgets/app-shell/AuthLayout'
import { BuddyLayout } from '@/widgets/app-shell/BuddyLayout'
import { StudentLayout } from '@/widgets/app-shell/StudentLayout'
import { LoginPage } from '@/pages/auth/LoginPage'
import { SelectRolePage } from '@/pages/auth/SelectRolePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import {
  BuddyCalendarPage,
  BuddyFinalCheckDetailPage,
  BuddyFinalChecksPage,
  BuddyInterviewsPage,
  BuddySettingsPage,
  BuddyStudentDetailsPage,
  BuddyStudentsPage,
} from '@/pages/buddy'
import {
  BlockMaterialsPage,
  BlockOverviewPage,
} from '@/pages/materials'
import { MaterialDetailPage } from '@/pages/material-details'
import { CalendarEventPage, CalendarPage } from '@/pages/calendar'
import { ProgressPage } from '@/pages/progress'
import {
  StudentAchievementsPage,
  StudentBonusesPage,
  StudentHomePage,
  StudentInterviewMockPage,
  StudentInterviewRealPage,
  StudentInterviewsPage,
  StudentOneOnOneDetailPage,
  StudentOneOnOnePage,
  StudentProfilePage,
  StudentRoadmapPage,
  StudentSettingsPage,
} from '@/pages/student'
import { ROLES } from '@/shared/lib/roles'
import { createBrowserRouter, Navigate } from 'react-router-dom'

export const router = createBrowserRouter([
  { path: '/', element: <RootRedirect /> },
  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [{ path: '/login', element: <LoginPage /> }],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [{ path: '/select-role', element: <SelectRolePage /> }],
      },
      {
        path: '/student',
        element: <RoleRoute role={ROLES.student} />,
        children: [
          {
            element: <StudentLayout />,
            children: [
              { index: true, element: <StudentHomePage /> },
              { path: 'profile', element: <StudentProfilePage /> },
              { path: 'roadmap', element: <StudentRoadmapPage /> },
              { path: 'roadmap/blocks/:blockId', element: <BlockOverviewPage /> },
              { path: 'roadmap/blocks/:blockId/materials', element: <BlockMaterialsPage /> },
              {
                path: 'roadmap/blocks/:blockId/materials/:materialId',
                element: <MaterialDetailPage />,
              },
              { path: 'progress', element: <ProgressPage /> },
              { path: 'achievements', element: <StudentAchievementsPage /> },
              { path: 'bonuses', element: <StudentBonusesPage /> },
              { path: 'interviews', element: <StudentInterviewsPage /> },
              { path: 'interviews/real/:interviewId', element: <StudentInterviewRealPage /> },
              { path: 'interviews/mock/:interviewId', element: <StudentInterviewMockPage /> },
              { path: 'calendar', element: <CalendarPage /> },
              { path: 'calendar/events/:eventId', element: <CalendarEventPage /> },
              { path: 'one-on-one', element: <StudentOneOnOnePage /> },
              { path: 'one-on-one/:requestId', element: <StudentOneOnOneDetailPage /> },
              { path: 'settings', element: <StudentSettingsPage /> },
            ],
          },
        ],
      },
      {
        path: '/buddy',
        element: <RoleRoute role={ROLES.buddy} />,
        children: [
          {
            element: <BuddyLayout />,
            children: [
              { index: true, element: <Navigate to="students" replace /> },
              { path: 'students', element: <BuddyStudentsPage /> },
              { path: 'students/:studentId', element: <BuddyStudentDetailsPage /> },
              { path: 'interviews', element: <BuddyInterviewsPage /> },
              { path: 'calendar', element: <BuddyCalendarPage /> },
              { path: 'final-checks', element: <BuddyFinalChecksPage /> },
              { path: 'final-checks/:studentId', element: <BuddyFinalCheckDetailPage /> },
              { path: 'settings', element: <BuddySettingsPage /> },
            ],
          },
        ],
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])
