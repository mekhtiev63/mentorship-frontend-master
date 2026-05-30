import { Box } from '@mui/material'
import { Particles, ParticlesProvider, useParticlesProvider } from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'
import { useMemo } from 'react'
import type { ISourceOptions } from '@tsparticles/engine'

const options: ISourceOptions = {
  fullScreen: { enable: false },
  fpsLimit: 30,
  particles: {
    number: { value: 28, density: { enable: true, width: 1200, height: 800 } },
    color: { value: ['#3B82F6', '#8B5CF6', '#64748B'] },
    opacity: { value: { min: 0.08, max: 0.22 } },
    size: { value: { min: 1, max: 2.5 } },
    move: {
      enable: true,
      speed: 0.35,
      direction: 'none',
      random: true,
      outModes: { default: 'out' },
    },
    links: {
      enable: true,
      distance: 140,
      color: '#334155',
      opacity: 0.12,
      width: 1,
    },
  },
  detectRetina: true,
  background: { color: 'transparent' },
}

function ParticlesLayer() {
  const { loaded } = useParticlesProvider()
  const id = useMemo(() => 'app-particles', [])

  if (!loaded) return null

  return <Particles id={id} options={options} style={{ width: '100%', height: '100%' }} />
}

export function ParticlesBackground() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.85,
      }}
    >
      <ParticlesProvider init={loadSlim}>
        <ParticlesLayer />
      </ParticlesProvider>
    </Box>
  )
}
