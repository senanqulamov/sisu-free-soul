export type PodcastEpisode = {
  slug: string
  episode: number
  title: string
  description: string
  guests: string[]
  duration: string
  category: 'Life' | 'Psychology' | 'Relationships' | 'Freedom' | 'Conversations'
  date: string
  cover: string
  videoUrl?: string
  spotifyUrl?: string
  appleUrl?: string
  youtubeUrl?: string
  // Editable episode detail content
  summary?: string
  chapters?: { time: string; title: string }[]
  questions?: string[]
  quotes?: string[]
}

export const podcastEpisodes: PodcastEpisode[] = [
  {
    slug: 'oz-heyatini-sen-secmisen',
    episode: 1,
    title: 'Öz həyatını həqiqətən sən seçmisən?',
    description:
      'Seçimlərimizin nə qədəri bizimdir və nə qədəri başqalarının gözləntiləridir? Təhminə və Senan cəmiyyətin qəlibləri haqqında danışır.',
    guests: ['Təhminə Doruk', 'Senan'],
    duration: '58 MIN',
    category: 'Conversations',
    date: '2026-01-14',
    cover: '/images/podcast-featured.png',
    spotifyUrl: 'https://spotify.com',
    appleUrl: 'https://podcasts.apple.com',
    youtubeUrl: 'https://youtube.com',
    summary:
      'Bu epizodda seçim azadlığının həqiqi mənası, cəmiyyətin bizə hazırladığı qəliblər və öz həyatının müəllifi olmaq cəsarəti müzakirə olunur. TODO: Real epizod məzmunu ilə əvəz et.',
    chapters: [
      { time: '00:00', title: 'Giriş — kim seçir?' },
      { time: '07:20', title: 'Cəmiyyətin hazır qəlibləri' },
      { time: '19:45', title: 'Qorxu və məsuliyyət' },
      { time: '34:10', title: 'Öz həqiqətini yaratmaq' },
      { time: '49:30', title: 'Yekun düşüncələr' },
    ],
    questions: [
      'Son qərarını həqiqətən sən verdinmi?',
      'Kimin gözləntiləri sənin həyatını idarə edir?',
      'Azadlıq sənin üçün nə deməkdir?',
    ],
    quotes: [
      'Azadlıq — öz həyatını seçmək və onun müəllifi olmaqdır.',
      'Seçim etməmək də bir seçimdir.',
    ],
  },
  {
    slug: 'qorxu-bizi-qoruyur-yoxsa-saxlayir',
    episode: 2,
    title: 'Qorxu bizi qoruyur, yoxsa saxlayır?',
    description:
      'Qorxunun psixologiyası, onu necə tanımaq və onunla necə yaşamaq barədə səmimi söhbət.',
    guests: ['Təhminə Doruk', 'Senan'],
    duration: '46 MIN',
    category: 'Psychology',
    date: '2026-01-28',
    cover: '/images/sisu-close.png',
    spotifyUrl: 'https://spotify.com',
    youtubeUrl: 'https://youtube.com',
    summary: 'TODO: Real epizod məzmunu ilə əvəz et.',
    quotes: ['Qorxu bir siqnaldır, qadağa deyil.'],
  },
  {
    slug: 'munasibetlerde-azadliq',
    episode: 3,
    title: 'Münasibətlərdə azadlıq mümkündürmü?',
    description:
      'Yaxınlıq və azadlıq bir arada ola bilərmi? Sağlam sərhədlər və seçim haqqında.',
    guests: ['Təhminə Doruk', 'Senan'],
    duration: '1H 04',
    category: 'Relationships',
    date: '2026-02-11',
    cover: '/images/sisu-outdoor.png',
    spotifyUrl: 'https://spotify.com',
    summary: 'TODO: Real epizod məzmunu ilə əvəz et.',
  },
  {
    slug: 'ugur-kimin-terifidir',
    episode: 4,
    title: 'Uğur kimin tərifidir?',
    description:
      'Uğurun kimin tərifi olduğunu və öz ölçülərimizi necə yaratmağı araşdırırıq.',
    guests: ['Təhminə Doruk', 'Senan'],
    duration: '51 MIN',
    category: 'Life',
    date: '2026-02-25',
    cover: '/images/tahmine-portrait.png',
    spotifyUrl: 'https://spotify.com',
    summary: 'TODO: Real epizod məzmunu ilə əvəz et.',
  },
  {
    slug: 'oz-sesimizi-esitmek',
    episode: 5,
    title: 'Öz səsimizi eşitməyi nə vaxt dayandırırıq?',
    description:
      'Daxili səsimizlə əlaqəni itirmək və onu yenidən tapmaq haqqında.',
    guests: ['Təhminə Doruk'],
    duration: '39 MIN',
    category: 'Freedom',
    date: '2026-03-10',
    cover: '/images/video-2.png',
    spotifyUrl: 'https://spotify.com',
    summary: 'TODO: Real epizod məzmunu ilə əvəz et.',
  },
]

export const featuredEpisode = podcastEpisodes[0]

export function getEpisode(slug: string) {
  return podcastEpisodes.find((e) => e.slug === slug)
}

export const podcastCategories = [
  'ALL',
  'LIFE',
  'PSYCHOLOGY',
  'RELATIONSHIPS',
  'FREEDOM',
  'CONVERSATIONS',
] as const
