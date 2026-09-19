'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { usePublicContent } from '@/components/content/public-content'

export function HomeKineticInterlude() {
  const { homepage } = usePublicContent(); const ref = useRef<HTMLElement>(null); const reduced = useReducedMotion(); const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] }); const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [70, -45]); const opacity = useTransform(scrollYProgress, [0, .25, .8, 1], [0, 1, 1, 0]); const rule = useTransform(scrollYProgress, [.1, .65], [0, 1])
  return <section ref={ref} className="relative overflow-hidden bg-background py-[18vh] text-foreground"><motion.div style={{ y, opacity }} className="mx-auto grid max-w-[1280px] gap-8 px-5 md:grid-cols-12 md:px-8"><p className="text-xs uppercase tracking-label text-muted md:col-span-3">{homepage.interludeLabel}</p><p className="font-serif text-[12vw] leading-[.86] tracking-tight md:col-span-8 md:text-[6.5vw]">{homepage.interludeLineOne}<br /><i>{homepage.interludeLineTwo}</i></p><motion.div style={{ scaleX: rule }} className="h-px origin-left bg-foreground/30 md:col-span-9 md:col-start-4" /></motion.div></section>
}
