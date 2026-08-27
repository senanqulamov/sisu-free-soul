'use client'

import Image from 'next/image'
import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/** ScrollTrigger-owned Kirk-inspired image geometry. */
export function ScrollMorphMedia({ src, alt }: { src: string; alt: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    if (!ref.current || window.matchMedia('(prefers-reduced-motion: reduce), (pointer: coarse)').matches) return
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top 92%', end: 'bottom 15%', scrub: 0.7 } })
        .fromTo(ref.current, { scale: 0.92, borderRadius: '20px 20px 120px 120px' }, { scale: 1, borderRadius: '4px 4px 180px 180px', ease: 'none', duration: 0.65 })
        .to(ref.current, { scale: 0.97, borderRadius: '40px', ease: 'none', duration: 0.35 })
      gsap.fromTo('.morph-media-inner', { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } })
    }, ref)
    return () => ctx.revert()
  }, [])
  return <div ref={ref} className="relative mx-auto aspect-[16/10] w-[calc(100%_-_2.5rem)] overflow-hidden bg-deep-green will-change-transform md:aspect-[21/9] md:w-[calc(100%_-_4rem)]"><div className="morph-media-inner absolute -inset-[8%]"><Image src={src} alt={alt} fill sizes="100vw" className="object-cover" /></div><div className="absolute inset-0 bg-gradient-to-t from-warm-black/45 to-transparent" /></div>
}
