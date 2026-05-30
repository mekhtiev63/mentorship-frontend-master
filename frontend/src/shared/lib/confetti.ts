import confetti from 'canvas-confetti'

export function fireCelebrationConfetti(): void {
  const count = 120
  const defaults = {
    origin: { y: 0.65 },
    zIndex: 9999,
  }

  void confetti({
    ...defaults,
    particleCount: count,
    spread: 80,
    startVelocity: 35,
  })

  void confetti({
    ...defaults,
    particleCount: 40,
    angle: 60,
    spread: 55,
    origin: { x: 0, y: 0.65 },
    colors: ['#3B82F6', '#8B5CF6', '#22C55E'],
  })

  void confetti({
    ...defaults,
    particleCount: 40,
    angle: 120,
    spread: 55,
    origin: { x: 1, y: 0.65 },
    colors: ['#3B82F6', '#8B5CF6', '#F59E0B'],
  })
}
