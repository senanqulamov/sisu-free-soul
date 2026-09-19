'use client'

import { SectionLabel } from '@/components/motion/section-label'
import { ScrollHighlight } from '@/components/motion/scroll-highlight'
import { RevealText } from '@/components/motion/reveal-text'
import { usePublicContent } from '@/components/content/public-content'

export function Manifesto() {
  const { homepage } = usePublicContent()
  return <section className="bg-off-white text-foreground"><div className="mx-auto max-w-[1600px] px-5 py-28 md:px-8 md:py-40"><SectionLabel index="01" className="mb-16 md:mb-24">{homepage.manifestoLabel}</SectionLabel><div className="max-w-5xl"><ScrollHighlight text={homepage.manifestoLineOne} className="font-serif text-[9vw] leading-[1.02] tracking-tight md:text-6xl lg:text-7xl" /><ScrollHighlight text={homepage.manifestoLineTwo} className="mt-6 font-serif text-[9vw] leading-[1.02] tracking-tight text-terracotta md:text-6xl lg:text-7xl" /></div><div className="mt-24 grid gap-10 md:mt-36 md:grid-cols-12"><div className="md:col-span-4 md:col-start-1"><p className="font-sans text-sm leading-relaxed text-muted">{homepage.manifestoDescription}</p></div><RevealText as="div" lines={homepage.manifestoLines.split('\n')} stagger={0.12} className="font-serif text-4xl leading-[1.15] tracking-tight md:col-span-7 md:col-start-6 md:text-6xl" /></div></div></section>
}
