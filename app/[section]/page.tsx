import Image from 'next/image'
import { notFound } from 'next/navigation'
import { publishedContent } from '@/content/cms'
import { EditorialLink } from '@/components/editorial-link'
import { AboutExperience } from '@/components/sections/about-experience'
import { PublicContentProvider } from '@/components/content/public-content'
import { isAdmin } from '@/lib/admin-auth'
import { Archive as ArchiveView } from '@/components/sections/archive'

type Section = 'about' | 'journal' | 'podcast' | 'videos' | 'stories' | 'contact'
const sections: Section[] = ['about', 'journal', 'podcast', 'videos', 'stories', 'contact']

export function generateStaticParams() { return sections.map((section) => ({ section })) }

export default async function SectionPage({ params, searchParams }: { params: Promise<{ section: string }>; searchParams: Promise<{ preview?: string }> }) {
  const { section } = await params
  const { preview } = await searchParams
  if (!sections.includes(section as Section)) notFound()
  if (section === 'about') return <PublicContentProvider preview={preview === '1' && await isAdmin()}><AboutExperience /></PublicContentProvider>
  if (section === 'contact') return <Contact />
  return <PublicContentProvider preview={preview === '1' && await isAdmin()}><ArchiveView section={section as Exclude<Section, 'about' | 'contact'>} /></PublicContentProvider>
}

function Intro({ section }: { section: Section }) {
  const item = publishedContent.pages[section]
  return <header className="bg-background px-5 pb-16 pt-40 md:px-8 md:pb-24 md:pt-48"><div className="mx-auto max-w-[1600px]"><p className="text-xs uppercase tracking-label text-muted">{item.label}</p><h1 className="mt-8 max-w-6xl font-serif text-[16vw] leading-[.83] tracking-tight md:text-[9vw]">{item.title}</h1><p className="mt-10 max-w-xl text-base leading-relaxed text-muted md:text-lg">{item.intro}</p></div></header>
}


function Contact() { const { contactPageTitle, contactPageDescription } = publishedContent.homepage; return <><Intro section="contact" /><section className="bg-deep-green px-5 py-24 text-off-white md:px-8 md:py-32"><div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-2"><div><p className="font-serif text-4xl leading-tight md:text-6xl">{contactPageTitle}</p><p className="mt-6 max-w-md leading-relaxed text-off-white/70">{contactPageDescription}</p></div><div className="border-t border-off-white/20 pt-6"><a href={`mailto:${publishedContent.footer.email}`} className="font-serif text-3xl underline decoration-clay underline-offset-8 md:text-5xl">{publishedContent.footer.email}</a></div></div></section></> }
