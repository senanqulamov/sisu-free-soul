'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { publishedContent, type SiteContent } from '@/content/cms'
import { getStagedMedia } from '@/lib/staged-media'

const ContentContext = createContext<SiteContent>(publishedContent)
export function PublicContentProvider({ preview = false, children }: { preview?: boolean; children: React.ReactNode }) {
  const [content, setContent] = useState(publishedContent)
  useEffect(() => {
    if (!preview) return
    try { const saved = localStorage.getItem('sisu-cms-draft-v1'); if (saved) setContent(JSON.parse(saved).content) } catch {}
  }, [preview])
  return <ContentContext.Provider value={content}>{preview && <div className="fixed bottom-4 left-4 z-[200] flex items-center gap-3 rounded-full bg-warm-black px-4 py-2 text-xs text-off-white shadow-xl"><span>Draft Preview</span><a href="/admin" className="underline">Back to Admin</a></div>}{children}</ContentContext.Provider>
}
export function usePublicContent() { return useContext(ContentContext) }
export function useMediaSource(source: string) {
  const [url, setUrl] = useState(source)
  useEffect(() => { let objectUrl = ''; if (source.startsWith('staged-media:')) getStagedMedia(source).then(item => { if (item) { objectUrl = URL.createObjectURL(item.file); setUrl(objectUrl) } }); else setUrl(source); return () => { if (objectUrl) URL.revokeObjectURL(objectUrl) } }, [source])
  return url
}
