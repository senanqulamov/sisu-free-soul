'use client'

import Link from 'next/link'
import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'

type MagneticLinkProps = {
  href: string
  children: ReactNode
  className?: string
  strength?: number
  ariaLabel?: string
}

/**
 * Link that subtly leans toward the pointer on hover. The transform lives on
 * a wrapping motion.span so the underlying <Link> keeps native semantics.
 */
export function MagneticLink({
  href,
  children,
  className,
  strength = 0.35,
  ariaLabel,
}: MagneticLinkProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 })

  function onMove(e: React.MouseEvent<HTMLSpanElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-flex"
    >
      <Link href={href} aria-label={ariaLabel} className={cn(className)}>
        {children}
      </Link>
    </motion.span>
  )
}
