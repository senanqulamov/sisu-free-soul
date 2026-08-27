export type JournalArticle = {
  slug: string
  index: string
  title: string
  excerpt: string
  readingTime: string
  category: string
  date: string
  cover?: string
  // Editable long-form body — array of blocks.
  body?: ArticleBlock[]
}

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'h'; text: string }
  | { type: 'image'; src: string; alt: string }

export const journalArticles: JournalArticle[] = [
  {
    slug: 'hec-kim-senin-yerine-yasaya-bilmez',
    index: '01',
    title: 'Heç kim sənin yerinə yaşaya bilməz.',
    excerpt:
      'Başqalarının gözləntiləri ilə öz həqiqətin arasındakı incə xətt haqqında.',
    readingTime: '6 dəq oxu',
    category: 'Freedom',
    date: '2026-01-09',
    cover: '/images/journal-1.png',
    body: [
      {
        type: 'p',
        text: 'Uzun müddət başqalarının həyatımı necə görmək istədiyini yaşadım. TODO: Real esse mətni ilə əvəz et — bu yalnız redaktə oluna bilən yer tutucudur.',
      },
      {
        type: 'quote',
        text: 'Öz həyatının müəllifi olmaq başqalarının qələmini geri almaqla başlayır.',
      },
      {
        type: 'p',
        text: 'Müşahidə etmək, sorğulamaq və araşdırmaq — öz həqiqətinə gedən yol buradan keçir.',
      },
      { type: 'h', text: 'Seçimin ağırlığı' },
      {
        type: 'p',
        text: 'Azadlıq həm də məsuliyyətdir. Seçim etdiyimiz an, onun nəticələrini də üzərimizə götürürük.',
      },
    ],
  },
  {
    slug: 'azadliq-secim-deyil-mesuliyyetdir',
    index: '02',
    title: 'Azadlıq seçim deyil, məsuliyyətdir.',
    excerpt: 'Azad olmaq nə deməkdir və nəyin bahasına gəlir?',
    readingTime: '8 dəq oxu',
    category: 'Life',
    date: '2026-01-23',
    cover: '/images/sisu-outdoor.png',
    body: [
      {
        type: 'p',
        text: 'TODO: Real esse mətni ilə əvəz et.',
      },
      {
        type: 'quote',
        text: 'Azadlıq istədiyin hər şeyi etmək deyil. Azadlıq — öz həyatını seçməkdir.',
      },
    ],
  },
  {
    slug: 'oz-sesimizi-esitmek',
    index: '03',
    title: 'Nə vaxt öz səsimizi eşitməyi dayandırırıq?',
    excerpt: 'Daxili səsimizlə əlaqəni itirmək və onu yenidən tapmaq.',
    readingTime: '5 dəq oxu',
    category: 'Psychology',
    date: '2026-02-06',
    cover: '/images/video-2.png',
    body: [{ type: 'p', text: 'TODO: Real esse mətni ilə əvəz et.' }],
  },
  {
    slug: 'muahide-etmek-sanetdir',
    index: '04',
    title: 'Müşahidə etmək bir sənətdir.',
    excerpt: 'Tələsmədən baxmaq, tələsmədən anlamaq haqqında.',
    readingTime: '4 dəq oxu',
    category: 'Thoughts',
    date: '2026-02-20',
    cover: '/images/video-4.png',
    body: [{ type: 'p', text: 'TODO: Real esse mətni ilə əvəz et.' }],
  },
]

export function getArticle(slug: string) {
  return journalArticles.find((a) => a.slug === slug)
}
