import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'
import { useInView } from 'react-intersection-observer'

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  once?: boolean
}

export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  once = true,
}: FadeInProps) {
  const prefersReduced = useReducedMotion()
  const { ref, inView } = useInView({ triggerOnce: once, threshold: 0.1 })

  const offsets = {
    up: { y: prefersReduced ? 0 : 32 },
    down: { y: prefersReduced ? 0 : -32 },
    left: { x: prefersReduced ? 0 : 32 },
    right: { x: prefersReduced ? 0 : -32 },
    none: {},
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
}

export function Stagger({ children, className = '', staggerDelay = 0.1 }: StaggerProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export const fadeUpItem = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
}
