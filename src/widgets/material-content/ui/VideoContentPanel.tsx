import PauseIcon from '@mui/icons-material/Pause'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import { Box, Button, LinearProgress, List, ListItemButton, ListItemText, Stack, Typography } from '@mui/material'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { MaterialContentDto } from '@/entities/material-detail'
import { ru } from '@/shared/i18n/ru'
import { brandColors, glassSurface } from '@/shared/theme/palette'

type VideoContentPanelProps = {
  content: Extract<MaterialContentDto, { kind: 'video' }>
  watchedSec: number
  onProgress: (sec: number) => void
}

export function VideoContentPanel({ content, watchedSec, onProgress }: VideoContentPanelProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const progress = content.durationSec > 0 ? Math.min(100, (watchedSec / content.durationSec) * 100) : 0

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const tick = () => onProgress(Math.floor(el.currentTime))
    el.addEventListener('timeupdate', tick)
    return () => el.removeEventListener('timeupdate', tick)
  }, [onProgress])

  const seek = (startSec: number) => {
    const el = videoRef.current
    if (el) {
      el.currentTime = startSec
      onProgress(startSec)
    }
  }

  const togglePlay = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) {
      void el.play()
      setPlaying(true)
    } else {
      el.pause()
      setPlaying(false)
    }
  }

  return (
    <Stack spacing={3}>
      <Box component={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} sx={{ ...glassSurface, p: 3, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          {ru.materialDetail.video.playerTitle}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {content.summary}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ mb: 2, display: 'block' }}>
          {ru.materialDetail.video.mockHint}
        </Typography>
        <Box
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: brandColors.neonViolet,
            bgcolor: '#000',
          }}
        >
          <video
            ref={videoRef}
            src={content.playbackUrl}
            poster={content.posterUrl}
            controls
            style={{ width: '100%', maxHeight: 360, display: 'block' }}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        </Box>
        <Stack direction="row" spacing={1} sx={{ mt: 2, alignItems: 'center' }}>
          <Button variant="contained" startIcon={playing ? <PauseIcon /> : <PlayArrowIcon />} onClick={togglePlay}>
            {playing ? ru.materialDetail.video.pause : ru.materialDetail.video.play}
          </Button>
          <Box sx={{ flex: 1 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 6, borderRadius: 3, '& .MuiLinearProgress-bar': { background: brandColors.heroGradient } }}
            />
          </Box>
        </Stack>
      </Box>

      <Box sx={{ ...glassSurface, p: 2, borderRadius: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
          {ru.materialDetail.video.chapters}
        </Typography>
        <List dense disablePadding>
          {content.chapters.map((ch) => (
            <ListItemButton key={ch.id} onClick={() => seek(ch.startSec)} sx={{ borderRadius: 1 }}>
              <ListItemText primary={ch.title} secondary={`${ch.startSec} с`} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Stack>
  )
}
