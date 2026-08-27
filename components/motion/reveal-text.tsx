'use client'

import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { lineChild, staggerContainer, viewportOnce } from '@/lib/motion'

type RevealTextProps = {
  /** Each string becomes its own masked line. */
  lines: string[]
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'div'
  className?: string
  lineClassName?: string
  stagger?: number
  delay?: number
}

/**
 * Line-by-line masked reveal. Each line sits inside an overflow-hidden
 * wrapper and slides up into view. Fully accessible — the text is real
 * DOM text, motion is purely presentational.
 */
export function RevealText({
  lines,
  as = 'div',
  className,
  lineClassName,
  stagger = 0.1,
  delay = 0,
}: RevealTextProps) {
  const Tag = motion[as]
  return (
    <Tag
      className={cn(className)}
      variants={staggerContainer(stagger, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.06em]">
          <motion.span className={cn('block', lineClassName)} variants={lineChild}>
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
