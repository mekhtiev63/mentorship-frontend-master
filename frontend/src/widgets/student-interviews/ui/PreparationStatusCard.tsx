import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { Box, Button, Chip, Grid, LinearProgress, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { Link as RouterLink } from 'react-router-dom'
import type { PreparationVM } from '@/entities/student-interviews'
import { ru } from '@/shared/i18n/ru'
import { brandColors, glassSurface } from '@/shared/theme/palette'

type PreparationStatusCardProps = {
  preparation: PreparationVM
}

export function PreparationStatusCard({ preparation }: PreparationStatusCardProps) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{ ...glassSurface, p: { xs: 2, md: 3 }, borderRadius: 3 }}
    >
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
        {ru.interviewsPage.preparation.title}
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Stack spacing={1} sx={{ alignItems: 'center' }}>
            <Box
              component={motion.div}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              sx={{ width: '100%' }}
            >
              <Typography variant="h3" sx={{ fontWeight: 800, textAlign: 'center', color: brandColors.secondary }}>
                {preparation.readinessPercent}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={preparation.readinessPercent}
                sx={{ mt: 1, height: 10, borderRadius: 2 }}
              />
            </Box>
            <Chip label={`${ru.interviewsPage.preparation.title}: ${preparation.levelLabel}`} size="small" />
          </Stack>
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <List dense disablePadding>
            {preparation.checklist.map((item) => (
              <ListItem key={item.id} disableGutters>
                <ListItemIcon sx={{ minWidth: 36 }}>
                  {item.done ? (
                    <CheckCircleIcon color="success" fontSize="small" />
                  ) : (
                    <RadioButtonUncheckedIcon color="disabled" fontSize="small" />
                  )}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
          <Button
            component={RouterLink}
            to="/student/roadmap"
            variant="outlined"
            size="small"
            sx={{ mt: 1, textTransform: 'none', fontWeight: 600 }}
          >
            {ru.interviewsPage.preparation.toRoadmap}
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
