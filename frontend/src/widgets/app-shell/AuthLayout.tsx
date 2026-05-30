import { Box, Container, Paper, Typography } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { ru } from '@/shared/i18n/ru'

export function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 700 }}>
          {ru.app.title}
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Outlet />
        </Paper>
      </Container>
    </Box>
  )
}
