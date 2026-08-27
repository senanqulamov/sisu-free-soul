'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

/** Small AZ / EN language switch. Visual toggle (single-locale content). */
export function LangToggle({ className }: { className?: string }) {
  const [lang, setLang] = useState<'AZ' | 'EN'>('AZ')
  return (
    <div
      className={cn('flex items-center gap-1 font-sans text-xs tracking-label', className)}
      role="group"
      aria-label="Dil seçimi"
    >
      {(['AZ', 'EN'] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i === 1 && <span className="opacity-40">/</span>}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={cn(
              'transition-opacity',
              lang === l ? 'opacity-100' : 'opacity-40 hover:opacity-70',
            )}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  )
}
