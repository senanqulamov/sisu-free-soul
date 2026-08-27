'use client'

import { motion, useReducedMotion } from 'motion/react'
import { EASE_SOFT } from '@/lib/motion'

/**
 * app/template.tsx re-mounts on every navigation, so it doubles as the page
 * transition. A soft clay/green panel wipes up to reveal the incoming page,
 * with the SISU mark briefly appearing. Reduced-motion users skip the wipe.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion()

  if (reduced) return <>{children}</>

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[64] flex items-center justify-center bg-deep-green"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        style={{ originY: 0 }}
        transition={{ duration: 0.75, ease: EASE_SOFT }}
      >
        <motion.span
          className="font-serif text-5xl text-off-white"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE_SOFT }}
        >
          SISU<span className="text-butter">°</span>
        </motion.span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE_SOFT, delay: 0.3 }}
      >
        {children}
      </motion.div>
    </>
  )
}
