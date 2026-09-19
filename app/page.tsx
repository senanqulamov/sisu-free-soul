import { CinematicHero } from '@/components/hero/cinematic-hero'
import { Manifesto } from '@/components/sections/manifesto'
import { TahmineIntro } from '@/components/sections/tahmine-intro'
import { SignatureMedia } from '@/components/sections/signature-media'
import { PodcastPreview } from '@/components/sections/podcast-preview'
import { HomeEditorialSections } from '@/components/sections/home-editorial-sections'
import { HomeKineticInterlude } from '@/components/sections/home-kinetic-interlude'
import { PublicContentProvider } from '@/components/content/public-content'
import { isAdmin } from '@/lib/admin-auth'

export default async function HomePage({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  const { preview } = await searchParams
  return <PublicContentProvider preview={preview === '1' && await isAdmin()}><CinematicHero /><Manifesto /><HomeKineticInterlude /><TahmineIntro /><SignatureMedia /><PodcastPreview /><HomeEditorialSections /></PublicContentProvider>
}
