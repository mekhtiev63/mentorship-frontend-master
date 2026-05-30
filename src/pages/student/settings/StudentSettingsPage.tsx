import { Box } from '@mui/material'
import { useSettingsPage } from '@/entities/user-settings'
import { useSettingsSection } from '@/features/settings-navigation'
import { LoadErrorState } from '@/shared/ui/LoadErrorState'
import { ROLES } from '@/shared/lib/roles'
import { SettingsPageSkeleton, SettingsScreen } from '@/widgets/settings-view'

export function StudentSettingsPage() {
  const { section, setSection } = useSettingsSection()
  const { data, isLoading, isError, refetch } = useSettingsPage(ROLES.student)

  if (isLoading) {
    return (
      <Box sx={{ py: 2, maxWidth: 880, mx: 'auto', width: '100%', px: { xs: 1, sm: 0 } }}>
        <SettingsPageSkeleton />
      </Box>
    )
  }

  if (isError || !data) {
    return <LoadErrorState onRetry={() => void refetch()} />
  }

  return (
    <Box sx={{ py: 2, maxWidth: 880, mx: 'auto', width: '100%', px: { xs: 1, sm: 0 } }}>
      <SettingsScreen vm={data} section={section} onSectionChange={setSection} />
    </Box>
  )
}
