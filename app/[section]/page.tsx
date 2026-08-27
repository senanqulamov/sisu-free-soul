import Image from 'next/image'
import { notFound } from 'next/navigation'
import { journalArticles } from '@/content/journal'
import { podcastEpisodes } from '@/content/podcast'
import { stories } from '@/content/stories'
import { videos } from '@/content/videos'
import { EditorialLink } from '@/components/editorial-link'
import { AboutExperience } from '@/components/sections/about-experience'

type Section = 'about' | 'journal' | 'podcast' | 'videos' | 'stories' | 'contact'
const sections: Section[] = ['about', 'journal', 'podcast', 'videos', 'stories', 'contact']
const copy: Record<Section, { label: string; title: string; intro: string }> = {
  about: { label: '01 / TƏHMİNƏ', title: 'Mən kiməm?', intro: '' },
  journal: { label: 'JOURNAL', title: 'Düşüncələr', intro: 'Tələsmədən baxmaq, soruşmaq və öz səsini yenidən eşitmək üçün qeydlər.' },
  podcast: { label: 'SISU CONVERSATIONS', title: 'Podcast', intro: 'Həyat, münasibətlər, seçimlər, qorxular və insan olmaq haqqında filtrlənməmiş söhbətlər.' },
  videos: { label: 'WATCH', title: 'Fikirlər. Hekayələr. Söhbətlər.', intro: 'Qısa filmlər, kadrarxası və düşünməyə davam edən vizual esselər.' },
  stories: { label: 'STORIES', title: 'Hekayələrimiz bizi dəyişdirir.', intro: 'İnsanların öz yolunu tapmaq üçün verdiyi sakit, cəsarətli qərarlar.' },
  contact: { label: 'CONTACT', title: 'Söhbətə başlayaq.', intro: 'Bir sualın, fikrin və ya əməkdaşlıq təklifin varsa, buradan başlaya bilərik.' },
}

export function generateStaticParams() { return sections.map((section) => ({ section })) }

export default async function SectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params
  if (!sections.includes(section as Section)) notFound()
  if (section === 'about') return <AboutExperience />
  if (section === 'contact') return <Contact />
  return <Archive section={section as Exclude<Section, 'about' | 'contact'>} />
}

function Intro({ section }: { section: Section }) {
  const item = copy[section]
  return <header className="bg-background px-5 pb-16 pt-40 md:px-8 md:pb-24 md:pt-48"><div className="mx-auto max-w-[1600px]"><p className="text-xs uppercase tracking-label text-muted">{item.label}</p><h1 className="mt-8 max-w-6xl font-serif text-[16vw] leading-[.83] tracking-tight md:text-[9vw]">{item.title}</h1><p className="mt-10 max-w-xl text-base leading-relaxed text-muted md:text-lg">{item.intro}</p></div></header>
}

function Archive({ section }: { section: Exclude<Section, 'about' | 'contact'> }) {
  const entries = section === 'journal' ? journalArticles : section === 'podcast' ? podcastEpisodes : section === 'videos' ? videos : stories
  const imageFor = (item: typeof entries[number]) => 'portrait' in item ? item.portrait : 'poster' in item ? item.poster : item.cover
  return <><Intro section={section} /><main className="bg-off-white px-5 pb-28 md:px-8 md:pb-40"><div className="mx-auto grid max-w-[1600px] gap-4 border-t border-foreground/15 pt-5 sm:grid-cols-2 lg:grid-cols-3">{entries.map((item, index) => <a key={item.slug} href={`/${section}/${item.slug}`} className={`group relative block overflow-hidden bg-surface ${index % 3 === 1 ? 'lg:mt-20' : ''}`}><div className="relative aspect-[4/5] overflow-hidden"><Image src={imageFor(item) || '/placeholder.jpg'} alt={item.title} fill sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" className="object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]" /><div className="absolute inset-0 bg-gradient-to-t from-warm-black/65 via-transparent to-transparent" /><p className="absolute left-5 top-5 text-[10px] uppercase tracking-label text-off-white/75">{String(index + 1).padStart(2, '0')} / {'category' in item ? item.category : section}</p><div className="absolute inset-x-0 bottom-0 p-5"><h2 className="font-serif text-3xl leading-[.9] text-off-white md:text-4xl">{item.title}</h2><span className="mt-4 block text-sm text-off-white/70 transition-transform duration-300 group-hover:translate-x-1">Kəşf et →</span></div></div></a>)}</div></main></>
}

function Contact() { return <><Intro section="contact" /><section className="bg-deep-green px-5 py-24 text-off-white md:px-8 md:py-32"><div className="mx-auto grid max-w-[1600px] gap-12 md:grid-cols-2"><div><p className="font-serif text-4xl leading-tight md:text-6xl">Dürüst bir söhbət üçün yer var.</p><p className="mt-6 max-w-md leading-relaxed text-off-white/70">Fərdi söhbətlər, workshoplar, çıxışlar və yaradıcı əməkdaşlıqlar üçün yaz.</p></div><div className="border-t border-off-white/20 pt-6"><a href="mailto:hello@sisufreesoul.com" className="font-serif text-3xl underline decoration-clay underline-offset-8 md:text-5xl">hello@sisufreesoul.com</a><p className="mt-12 text-xs uppercase tracking-label text-off-white/50">TODO: contact form and social links</p></div></div></section></> }
