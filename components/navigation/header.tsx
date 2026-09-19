'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { usePublicContent } from '@/components/content/public-content'
import { EASE_OUT, EASE_SOFT } from '@/lib/motion'

export function Header() {
  const { navigation } = usePublicContent()
  const navItems = navigation.filter((item) => item.visible !== false)
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [down, setDown] = useState(false)
  const panel = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    let last = window.scrollY
    const scroll = () => { setDown(window.scrollY > last && window.scrollY > 90); last = window.scrollY }
    window.addEventListener('scroll', scroll, { passive: true })
    return () => window.removeEventListener('scroll', scroll)
  }, [])
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); return }
      if (e.key !== 'Tab' || !panel.current) return
      const focusable = [...panel.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled])')]
      const first = focusable[0]
      const last = focusable.at(-1)
      if (!first || !last) return
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKey)
    requestAnimationFrame(() => panel.current?.querySelector<HTMLAnchorElement>('a[href]')?.focus())
    return () => window.removeEventListener('keydown', onKey)
  }, [open])
  const choose = () => { setOpen(false); window.setTimeout(() => toggle.current?.focus(), 400) }

  return <motion.header animate={{ y: down && !open ? -6 : 0, scale: down && !open ? .96 : 1, opacity: down && !open ? .92 : 1 }} transition={{ duration: .28, ease: EASE_OUT }} className="fixed left-1/2 top-[max(16px,env(safe-area-inset-top))] z-[100] w-[calc(100vw-32px)] max-w-[360px] -translate-x-1/2">
    <motion.div ref={panel} layout transition={{ layout: { duration: reduced ? .01 : .5, ease: EASE_SOFT } }} className="overflow-hidden rounded-[22px] bg-warm-black p-2 text-off-white shadow-[0_12px_40px_rgba(30,31,27,.2)]">
      <div className="flex h-11 items-center justify-between px-3"><Link href="/" onClick={choose} className="font-serif text-2xl leading-none">SISU<span className="text-butter">°</span></Link><motion.button ref={toggle} type="button" whileHover={reduced ? undefined : { scale: 1.06, rotate: 3 }} whileTap={{ scale: .94 }} onClick={() => setOpen(v => !v)} aria-label={open ? 'Menyunu bağla' : 'Menyunu aç'} aria-expanded={open} className="grid size-9 place-items-center rounded-[11px] bg-off-white text-warm-black"><motion.span animate={{ rotate: open ? 90 : 0 }} className="text-lg leading-none">{open ? '×' : '•••'}</motion.span></motion.button></div>
      <AnimatePresence initial={false}>{open && <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: reduced ? .01 : .36, ease: EASE_SOFT }} className="overflow-hidden"><ul className="space-y-1 px-1 pb-2 pt-3">{navItems.map((item, index) => { const active = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)); return <motion.li key={item.href} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 10, opacity: 0 }} transition={{ duration: .35, ease: EASE_OUT, delay: .06 + index * .045 }}><Link href={item.href} onClick={choose} className="group flex h-11 items-center rounded-[10px] bg-off-white px-3 text-warm-black transition-colors hover:bg-butter"><span className="w-8 text-[10px] tracking-label text-muted">{String(index + 1).padStart(2, '0')}</span><span className="font-serif text-xl transition-transform duration-300 group-hover:translate-x-1">{item.label}</span><span className="ml-auto transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">{active ? '•' : '↗'}</span></Link></motion.li> })}</ul><div className="flex items-center justify-between border-t border-off-white/15 px-3 pb-2 pt-3 text-xs uppercase tracking-label text-off-white/60"><span>AZ</span><span>EN</span></div></motion.nav>}</AnimatePresence>
    </motion.div>
  </motion.header>
}
