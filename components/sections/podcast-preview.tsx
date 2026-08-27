'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLayoutEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SectionLabel } from '@/components/motion/section-label'
import { EditorialLink } from '@/components/editorial-link'
import { featuredEpisode, podcastEpisodes } from '@/content/podcast'

export function PodcastPreview() {
  const ref = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    if (!ref.current || window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => { ScrollTrigger.create({ trigger: '.podcast-pin', start: 'top 18%', end: 'bottom 78%', pin: true, pinSpacing: false }) }, ref)
    return () => ctx.revert()
  }, [])
  return <section ref={ref} className="bg-deep-green py-24 text-off-white md:py-36"><div className="mx-auto grid max-w-[1600px] gap-12 px-5 md:grid-cols-12 md:px-8"><div className="podcast-pin h-fit md:col-span-5"><SectionLabel index="03" tone="light">CONVERSATIONS</SectionLabel><h2 className="mt-12 font-serif text-[15vw] leading-[.78] tracking-tight md:text-[7vw]">SISU<br /><span className="italic">Conversations</span></h2><p className="mt-8 max-w-sm text-sm leading-relaxed text-off-white/70">Həyat, münasibətlər, seçimlər, qorxular, azadlıq və insan olmaq haqqında filtrlənməmiş söhbətlər.</p><div className="mt-10"><EditorialLink href="/podcast" tone="light" arrow="right">Bütün epizodlar</EditorialLink></div></div><div className="md:col-span-6 md:col-start-7"><Feature episode={featuredEpisode} /><div className="mt-5 border-t border-off-white/15">{podcastEpisodes.slice(1, 5).map((episode, i) => <Link key={episode.slug} href={`/podcast/${episode.slug}`} className="group flex items-center gap-5 border-b border-off-white/15 py-6"><span className="font-serif text-2xl text-off-white/50">0{i + 2}</span><div><p className="text-[10px] uppercase tracking-label text-off-white/45">{episode.duration} · {episode.category}</p><h3 className="mt-1 font-serif text-2xl leading-none transition-transform duration-300 group-hover:translate-x-1">{episode.title}</h3></div><span className="ml-auto transition-transform group-hover:translate-x-1">→</span></Link>)}</div></div></div></section>
}

function Feature({ episode }: { episode: typeof featuredEpisode }) {
  return <Link href={`/podcast/${episode.slug}`} data-cursor="PLAY" className="group block cursor-none-desktop"><div className="relative aspect-[16/10] overflow-hidden rounded-sm"><Image src={episode.cover} alt={episode.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]" /><div className="absolute inset-0 bg-gradient-to-t from-warm-black/65 via-transparent" /><motion.span whileHover={{ scale: 1.08 }} className="absolute bottom-5 left-5 grid size-14 place-items-center rounded-full bg-off-white text-warm-black">▶</motion.span><div className="absolute inset-x-0 bottom-0 p-5 pl-24"><p className="text-[10px] uppercase tracking-label text-off-white/70">EP. 01 · {episode.duration} · VIDEO PODCAST</p></div></div><h3 className="mt-5 font-serif text-4xl leading-[.9] md:text-5xl">{episode.title}</h3><p className="mt-3 text-sm text-off-white/65">Təhminə Doruk × Senan — two perspectives, one conversation.</p></Link>
}
