import { AppShell } from '@/widgets/app-shell/AppShell'
import { buddyNavItems } from '@/widgets/app-shell/nav-config'
import { ROLES } from '@/shared/lib/roles'
import { ru } from '@/shared/i18n/ru'

export function BuddyLayout() {
  return <AppShell role={ROLES.buddy} navItems={buddyNavItems} roleLabel={ru.layout.roleBuddy} />
}
