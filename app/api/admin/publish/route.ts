import { NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin-auth'
import { publishAtomic } from '@/lib/github'
import { validateContent } from '@/lib/content-validation'
import crypto from 'node:crypto'

const dataImage = /^data:(image\/(?:png|jpeg|webp|gif));base64,([a-zA-Z0-9+/=]+)$/
function extractImages(value: unknown, media: { path: string; content: string }[] = []): { value: unknown; media: { path: string; content: string }[] } {
  if (typeof value === 'string') {
    const match = value.match(dataImage)
    if (!match) return { value, media }
    const extension = match[1] === 'image/jpeg' ? 'jpg' : match[1].split('/')[1]
    const binary = Buffer.from(match[2], 'base64')
    if (binary.length > 8 * 1024 * 1024) throw new Error('IMAGE_TOO_LARGE')
    const path = `public/uploads/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${extension}`
    media.push({ path, content: match[2] })
    return { value: `/${path.slice('public/'.length)}`, media }
  }
  if (Array.isArray(value)) return { value: value.map(item => extractImages(item, media).value), media }
  if (value && typeof value === 'object') return { value: Object.fromEntries(Object.entries(value).map(([key, item]) => [key, extractImages(item, media).value])), media }
  return { value, media }
}

export async function POST(request: Request) {
  try {
    await requireAdmin()
    const body = await request.json() as { content?: unknown; revision?: string }
    if (!body.revision || !body.content) return NextResponse.json({ error: 'Some content is invalid. Please review your changes.' }, { status: 400 })
    const extracted = extractImages(body.content)
    if (!validateContent(extracted.value)) return NextResponse.json({ error: 'Some content is invalid. Please review your changes.' }, { status: 400 })
    const serialized = JSON.stringify(extracted.value, null, 2) + '\n'
    const revision = await publishAtomic(body.revision, [{ path: 'content/published-content.json', content: Buffer.from(serialized).toString('base64') }, ...extracted.media])
    return NextResponse.json({ ok: true, revision })
  } catch (error) {
    const code = error instanceof Error ? error.message : ''
    const message = code === 'CONTENT_CONFLICT' ? 'Published content changed while you were editing. Reload and reconcile your draft before publishing.' : code === 'GITHUB_AUTH_FAILED' ? 'Publishing is not authorized. Please contact the site administrator.' : 'Publishing failed. Your local draft is safe; please try again.'
    return NextResponse.json({ error: message, conflict: code === 'CONTENT_CONFLICT' }, { status: code === 'CONTENT_CONFLICT' ? 409 : 500 })
  }
}
