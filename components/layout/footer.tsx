import Link from 'next/link'
import { usePublicContent } from '@/components/content/public-content'
import { RevealText } from '@/components/motion/reveal-text'

export function Footer() {
  const { footer, navigation } = usePublicContent()
  const explore = navigation.filter((item) => item.href !== '/contact' && item.visible !== false)
  return (
    <footer className="relative overflow-hidden bg-warm-black text-off-white">
      <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-20 md:px-8 md:pt-28">
        <RevealText as="h2" lines={[footer.title]} className="font-serif text-[22vw] leading-[0.85] tracking-tight md:text-[15vw]" />
        <div className="mt-16 grid grid-cols-2 gap-y-10 border-t border-off-white/15 pt-10 md:grid-cols-4">
          <FooterCol title="Explore">{explore.map((n) => <FooterLink key={n.href} href={n.href}>{n.label}</FooterLink>)}</FooterCol>
          <FooterCol title="Connect">{footer.socials.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noreferrer" className="inline-block py-1 text-off-white/70 transition-colors hover:text-off-white">{s.label}</a></li>)}</FooterCol>
          <FooterCol title="Contact">
            <li><a href={`mailto:${footer.email}`} className="inline-block py-1 text-off-white/70 transition-colors hover:text-off-white">{footer.email}</a></li>
            <FooterLink href="/contact" className="pt-1">{footer.contactLabel}</FooterLink>
          </FooterCol>
          <FooterCol title="SISU"><li className="max-w-[24ch] font-serif text-xl italic leading-snug text-off-white/80">{footer.motto}</li></FooterCol>
        </div>
        <div className="mt-16 flex flex-col-reverse gap-4 border-t border-off-white/15 pt-6 font-sans text-xs uppercase tracking-label text-off-white/50 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>{footer.copyright}</span>
            <a href="https://senanqulamov.com" target="_blank" rel="noreferrer" aria-label="Made by Senan Qulamov — visit senanqulamov.com" className="group inline-flex items-center gap-2 rounded-full border border-off-white/20 bg-off-white/5 py-1 pl-1 pr-3 text-sm normal-case tracking-normal text-off-white/75 transition-all hover:border-off-white/50 hover:bg-off-white/10 hover:text-off-white">
              <svg viewBox="0 0 40 40" aria-hidden="true" className="size-5 shrink-0"><defs><linearGradient id="senan-mark-gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#A8E0FF" /><stop offset=".5" stopColor="#B9A7FF" /><stop offset="1" stopColor="#FFB79A" /></linearGradient></defs><rect width="40" height="40" rx="10" fill="#07080D" /><circle cx="15" cy="20" r="9" fill="none" stroke="url(#senan-mark-gradient)" strokeWidth="2.2" /><circle cx="25" cy="20" r="9" fill="none" stroke="#ECEBF2" strokeWidth="2.2" /></svg>
              <span><span className="text-off-white/50">Made by </span>senanqulamov.com</span>
            </a>
          </div>
          <span className="text-off-white/70">{footer.credit}</span>
          <span>{footer.owner}</span>
        </div>
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
