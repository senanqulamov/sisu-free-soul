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
    slug: 'ozunu-tani',
    episode: 1,
    title: 'Özünü Tanı',
    description:
      'Həqiqətən kim olduğunu kəşf et. Sənə öyrədilən kimliklərin, qorxuların və gözləntilərin arxasında əsl səni araşdır.',
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
    slug: 'azad-ol',
    episode: 2,
    title: 'Azad ol',
    description:
      'Öz həyatını başqalarının qaydaları ilə yaşamaq məcburiyyətində deyilsən. Sərhədləri, münasibətləri, cəmiyyətin gözləntilərini və səni özündən uzaqlaşdıran görünməz bağları yenidən düşün.',
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
    slug: 'ozunu-yeniden-qur',
    episode: 3,
    title: 'Özünü Yenidən Qur',
    description:
      'Bəzən yeni bir həyata başlamaq üçün əvvəlcə köhnə özünü buraxmalısan. Dəyişiklik, itki, qorxu və qeyri-müəyyənliyin içindən keçərək sənə uyğun olan həyatı gör və onu yenidən qur.',
    guests: ['Təhminə Doruk', 'Senan'],
    duration: '1H 04',
    category: 'Relationships',
    date: '2026-02-11',
    cover: '/images/sisu-outdoor.png',
    spotifyUrl: 'https://spotify.com',
    summary: 'TODO: Real epizod məzmunu ilə əvəz et.',
  },
  {
    slug: 'zehib-beden-haqiqet',
    episode: 4,
    title: 'Zehin, Bədən və Həqiqət',
    description:
      'Düşüncələrin, bədənin və dünyanı qavramağın bir-birindən nə qədər ayrıdır? Psixologiya, neyroelm, şüur və bədən arasındakı əlaqəni həm rasional, həm də açıq düşüncə ilə araşdır.',
    guests: ['Təhminə Doruk', 'Senan'],
    duration: '51 MIN',
    category: 'Life',
    date: '2026-02-25',
    cover: '/images/tahmine-portrait.png',
    spotifyUrl: 'https://spotify.com',
    summary: 'TODO: Real epizod məzmunu ilə əvəz et.',
  },
  {
    slug: 'mena-axtarisi',
    episode: 5,
    title: 'Məna Axtarışında',
    description:
      'Yaşamaq, sevmək, itirmək və var olmaq nə deməkdir? Fəlsəfə, spirituallıq, ölüm, həyat, tənhalıq və insan olmağın dərin suallarının ardınca get.',
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
