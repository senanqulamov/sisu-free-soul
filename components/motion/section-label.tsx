'use client'

import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { viewportOnce, EASE_SOFT } from '@/lib/motion'

/**
 * Tiny editorial section marker, e.g. "01 / SISU".
 * Draws a thin animated rule beside the label. The label text is passed as
 * children.
 */
export function SectionLabel({
  index,
  children,
  className,
  tone = 'default',
}: {
  index: string
  children: ReactNode
  className?: string
  tone?: 'default' | 'light'
}) {
  const color = tone === 'light' ? 'text-off-white/70' : 'text-muted'
  const rule = tone === 'light' ? 'bg-off-white/40' : 'bg-foreground/30'

  return (
    <div className={cn('flex items-center gap-4', className)}>
      <span
        className={cn(
          'font-sans text-xs uppercase tracking-label whitespace-nowrap',
          color,
        )}
      >
        {index} <span className="mx-1 opacity-50">/</span> {children}
      </span>
      <motion.span
        className={cn('h-px flex-1 origin-left', rule)}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1, ease: EASE_SOFT }}
      />
    </div>
  )
}
