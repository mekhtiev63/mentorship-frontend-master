/** Brand tokens — futuristic learning platform */
export const brandColors = {
  background: '#050816',
  surface: '#0F172A',
  card: '#111827',
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  heroGradient: 'linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)',
  neonBlue: '0 0 24px rgba(59, 130, 246, 0.55)',
  neonViolet: '0 0 28px rgba(139, 92, 246, 0.45)',
} as const

export const glassSurface = {
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(17, 24, 39, 0.65)',
} as const

export const motionCardHover = {
  scale: 1.02,
  y: -6,
  transition: { duration: 0.25, ease: 'easeOut' as const },
}
