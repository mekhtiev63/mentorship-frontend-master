import { motion, type MotionProps } from 'framer-motion'
import { Dialog, type DialogProps } from '@mui/material'

type AnimatedModalProps = DialogProps & {
  motionProps?: MotionProps
}

export function AnimatedModal({ children, open, ...rest }: AnimatedModalProps) {
  return (
    <Dialog open={open} {...rest}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </Dialog>
  )
}
