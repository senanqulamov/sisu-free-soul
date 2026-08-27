'use client'

import Image from 'next/image'
import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { SectionLabel } from '@/components/motion/section-label'
import { Reveal } from '@/components/motion/reveal'
import { EditorialLink } from '@/components/editorial-link'

export function TahmineIntro() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['-7%', '7%'])
  const imageScale = useTransform(scrollYProgress, [0, .5, 1], reduced ? [1, 1, 1] : [1.08, 1, 1.04])
  const titleY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [48, -38])
  const textY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [24, -12])
  return <section ref={ref} className="overflow-hidden bg-off-white py-24 text-foreground md:py-36"><div className="mx-auto max-w-[1600px] px-5 md:px-8"><div className="grid gap-10 md:grid-cols-12 md:gap-6"><div className="md:col-span-5"><SectionLabel index="02">TƏHMİNƏ</SectionLabel><div className="relative mt-10 aspect-[4/5] overflow-hidden rounded-sm"><motion.div style={{ y: imageY, scale: imageScale }} className="absolute -inset-[8%]"><Image src="/images/tahmina/5219684625851032051.jpg" alt="Təhminə Doruk, təbii gecə işığında." fill sizes="(max-width: 768px) 100vw, 42vw" className="object-cover" /></motion.div><p className="absolute bottom-5 left-5 text-[10px] uppercase tracking-label text-off-white/70">Təhminə Doruk / Bakı</p></div></div><div className="flex flex-col justify-between md:col-span-6 md:col-start-7 md:pt-28"><motion.h2 style={{ y: titleY }} className="-ml-[.06em] font-serif text-[20vw] leading-[.72] tracking-tight md:text-[10vw]">Mən<br /><span className="italic">kiməm?</span></motion.h2><motion.div style={{ y: textY }} className="mt-14 max-w-md border-t border-foreground/15 pt-7 md:ml-[18%]"><Reveal delay={.12}><p className="text-base leading-relaxed text-muted">Mən həyat koçu və yaradıcıyam. SISU mənim üçün başqalarının hazırladığı həyatın içində uyğunlaşmaq deyil — öz həqiqətinə uyğun yolu yaratmaqdır.</p><p className="mt-6 font-serif text-2xl italic leading-snug">Həyatının müəllifi olmaq, əvvəlcə öz səsini eşitməkdir.</p><div className="mt-10"><EditorialLink href="/about" arrow="up-right">Hekayəmi oxu</EditorialLink></div></Reveal></motion.div></div></div></div></section>
}
