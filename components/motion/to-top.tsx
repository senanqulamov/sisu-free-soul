'use client'

import { ArrowUp } from 'lucide-react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'

export function ToTop() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [240, 480], [0, 1])
  const scale = useSpring(opacity, { stiffness: 280, damping: 26 })
  return <motion.button type="button" aria-label="Səhifənin yuxarısına qayıt" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ opacity, scale }} className="fixed bottom-5 right-5 z-[90] grid size-11 place-items-center rounded-full bg-warm-black text-off-white shadow-lg transition-colors hover:bg-terracotta focus-visible:opacity-100 md:bottom-7 md:right-7"><ArrowUp size={17} /></motion.button>
}
