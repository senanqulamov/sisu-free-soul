'use client'

import Image from 'next/image'
import { useLayoutEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RevealText } from '@/components/motion/reveal-text'
import { EditorialLink } from '@/components/editorial-link'
import { EASE_OUT } from '@/lib/motion'

export function AboutExperience() {
  const root = useRef<HTMLElement>(null)
  const hero = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: hero, offset: ['start start', 'end start'] })
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -86])
  const titleOpacity = useTransform(scrollYProgress, [.55, 1], [1, .18])
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '9%'])
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.03, 1.12])
  const radius = useTransform(scrollYProgress, [0, .7, 1], ['64px', '18px', '0px'])
  useLayoutEffect(() => {
    if (!root.current || window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('.about-quote-word')
      gsap.timeline({ scrollTrigger: { trigger: '.about-quote', start: 'top top', end: '+=115%', pin: true, scrub: .55 } }).fromTo(words, { opacity: .15, y: 42, rotateX: -28 }, { opacity: 1, y: 0, rotateX: 0, stagger: .13, ease: 'none' })
      gsap.fromTo('.about-wide-image', { clipPath: 'inset(15% 7% 15% 7%)', scale: 1.08 }, { clipPath: 'inset(0 0 0 0)', scale: 1, ease: 'none', scrollTrigger: { trigger: '.about-wide-wrap', start: 'top 88%', end: 'bottom 35%', scrub: .6 } })
    }, root)
    return () => ctx.revert()
  }, [])
  return <section ref={root} className="overflow-x-clip bg-background"><section ref={hero} className="relative min-h-[118svh] overflow-hidden"><div className="sticky top-0 min-h-[100svh] overflow-hidden"><div className="mx-auto grid min-h-[100svh] max-w-[1600px] items-end gap-8 px-5 pb-16 pt-36 md:grid-cols-12 md:px-8 md:pb-20 md:pt-40"><motion.div style={reduced ? undefined : { y: titleY, opacity: titleOpacity }} className="relative z-10 md:col-span-6 md:pb-8"><motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, ease: EASE_OUT }} className="text-xs uppercase tracking-label text-muted">01 / TƏHMİNƏ</motion.p><RevealText as="h1" lines={['Mən', 'kiməm?']} className="mt-10 font-serif text-[24vw] leading-[.72] tracking-tight md:text-[11vw]" stagger={.18} /><motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .82, duration: .7, ease: EASE_OUT }} className="mt-9 max-w-sm text-base leading-relaxed text-muted">SISU mənim üçün öz həqiqətinə uyğun yaşamaq cəsarətidir.</motion.p></motion.div><motion.div initial={{ clipPath: 'inset(100% 0 0 0)', y: 50 }} animate={{ clipPath: 'inset(0% 0 0 0)', y: 0 }} transition={{ delay: .35, duration: 1.1, ease: EASE_OUT }} style={reduced ? undefined : { borderRadius: radius }} className="relative z-[1] aspect-[4/5] overflow-hidden bg-surface md:col-span-5 md:col-start-8 md:mb-2 md:aspect-[3/4]"><motion.div style={reduced ? undefined : { y: photoY, scale: photoScale }} className="absolute -inset-[7%]"><Image src="/images/tahmina/5219684625851032048.jpg" alt="Təhminə Doruk şəhər fonunda." fill priority sizes="(max-width:768px) 100vw, 42vw" className="object-cover object-center" /></motion.div></motion.div></div><p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-label text-muted">Aşağı kəşf et ↓</p></div></section><section className="bg-off-white px-5 py-24 md:px-8 md:py-36"><div className="mx-auto grid max-w-[1450px] gap-10 md:grid-cols-12 md:gap-16"><p className="text-xs uppercase tracking-label text-muted md:col-span-3">02 / SISU</p><motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .35 }} transition={{ duration: .85, ease: EASE_OUT }} className="md:col-span-8 md:col-start-5"><p className="font-serif text-[11vw] leading-[.87] md:text-[6.5vw]">Özünü hazır qəlibə salmaq yox, özünə uyğun yolu və həyatı yaratmaq.</p><p className="mt-10 max-w-xl leading-relaxed text-muted">Təhminənin hekayəsi nəticədən çox müşahidə, sual və seçim haqqındadır. Bu səhifə həmin baxışı yavaş-yavaş açır.</p></motion.div></div></section><section className="about-quote grid min-h-[100svh] place-items-center bg-sage-soft px-5 text-center"><p className="max-w-6xl font-serif text-[13vw] leading-[.86] [perspective:800px] md:text-[8vw]"><span className="about-quote-word block">Öz həyatını</span><span className="about-quote-word block italic">özün seçmək</span><span className="about-quote-word block">cəsarətdir.</span></p></section><section className="bg-background px-5 py-20 md:px-8 md:py-32"><div className="mx-auto max-w-[1600px]"><p className="text-xs uppercase tracking-label text-muted">SISU / BAXIŞ</p><div className="about-wide-wrap mt-10 overflow-hidden rounded-sm"><div className="about-wide-image relative aspect-[16/10] md:aspect-[21/9]"><Image src="/images/tahmina/5219684625851032054.jpg" alt="Təhminənin sakit şəhər portreti." fill sizes="100vw" className="object-cover" /></div></div><div className="mt-12 grid gap-8 md:grid-cols-12"><p className="font-serif text-4xl leading-[.95] md:col-span-7 md:text-6xl">Azadlıq istədiyin hər şeyi etmək deyil.</p><div className="md:col-span-4 md:col-start-9"><p className="leading-relaxed text-muted">Azadlıq — öz həyatını seçmək və onun müəllifi olmaqdır.</p><div className="mt-8"><EditorialLink href="/contact" arrow="right">Söhbətə başlayaq</EditorialLink></div></div></div></div></section></section>
}
