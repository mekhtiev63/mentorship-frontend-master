import type { SvgIconComponent } from '@mui/icons-material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DashboardIcon from '@mui/icons-material/Dashboard'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import ForumIcon from '@mui/icons-material/Forum'
import GroupsIcon from '@mui/icons-material/Groups'
import PersonIcon from '@mui/icons-material/Person'
import SettingsIcon from '@mui/icons-material/Settings'
import RouteIcon from '@mui/icons-material/Route'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import WalletIcon from '@mui/icons-material/Wallet'
import FactCheckIcon from '@mui/icons-material/FactCheck'
import EventIcon from '@mui/icons-material/Event'
import { ru } from '@/shared/i18n/ru'

export type NavItem = {
  label: string
  path: string
  icon?: SvgIconComponent
}

export const studentNavItems: NavItem[] = [
  { label: ru.nav.dashboard, path: '/student', icon: DashboardIcon },
  { label: ru.nav.profile, path: '/student/profile', icon: PersonIcon },
  { label: ru.nav.roadmap, path: '/student/roadmap', icon: RouteIcon },
  { label: ru.nav.progress, path: '/student/progress', icon: TrendingUpIcon },
  { label: ru.nav.achievements, path: '/student/achievements', icon: EmojiEventsIcon },
  { label: ru.nav.bonuses, path: '/student/bonuses', icon: WalletIcon },
  { label: ru.nav.interviews, path: '/student/interviews', icon: ForumIcon },
  { label: ru.nav.calendar, path: '/student/calendar', icon: CalendarMonthIcon },
  { label: ru.nav.oneOnOne, path: '/student/one-on-one', icon: GroupsIcon },
  { label: ru.nav.settings, path: '/student/settings', icon: SettingsIcon },
]

export const buddyNavItems: NavItem[] = [
  { label: ru.nav.students, path: '/buddy/students', icon: GroupsIcon },
  { label: ru.nav.interviews, path: '/buddy/interviews', icon: ForumIcon },
  { label: ru.nav.calendar, path: '/buddy/calendar', icon: EventIcon },
  { label: ru.nav.finalChecks, path: '/buddy/final-checks', icon: FactCheckIcon },
  { label: ru.nav.settings, path: '/buddy/settings', icon: SettingsIcon },
]
