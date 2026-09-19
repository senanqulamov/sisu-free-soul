import Image from 'next/image'
import { notFound } from 'next/navigation'
import { publishedContent } from '@/content/cms'

const supported = ['journal', 'podcast', 'videos', 'stories'] as const

export default async function DetailPage({ params }: { params: Promise<{ section: string; slug: string }> }) {
  const { section, slug } = await params
  if (!supported.includes(section as typeof supported[number])) notFound()
  const item = section === 'journal' ? publishedContent.journal.find((item) => item.slug === slug && item.visible !== false) : section === 'podcast' ? publishedContent.podcasts.find((item) => item.slug === slug && item.visible !== false) : section === 'videos' ? publishedContent.videos.find((item) => item.slug === slug && item.visible !== false) : publishedContent.stories.find((item) => item.slug === slug && item.visible !== false)
  if (!item) notFound()
  const image = 'portrait' in item ? item.portrait : 'poster' in item ? item.poster : item.cover
  const label = 'episode' in item ? `SISU CONVERSATIONS · EP ${String(item.episode).padStart(2, '0')}` : section.toUpperCase()
  const summary = 'description' in item ? item.description : 'excerpt' in item ? item.excerpt : 'statement' in item ? item.statement : ''
  return <article className="bg-background pt-32 md:pt-44"><header className="mx-auto max-w-[1180px] px-5 pb-14 md:px-8 md:pb-20"><a href={`/${section}`} className="text-xs uppercase tracking-label text-muted transition-colors hover:text-foreground">← {section}</a><p className="mt-12 text-xs uppercase tracking-label text-clay">{label}</p><h1 className="mt-6 max-w-5xl font-serif text-[14vw] leading-[.86] tracking-tight md:text-[8vw]">{item.title}</h1><p className="mt-9 max-w-2xl text-lg leading-relaxed text-muted">{summary}</p></header><div className="relative mx-auto aspect-[16/9] max-w-[1600px] overflow-hidden md:rounded-sm"><Image src={image || '/placeholder.jpg'} alt={item.title} fill priority sizes="100vw" className="object-cover" /></div><div className="mx-auto max-w-[780px] px-5 py-20 md:px-0 md:py-28"><p className="font-serif text-3xl leading-snug md:text-5xl">Düşünməyə davam et.</p><p className="mt-8 leading-[1.9] text-muted">Bu, redaktə edilə bilən uzun-forma səhifə şablonudur. Real mətn, video, transcript və ya hekayə materialı əlavə edildikdə eyni oxunaqlılıq, rahat sətir uzunluğu və editorial ritm qorunacaq.</p>{section === 'podcast' && <div className="mt-12 border-y border-foreground/15 py-6 text-sm"><p className="uppercase tracking-label text-muted">Dinlə</p><div className="mt-4 flex gap-6 underline underline-offset-4"><a href="https://spotify.com">Spotify</a><a href="https://youtube.com">YouTube</a></div></div>}</div></article>
}
