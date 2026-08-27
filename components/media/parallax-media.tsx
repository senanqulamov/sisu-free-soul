'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'

type ParallaxMediaProps = {
  src: string
  alt: string
  className?: string
  sizes?: string
  /** parallax travel as a fraction of container height, e.g. 0.06 = 6% */
  amount?: number
  priority?: boolean
  rounded?: string
}

/**
 * Image with a subtle vertical parallax. The inner image is oversized so
 * translation never reveals an edge.
 */
export function ParallaxMedia({
  src,
  alt,
  className,
  sizes = '(max-width: 768px) 100vw, 60vw',
  amount = 0.08,
  priority = false,
  rounded = 'rounded-sm',
}: ParallaxMediaProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const pct = amount * 100
  const y = useTransform(scrollYProgress, [0, 1], [`-${pct}%`, `${pct}%`])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', rounded, className)}>
      <motion.div className="absolute -inset-[10%]" style={{ y }}>
        <Image
          src={src || '/placeholder.svg'}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </motion.div>
    </div>
  )
}
