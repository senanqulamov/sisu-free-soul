'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { NAV_ITEMS, SOCIAL_LINKS } from '@/lib/nav'
import { EASE_SOFT } from '@/lib/motion'
import { LangToggle } from './lang-toggle'

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)

  // Lock scroll + ESC to close + focus trap.
  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    // move focus into the panel
    requestAnimationFrame(() => {
      panelRef.current?.querySelector<HTMLElement>('a,button')?.focus()
    })
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Naviqasiya menyusu"
          initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.7, ease: EASE_SOFT }}
          className="fixed inset-0 z-[65] flex flex-col bg-deep-green text-off-white"
        >
          <div className="flex items-center justify-between px-5 py-5 md:px-8">
            <Link
              href="/"
              onClick={onClose}
              className="font-serif text-2xl md:text-3xl"
            >
              SISU<span className="text-butter">°</span>
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="font-sans text-sm uppercase tracking-label"
              aria-label="Menyunu bağla"
            >
              Close
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center px-5 md:px-8">
            <ul>
              {NAV_ITEMS.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '110%' }}
                    transition={{
                      duration: 0.7,
                      ease: EASE_SOFT,
                      delay: 0.15 + i * 0.06,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-baseline gap-4 py-1.5"
                    >
                      <span className="font-sans text-xs text-off-white/50">
                        {item.index}
                      </span>
                      <span className="font-serif text-[13vw] leading-[1.05] transition-colors group-hover:text-butter md:text-6xl">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-off-white/15 px-5 py-6 md:px-8">
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-sans text-sm text-off-white/70 transition-colors hover:text-off-white"
                >
                  {s.label}
                </a>
              ))}
            </div>
            <LangToggle className="text-off-white" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
