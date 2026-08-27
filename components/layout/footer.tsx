import Link from 'next/link'
import { NAV_ITEMS, SOCIAL_LINKS } from '@/lib/nav'
import { RevealText } from '@/components/motion/reveal-text'

const EXPLORE = NAV_ITEMS.filter((n) => n.href !== '/contact')

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-warm-black text-off-white">
      <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-20 md:px-8 md:pt-28">
        <RevealText as="h2" lines={['FREE SOUL.']} className="font-serif text-[22vw] leading-[0.85] tracking-tight md:text-[15vw]" />
        <div className="mt-16 grid grid-cols-2 gap-y-10 border-t border-off-white/15 pt-10 md:grid-cols-4">
          <FooterCol title="Explore">{EXPLORE.map((n) => <FooterLink key={n.href} href={n.href}>{n.label}</FooterLink>)}</FooterCol>
          <FooterCol title="Connect">{SOCIAL_LINKS.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" className="inline-block py-1 text-off-white/70 transition-colors hover:text-off-white">{s.label}</a></li>)}</FooterCol>
          <FooterCol title="Contact">
            <li><a href="mailto:hello@sisufreesoul.com" className="inline-block py-1 text-off-white/70 transition-colors hover:text-off-white">hello@sisufreesoul.com</a></li>
            <FooterLink href="/contact" className="pt-1">Söhbətə başlayaq →</FooterLink>
          </FooterCol>
          <FooterCol title="SISU"><li className="max-w-[24ch] font-serif text-xl italic leading-snug text-off-white/80">Öz həyatının müəllifi ol.</li></FooterCol>
        </div>
        <div className="mt-16 flex flex-col-reverse gap-4 border-t border-off-white/15 pt-6 font-sans text-xs uppercase tracking-label text-off-white/50 md:flex-row md:items-center md:justify-between"><span>© SISU Free Soul 2026</span><span className="text-off-white/70">Made with courage.</span><span>Təhminə Doruk</span></div>
      </div>
    </footer>
  )
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return <div><h3 className="mb-4 font-sans text-xs uppercase tracking-label text-off-white/50">{title}</h3><ul className="font-sans text-sm">{children}</ul></div>
}

function FooterLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return <li className={className}><Link href={href} className="inline-block py-1 text-off-white/70 transition-colors hover:text-off-white">{children}</Link></li>
}
