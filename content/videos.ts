export type VideoItem = {
  slug: string
  title: string
  category:
    | 'Conversations'
    | 'Short Films'
    | 'Thoughts'
    | 'Stories'
    | 'Psychology'
    | 'Life'
    | 'Relationships'
    | 'Freedom'
  duration: string
  date: string
  poster: string
  aspect: 'landscape' | 'portrait' | 'square'
  youtubeUrl?: string
  vimeoUrl?: string
  videoUrl?: string
  description?: string
}

export const videos: VideoItem[] = [
  {
    slug: 'oz-yolunu-secmek',
    title: 'Öz yolunu seçmək',
    category: 'Short Films',
    duration: '4:12',
    date: '2026-01-16',
    poster: '/images/sisu-closing.png',
    aspect: 'landscape',
    youtubeUrl: 'https://youtube.com',
    description: 'Qısa kinematik esse — seçim və cəsarət haqqında.',
  },
  {
    slug: 'sabah-sohbeti',
    title: 'Səhər söhbəti',
    category: 'Conversations',
    duration: '12:40',
    date: '2026-01-30',
    poster: '/images/video-1.png',
    aspect: 'landscape',
    youtubeUrl: 'https://youtube.com',
    description: 'Təhminə və Senan gündəlik seçimlər haqqında.',
  },
  {
    slug: 'gunduzun-sesi',
    title: 'Gündüzün səsi',
    category: 'Thoughts',
    duration: '2:05',
    date: '2026-02-08',
    poster: '/images/video-2.png',
    aspect: 'portrait',
    videoUrl: '/videos/sisu-hero.mp4',
    description: 'Bir dəqiqəlik düşüncə.',
  },
  {
    slug: 'nefes',
    title: 'Nəfəs',
    category: 'Life',
    duration: '1:30',
    date: '2026-02-14',
    poster: '/images/video-3.png',
    aspect: 'square',
    description: 'Sakit an.',
  },
  {
    slug: 'meshede',
    title: 'Meşədə',
    category: 'Freedom',
    duration: '3:48',
    date: '2026-02-22',
    poster: '/images/video-4.png',
    aspect: 'landscape',
    description: 'Təbiətdə tənhalıq və azadlıq.',
  },
  {
    slug: 'pencerenin-onunde',
    title: 'Pəncərənin önündə',
    category: 'Psychology',
    duration: '6:20',
    date: '2026-03-04',
    poster: '/images/sisu-outdoor.png',
    aspect: 'portrait',
    description: 'İçəri baxmaq haqqında.',
  },
]

export const featuredVideo = videos[0]

export function getVideo(slug: string) {
  return videos.find((v) => v.slug === slug)
}
