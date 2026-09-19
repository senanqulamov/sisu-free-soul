import type { SiteContent } from '@/content/cms'

const maxText = 50_000
const safePath = /^\/(?:images|uploads|videos)\/[a-zA-Z0-9._/-]+$/
const safeUrl = /^(https?:\/\/|mailto:|\/)/i

export function validateContent(value: unknown): value is SiteContent {
  if (!value || typeof value !== 'object') return false
  const text = JSON.stringify(value)
  if (text.length > 1_500_000 || text.includes('__proto__')) return false
  const content = value as SiteContent
  if (!Array.isArray(content.podcasts) || !Array.isArray(content.journal) || !Array.isArray(content.stories) || !Array.isArray(content.videos) || !Array.isArray(content.navigation)) return false
  const strings = text.match(/"(?:[^"\\]|\\.)*"/g) ?? []
  if (strings.some((entry) => entry.length > maxText)) return false
  const urls = collectUrls(content)
  const collections = [content.podcasts, content.journal, content.stories, content.videos]
  const safeSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  if (collections.some((items) => items.some((item) => !safeSlug.test(item.slug)) || new Set(items.map((item) => item.slug)).size !== items.length)) return false
  return urls.every((url) => safeUrl.test(url) || safePath.test(url))
}

function collectUrls(content: SiteContent) {
  const found: string[] = []
  const visit = (value: unknown, key = ''): void => {
    if (typeof value === 'string' && /(url|href|cover|poster|portrait|image|src)$/i.test(key)) found.push(value)
    else if (Array.isArray(value)) value.forEach((item) => visit(item, key))
    else if (value && typeof value === 'object') Object.entries(value).forEach(([name, item]) => visit(item, name))
  }
  visit(content)
  return found
}
