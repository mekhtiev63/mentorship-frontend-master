import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material'
import { useUiStore } from '@/shared/store/ui-store'
import { ru } from '@/shared/i18n/ru'
import { brandColors } from '@/shared/theme/palette'
import { SettingsCardShell } from '@/widgets/settings-view/ui/SettingsCardShell'

export function AppearanceSettingsCard() {
  const themeMode = useUiStore((s) => s.themeMode)
  const setThemeMode = useUiStore((s) => s.setThemeMode)
  const locale = useUiStore((s) => s.locale)

  return (
    <SettingsCardShell title={ru.settingsPage.sections.interface} accent={brandColors.secondary}>
      <Stack spacing={3}>
        <Stack spacing={1}>
          <Typography variant="overline" color="text.secondary">
            {ru.settingsPage.interface.theme}
          </Typography>
          <ToggleButtonGroup
            exclusive
            value={themeMode}
            onChange={(_, v) => v && setThemeMode(v as 'dark' | 'light')}
            size="small"
          >
            <ToggleButton value="dark" sx={{ textTransform: 'none', fontWeight: 600 }}>
              {ru.settingsPage.interface.themeDark}
            </ToggleButton>
            <Tooltip title={ru.settingsPage.interface.themeLightSoon}>
              <span>
                <ToggleButton value="light" disabled sx={{ textTransform: 'none', fontWeight: 600 }}>
                  {ru.settingsPage.interface.themeLight}
                </ToggleButton>
              </span>
            </Tooltip>
          </ToggleButtonGroup>
        </Stack>

        <FormControl fullWidth size="small">
          <InputLabel id="settings-locale-label">{ru.settingsPage.interface.language}</InputLabel>
          <Select
            labelId="settings-locale-label"
            label={ru.settingsPage.interface.language}
            value={locale}
            readOnly
          >
            <MenuItem value="ru">{ru.settingsPage.interface.langRu}</MenuItem>
            <MenuItem value="en" disabled>
              {ru.settingsPage.interface.langEnSoon}
            </MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </SettingsCardShell>
  )
}
