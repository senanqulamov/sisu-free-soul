'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react'

/**
 * Desktop-only enhancement cursor. When the pointer is over an element that
 * carries a `data-cursor="VIEW ↗"` (or similar) attribute, a small label
 * follows the pointer. Never replaces native pointer semantics for links.
 */
export function CustomCursor() {
  const [label, setLabel] = useState<string | null>(null)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 350, damping: 28, mass: 0.3 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!fine.matches || reduced.matches) return
    function move(e: MouseEvent) {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        '[data-cursor]',
      )
      setLabel(target?.dataset.cursor ?? null)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [x, y])

  return (
    <motion.div
      aria-hidden
      className="sisu-media-cursor pointer-events-none fixed left-0 top-0 z-[70] -translate-x-1/2 -translate-y-1/2"
      style={{ x: sx, y: sy }}
    >
      <AnimatePresence>
        {label && (
          <motion.span
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-warm-black/85 text-xs uppercase tracking-label text-off-white backdrop-blur-sm"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
