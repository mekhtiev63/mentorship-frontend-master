import { Alert, Box, Grid, Snackbar, Stack, Typography } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import type { SettingsPageVM, SettingsSectionId } from '@/entities/user-settings'
import { ru } from '@/shared/i18n/ru'
import { AccountSettingsCard } from '@/widgets/settings-view/ui/AccountSettingsCard'
import { AboutPlatformCard } from '@/widgets/settings-view/ui/AboutPlatformCard'
import { AppearanceSettingsCard } from '@/widgets/settings-view/ui/AppearanceSettingsCard'
import { NotificationSettingsCard } from '@/widgets/settings-view/ui/NotificationSettingsCard'
import { SecuritySettingsCard } from '@/widgets/settings-view/ui/SecuritySettingsCard'
import { SettingsSectionTabs } from '@/widgets/settings-view/ui/SettingsSectionTabs'

type SettingsScreenProps = {
  vm: SettingsPageVM
  section: SettingsSectionId
  onSectionChange: (s: SettingsSectionId) => void
}

function SectionPanel({
  section,
  vm,
  onAccountSaved,
}: {
  section: SettingsSectionId
  vm: SettingsPageVM
  onAccountSaved: () => void
}) {
  switch (section) {
    case 'account':
      return (
        <AccountSettingsCard
          account={vm.account}
          role={vm.role}
          mockFallback={vm.dataSource !== 'api'}
          onSaved={onAccountSaved}
        />
      )
    case 'security':
      return <SecuritySettingsCard sessions={vm.security.sessions} />
    case 'notifications':
      return <NotificationSettingsCard />
    case 'interface':
      return <AppearanceSettingsCard />
    case 'info':
      return <AboutPlatformCard info={vm.info} />
    default:
      return null
  }
}

export function SettingsScreen({ vm, section, onSectionChange }: SettingsScreenProps) {
  const [snack, setSnack] = useState(false)
  const subtitle =
    vm.role === 'buddy' ? ru.settingsPage.subtitleBuddy : ru.settingsPage.subtitleStudent

  return (
    <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {ru.settingsPage.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Stack>

      {vm.dataSource === 'mock' ? (
        <Alert severity="info" sx={{ mb: 2 }}>
          {ru.settingsPage.mockBanner}
        </Alert>
      ) : null}

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ display: { xs: 'none', md: 'block' }, position: 'sticky', top: 88 }}>
            <SettingsSectionTabs
              section={section}
              onChange={onSectionChange}
              orientation="vertical"
            />
          </Box>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <SettingsSectionTabs section={section} onChange={onSectionChange} />
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <AnimatePresence mode="wait">
            <Box
              key={section}
              component={motion.div}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.2 }}
            >
              <SectionPanel section={section} vm={vm} onAccountSaved={() => setSnack(true)} />
            </Box>
          </AnimatePresence>
        </Grid>
      </Grid>

      <Snackbar
        open={snack}
        autoHideDuration={3000}
        onClose={() => setSnack(false)}
        message={ru.settingsPage.saved}
      />
    </Box>
  )
}
