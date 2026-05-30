import { Tab, Tabs } from '@mui/material'
import type { SettingsSectionId } from '@/entities/user-settings'
import { ru } from '@/shared/i18n/ru'

const sections: SettingsSectionId[] = ['account', 'security', 'notifications', 'interface', 'info']

type SettingsSectionTabsProps = {
  section: SettingsSectionId
  onChange: (s: SettingsSectionId) => void
  orientation?: 'horizontal' | 'vertical'
}

export function SettingsSectionTabs({ section, onChange, orientation = 'horizontal' }: SettingsSectionTabsProps) {
  return (
    <Tabs
      orientation={orientation}
      value={section}
      onChange={(_, v) => onChange(v as SettingsSectionId)}
      variant="scrollable"
      scrollButtons="auto"
      sx={{
        minHeight: orientation === 'vertical' ? 'auto' : undefined,
        '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, alignItems: 'flex-start' },
      }}
    >
      {sections.map((id) => (
        <Tab key={id} value={id} label={ru.settingsPage.sections[id]} />
      ))}
    </Tabs>
  )
}
