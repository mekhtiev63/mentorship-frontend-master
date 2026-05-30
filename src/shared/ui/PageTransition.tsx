import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '@/shared/hooks/useReducedMotion'

type PageTransitionProps = {
  children: ReactNode
  routeKey: string
}

export function PageTransition({ children, routeKey }: PageTransitionProps) {
  const reduced = useReducedMotion()
  if (reduced) {
    return <>{children}</>
  }
  return (
    <motion.div
      key={routeKey}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
