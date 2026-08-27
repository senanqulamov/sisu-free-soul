'use client'

import { motion, useScroll, useSpring } from 'motion/react'

/** A 2px scroll-progress line pinned to the left edge of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      aria-hidden
      className="fixed left-0 top-0 z-[60] h-screen w-0.5 origin-top bg-terracotta/70"
      style={{ scaleY }}
    />
  )
}
