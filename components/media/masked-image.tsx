'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { cn } from '@/lib/utils'
import { EASE_SOFT, viewportOnce } from '@/lib/motion'

type MaskedImageProps = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  priority?: boolean
  sizes?: string
  /** subtle scroll-linked scale from 1.06 -> 1 */
  scaleOnScroll?: boolean
  rounded?: string
}

/**
 * Image that reveals with a clip-path wipe, then gently settles its scale
 * as it moves through the viewport. GPU-friendly (transform + clip-path).
 */
export function MaskedImage({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  scaleOnScroll = true,
  rounded = 'rounded-sm',
}: MaskedImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.06])

  return (
    <motion.div
      ref={ref}
      className={cn('relative overflow-hidden', rounded, className)}
      initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={viewportOnce}
      transition={{ duration: 1.1, ease: EASE_SOFT }}
    >
      <motion.div
        className="h-full w-full"
        style={scaleOnScroll ? { scale } : undefined}
      >
        <Image
          src={src || '/placeholder.svg'}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={cn('object-cover', imgClassName)}
        />
      </motion.div>
    </motion.div>
  )
}
