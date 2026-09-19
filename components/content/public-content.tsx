'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { publishedContent, type SiteContent } from '@/content/cms'
import { getStagedMedia } from '@/lib/staged-media'
import { previewHref } from '@/lib/preview-href'

const ContentContext = createContext<SiteContent>(publishedContent)
const PreviewContext = createContext(false)
export function PublicContentProvider({ preview = false, children }: { preview?: boolean; children: React.ReactNode }) {
  const [content, setContent] = useState(publishedContent)
  const [ready, setReady] = useState(!preview)
  useEffect(() => {
    if (!preview) return
    Promise.resolve().then(() => { try { const saved = localStorage.getItem('sisu-cms-draft-v1'); if (saved) setContent(JSON.parse(saved).content) } catch {} finally { setReady(true) } })
  }, [preview])
  useEffect(() => {
    if (!preview) return
    const preserve = (event: MouseEvent) => { const anchor = (event.target as Element | null)?.closest('a[href]') as HTMLAnchorElement | null; if (!anchor || anchor.target || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return; const next = previewHref(anchor.getAttribute('href') ?? '', true); if (next === anchor.getAttribute('href')) return; event.preventDefault(); window.location.assign(next) }
    document.addEventListener('click', preserve)
    return () => document.removeEventListener('click', preserve)
  }, [preview])
  if (!ready) return <main className="grid min-h-screen place-items-center bg-background text-foreground">Loading draft preview…</main>
  return <PreviewContext.Provider value={preview}><ContentContext.Provider value={content}>{preview && <div className="fixed bottom-4 left-4 z-[200] flex items-center gap-3 rounded-full bg-warm-black px-4 py-2 text-xs text-off-white shadow-xl"><span>Draft Preview</span><Link href="/admin" className="underline">Back to Admin</Link></div>}{children}</ContentContext.Provider></PreviewContext.Provider>
}
export function usePublicContent() { return useContext(ContentContext) }
export function usePreview() { return useContext(PreviewContext) }
export function useMediaSource(source: string) {
  const [url, setUrl] = useState(source.startsWith('staged-media:') ? '/placeholder.jpg' : source)
  useEffect(() => { let objectUrl = ''; Promise.resolve().then(async () => { if (source.startsWith('staged-media:')) { const item = await getStagedMedia(source); if (item) { objectUrl = URL.createObjectURL(item.file); setUrl(objectUrl) } else setUrl('/placeholder.jpg') } else setUrl(source) }); return () => { if (objectUrl) URL.revokeObjectURL(objectUrl) } }, [source])
  return url
}
