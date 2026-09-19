'use client'
import Link from 'next/link'
import { usePreview } from '@/components/content/public-content'
import { previewHref } from '@/lib/preview-href'
export { previewHref } from '@/lib/preview-href'
export function PreviewLink({href,...props}:React.ComponentProps<typeof Link>){const preview=usePreview();return <Link href={typeof href==='string'?previewHref(href,preview):href} {...props}/>}
