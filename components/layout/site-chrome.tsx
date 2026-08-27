import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/layout/footer'
import { ScrollProgress } from '@/components/motion/scroll-progress'
import { CustomCursor } from '@/components/motion/custom-cursor'
import { SmoothScrollProvider } from '@/components/motion/smooth-scroll-provider'
import { ToTop } from '@/components/motion/to-top'

/** Persistent chrome shared across all routes. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <ScrollProgress />
      <CustomCursor />
      <ToTop />
      <Header />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-sm focus:bg-foreground focus:px-4 focus:py-2 focus:text-off-white"
      >
        Əsas məzmuna keç
      </a>
      <main id="main">{children}</main>
      <Footer />
    </SmoothScrollProvider>
  )
}
