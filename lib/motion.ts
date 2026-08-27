import type { Variants, Transition } from 'motion/react'

// Shared easing — a soft, cinematic curve used across the site.
export const EASE_SOFT = [0.22, 1, 0.36, 1] as const
export const EASE_OUT = [0.16, 1, 0.3, 1] as const

export const baseTransition: Transition = {
  duration: 0.9,
  ease: EASE_SOFT,
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: baseTransition,
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.1, ease: EASE_SOFT } },
}

// Container that staggers its children.
export function staggerContainer(stagger = 0.12, delay = 0): Variants {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  }
}

// Word / line reveal used by RevealText.
export const lineChild: Variants = {
  hidden: { opacity: 0, y: '110%' },
  show: {
    opacity: 1,
    y: '0%',
    transition: { duration: 0.9, ease: EASE_SOFT },
  },
}

export const viewportOnce = { once: true, amount: 0.35 } as const
