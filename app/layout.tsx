import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import { SiteChrome } from '@/components/layout/site-chrome'
import { publishedContent } from '@/content/cms'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://sisufreesoul.com'),
  title: {
    default: publishedContent.seo.title,
    template: '%s — SISU Free Soul',
  },
  description: publishedContent.seo.description,
  keywords: [
    'SISU',
    'Free Soul',
    'Təhminə Doruk',
    'life coaching',
    'podcast',
    'azadlıq',
    'öz həyatının müəllifi',
  ],
  authors: [{ name: 'Təhminə Doruk' }],
  openGraph: {
    type: 'website',
    locale: 'az_AZ',
    url: 'https://sisufreesoul.com',
    siteName: 'SISU Free Soul',
    title: publishedContent.seo.ogTitle,
    description: publishedContent.seo.ogDescription,
    images: [{ url: publishedContent.seo.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: publishedContent.seo.ogTitle,
    description: publishedContent.seo.ogDescription,
    images: [publishedContent.seo.ogImage],
  },
  alternates: { canonical: '/' },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f3f0e9',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="az" className={`${cormorant.variable} ${manrope.variable} bg-background`}>
      <body className="antialiased">
        <SiteChrome>{children}</SiteChrome>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
