import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import { SiteChrome } from '@/components/layout/site-chrome'
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
    default: 'SISU Free Soul — Öz həyatının müəllifi ol',
    template: '%s — SISU Free Soul',
  },
  description:
    'Təhminə Doruk — həyat, azadlıq və dürüst söhbətlər. Hazır qəliblərdən çıx, öz yolunu seç, öz həqiqətini yarat. Podcast, videolar, düşüncələr və hekayələr.',
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
    title: 'SISU Free Soul — Öz həyatının müəllifi ol',
    description:
      'Həyat, azadlıq və dürüst söhbətlər. Öz yolunu seç, öz həqiqətini yarat.',
    images: [{ url: '/images/sisu-hero-poster.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SISU Free Soul — Öz həyatının müəllifi ol',
    description: 'Həyat, azadlıq və dürüst söhbətlər.',
    images: ['/images/sisu-hero-poster.png'],
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
