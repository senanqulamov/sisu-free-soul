'use client'

import { ParallaxMedia } from '@/components/media/parallax-media'
import { ScrollMorphMedia } from '@/components/motion/scroll-morph-media'

export function SignatureMedia() {
  return <section className="bg-background py-8 md:py-14"><div className="mx-auto max-w-[1600px] px-5 md:px-8"><div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6"><ParallaxMedia src="/images/tahmina/5219684625851032051.jpg" alt="Təhminə açıq havada." className="aspect-[3/4] md:col-span-5 md:mt-24" amount={.06} sizes="(max-width: 768px) 100vw, 42vw" /><ParallaxMedia src="/images/tahmina/5219684625851032054.jpg" alt="Təhminənin kinematik portreti." className="aspect-[4/5] md:col-span-6 md:col-start-7" amount={.1} sizes="(max-width: 768px) 100vw, 50vw" /></div></div><div className="py-14 md:py-24"><ScrollMorphMedia src="/images/tahmina/5219684625851032047.jpg" alt="Təhminənin geniş film kadrı." /><p className="mx-auto mt-7 w-[calc(100%-2.5rem)] max-w-5xl font-serif text-2xl italic leading-snug md:text-4xl">Bəzən yol görünmür — çünki onu hələ sən çəkməmisən.</p></div></section>
}
