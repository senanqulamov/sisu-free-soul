'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { EditorialLink } from '@/components/editorial-link'
import { EASE_OUT } from '@/lib/motion'

const maskLine = { hidden: { y: '112%', skewY: 4 }, show: { y: 0, skewY: 0 } }

/** Film-like opening: layered media, staggered type, then a physical cream transition. */
export function CinematicHero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12])
  const mediaY = useTransform(scrollYProgress, [0, 1], ['-1%', '7%'])
  const titleY = useTransform(scrollYProgress, [0, .7], [0, -115])
  const titleScale = useTransform(scrollYProgress, [0, .75], [1, .94])
  const copyOpacity = useTransform(scrollYProgress, [.48, .86], [1, 0])
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [.72, .9])
  const panelY = useTransform(scrollYProgress, [.62, 1], ['105%', '0%'])
  const panelRadius = useTransform(scrollYProgress, [.62, 1], [48, 0])
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])
  return <section ref={ref} className="relative h-[128svh] bg-warm-black" aria-label="SISU Free Soul açılış"><div className="sticky top-0 h-[100svh] overflow-hidden"><motion.div style={reduced ? undefined : { scale: mediaScale, y: mediaY }} className="absolute -inset-[5%]">{reduced ? <Image src="/images/tahmina/5219684625851032054.jpg" alt="Təhminə şəhər işıqları fonunda." fill priority sizes="100vw" className="object-cover" /> : <video autoPlay muted loop playsInline poster="/images/tahmina/5219684625851032054.jpg" className="size-full object-cover"><source src="/videos/sisu-hero.mp4" type="video/mp4" /></video>}</motion.div><motion.div style={reduced ? undefined : { opacity: overlayOpacity }} className="absolute inset-0 bg-gradient-to-t from-warm-black/95 via-warm-black/15 to-warm-black/25" />
    <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-between px-5 pb-16 pt-32 text-off-white md:px-8 md:pb-20 md:pt-36"><motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, ease: EASE_OUT }} className="flex items-center justify-between"><p className="text-[10px] uppercase tracking-label text-off-white/70">01 / SISU</p><p className="text-[10px] uppercase tracking-label text-off-white/70">Təhminə Doruk</p></motion.div><div><motion.div style={reduced ? undefined : { y: titleY, scale: titleScale }} className="origin-left"><motion.h1 initial="hidden" animate="show" transition={{ staggerChildren: .16, delayChildren: .42 }} className="max-w-[12ch] font-serif text-[20vw] leading-[.72] tracking-tight md:max-w-none md:text-[12vw]"><span className="block overflow-hidden pb-[.1em]"><motion.span variants={maskLine} transition={{ duration: .95, ease: EASE_OUT }} className="block">SISU FREE</motion.span></span><span className="block overflow-hidden pb-[.1em]"><motion.span variants={maskLine} transition={{ duration: .95, ease: EASE_OUT }} className="block italic">SOUL</motion.span></span></motion.h1><motion.div style={reduced ? undefined : { scaleX: lineScale }} className="mt-7 h-px w-[min(46vw,520px)] origin-left bg-off-white/70" /></motion.div><motion.div style={reduced ? undefined : { opacity: copyOpacity }} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .94, duration: .7, ease: EASE_OUT }} className="mt-8 grid gap-8 md:grid-cols-12 md:items-end"><div className="md:col-span-5"><p className="font-serif text-2xl italic md:text-3xl">Öz həyatının müəllifi ol.</p><p className="mt-3 max-w-sm text-sm leading-relaxed text-off-white/75">Hazır qəliblərdən çıx. Öz yolunu seç. Öz həqiqətini yarat.</p></div><div className="md:col-span-3 md:col-start-10"><EditorialLink href="/about" tone="light" arrow="up-right">Hekayəni kəşf et</EditorialLink></div></motion.div></div></div><motion.p style={reduced ? undefined : { opacity: copyOpacity }} className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-label text-off-white/70">Scroll to explore ↓</motion.p><motion.div style={reduced ? undefined : { y: panelY, borderTopLeftRadius: panelRadius, borderTopRightRadius: panelRadius }} className="absolute inset-x-0 bottom-0 z-20 flex h-[42svh] items-start bg-off-white px-5 pt-10 text-foreground md:px-8 md:pt-14"><p className="text-xs uppercase tracking-label text-muted">01 / SISU</p><p className="ml-auto max-w-sm font-serif text-2xl italic leading-tight md:text-4xl">Azadlıq seçimdən başlayır.</p></motion.div></div></section>
}
