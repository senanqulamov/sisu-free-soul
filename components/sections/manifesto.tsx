import { SectionLabel } from '@/components/motion/section-label'
import { ScrollHighlight } from '@/components/motion/scroll-highlight'
import { RevealText } from '@/components/motion/reveal-text'

/** 02 — Manifesto. Quiet, huge editorial typography over warm off-white. */
export function Manifesto() {
  return (
    <section className="bg-off-white text-foreground">
      <div className="mx-auto max-w-[1600px] px-5 py-28 md:px-8 md:py-40">
        <SectionLabel index="01" className="mb-16 md:mb-24">
          SISU
        </SectionLabel>

        <div className="max-w-5xl">
          <ScrollHighlight
            text="Azadlıq istədiyin hər şeyi etmək deyil."
            className="font-serif text-[9vw] leading-[1.02] tracking-tight md:text-6xl lg:text-7xl"
          />
          <ScrollHighlight
            text="Azadlıq — öz həyatını seçmək və onun müəllifi olmaqdır."
            className="mt-6 font-serif text-[9vw] leading-[1.02] tracking-tight text-terracotta md:text-6xl lg:text-7xl"
          />
        </div>

        <div className="mt-24 grid gap-10 md:mt-36 md:grid-cols-12">
          <div className="md:col-span-4 md:col-start-1">
            <p className="font-sans text-sm leading-relaxed text-muted">
                SISU — insanın içindəki daxili gücüdür, ən çətin anlarda belə davam etmək iradəsi və ruhunun dayanıqlılığıdır.
            </p>
          </div>
          <RevealText
            as="div"
            lines={[
              'Hiss edirəm.',
              'Müşahidə edirəm.',
              'Sorğulayıram.',
              'Araşdırıram.',
              'Və sonda öz həqiqətimi',
              'özüm yaradıram.',
            ]}
            stagger={0.12}
            className="font-serif text-4xl leading-[1.15] tracking-tight md:col-span-7 md:col-start-6 md:text-6xl"
          />
        </div>
      </div>
    </section>
  )
}
