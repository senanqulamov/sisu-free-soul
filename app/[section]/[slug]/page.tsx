import { notFound } from 'next/navigation'
import { publishedContent } from '@/content/cms'
import { PublicContentProvider } from '@/components/content/public-content'
import { CollectionDetail } from '@/components/sections/collection-detail'
import { isAdmin } from '@/lib/admin-auth'

const supported = ['journal','podcast','videos','stories'] as const
export default async function DetailPage({params,searchParams}:{params:Promise<{section:string;slug:string}>;searchParams:Promise<{preview?:string}>}){const {section,slug}=await params;const {preview}=await searchParams;if(!supported.includes(section as typeof supported[number]))notFound();const activePreview=preview==='1'&&await isAdmin();if(!activePreview){const items=section==='journal'?publishedContent.journal:section==='podcast'?publishedContent.podcasts:section==='videos'?publishedContent.videos:publishedContent.stories;if(!items.find(item=>item.slug===slug&&item.visible!==false))notFound()}return <PublicContentProvider preview={activePreview}><CollectionDetail section={section as typeof supported[number]} slug={slug} preview={activePreview}/></PublicContentProvider>}
