export type Story = {
  slug: string
  name: string
  category: string
  statement: string
  title: string
  portrait: string
  body?: string[]
}

export const stories: Story[] = [
  {
    slug: 'ayan',
    name: 'Ayan',
    category: 'Freedom',
    statement: 'Başqalarının planından çıxıb öz həyatımı seçdim.',
    title: 'Gec deyildi.',
    portrait: '/images/story-1.png',
    body: [
      'TODO: Ayanın həqiqi hekayəsi ilə əvəz et. Bu redaktə oluna bilən yer tutucudur.',
    ],
  },
  {
    slug: 'leyla',
    name: 'Leyla',
    category: 'Courage',
    statement: 'Qorxduğum söhbəti nəhayət etdim.',
    title: 'İlk cümlə ən çətini idi.',
    portrait: '/images/story-2.png',
    body: ['TODO: Leylanın hekayəsi ilə əvəz et.'],
  },
  {
    slug: 'nihad',
    name: 'Nihad',
    category: 'Self-authorship',
    statement: 'Öz səsimi yenidən eşitməyi öyrəndim.',
    title: 'Sükut da bir cavabdır.',
    portrait: '/images/story-3.png',
    body: ['TODO: Nihadın hekayəsi ilə əvəz et.'],
  },
]

export function getStory(slug: string) {
  return stories.find((s) => s.slug === slug)
}
