export type NavItem = {
  label: string
  href: string
  index: string
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Mən kiməm', href: '/about', index: '01' },
  { label: 'Düşüncələr', href: '/journal', index: '02' },
  { label: 'Podcast', href: '/podcast', index: '03' },
  { label: 'Videolar', href: '/videos', index: '04' },
  { label: 'Hekayələr', href: '/stories', index: '05' },
  { label: 'Əlaqə', href: '/contact', index: '06' },
]

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'YouTube', href: 'https://youtube.com' },
  { label: 'Spotify', href: 'https://spotify.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
]
