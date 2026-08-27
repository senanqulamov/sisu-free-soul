'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/** Owns desktop inertial scrolling and keeps ScrollTrigger in the same RAF loop. */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const touch = window.matchMedia('(pointer: coarse)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (touch || reduced) return

    gsap.registerPlugin(ScrollTrigger)
    const lenis = new Lenis({ duration: 0.72, wheelMultiplier: 1, touchMultiplier: 1 })
    lenis.on('scroll', ScrollTrigger.update)
    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      lenis.destroy()
      gsap.ticker.remove(update)
    }
  }, [])
  return <>{children}</>
}
