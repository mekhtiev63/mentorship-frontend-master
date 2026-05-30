import {
  Box,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { brandColors, glassSurface, motionCardHover } from '@/shared/theme/palette'
import { ru } from '@/shared/i18n/ru'

type PanelCardProps = {
  title: string
  action?: ReactNode
  children: ReactNode
  delay?: number
}

export function PanelCard({ title, action, children, delay = 0 }: PanelCardProps) {
  return (
    <Card
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={motionCardHover}
      sx={{
        height: '100%',
        ...glassSurface,
        bgcolor: brandColors.card,
        borderRadius: 2,
        transition: 'box-shadow 0.25s ease',
        '&:hover': {
          boxShadow: '0 16px 48px rgba(0, 0, 0, 0.32)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          {action}
        </Box>
        {children}
      </CardContent>
    </Card>
  )
}

type SimpleListProps = {
  items: { id: string; primary: string; secondary: string; chip?: string }[]
}

export function SimpleList({ items }: SimpleListProps) {
  if (items.length === 0) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ py: 2, textAlign: 'center' }}>
        {ru.common.nothingYet}
      </Typography>
    )
  }

  return (
    <List dense disablePadding>
      {items.map((item, index) => (
        <ListItem
          key={item.id}
          component={motion.li}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05 * index }}
          sx={{
            px: 0,
            borderBottom: '1px solid',
            borderColor: 'divider',
            '&:last-child': { borderBottom: 'none' },
          }}
        >
          <ListItemText primary={item.primary} secondary={item.secondary} />
          {item.chip ? <Chip size="small" label={item.chip} variant="outlined" /> : null}
        </ListItem>
      ))}
    </List>
  )
}
