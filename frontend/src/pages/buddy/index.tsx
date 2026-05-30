import { StubPage } from '@/pages/_shared/StubPage'
import { ru } from '@/shared/i18n/ru'

export function BuddyStudentsPage() {
  return <StubPage title={ru.nav.students} />
}

export function BuddyStudentDetailsPage() {
  return <StubPage title={ru.stub.studentDetails} />
}

export function BuddyInterviewsPage() {
  return <StubPage title={ru.nav.interviews} />
}

export function BuddyCalendarPage() {
  return <StubPage title={ru.nav.calendar} />
}

export function BuddyFinalChecksPage() {
  return <StubPage title={ru.nav.finalChecks} />
}

export function BuddyFinalCheckDetailPage() {
  return <StubPage title={ru.stub.finalCheck} />
}

export { BuddySettingsPage } from '@/pages/buddy/settings'

export function BuddyHomePage() {
  return <StubPage title={ru.stub.buddyHome} />
}
