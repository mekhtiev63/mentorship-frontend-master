import { AppShell } from '@/widgets/app-shell/AppShell'
import { studentNavItems } from '@/widgets/app-shell/nav-config'
import { ROLES } from '@/shared/lib/roles'
import { ru } from '@/shared/i18n/ru'

export function StudentLayout() {
  return (
    <AppShell role={ROLES.student} navItems={studentNavItems} roleLabel={ru.layout.roleStudent} />
  )
}
