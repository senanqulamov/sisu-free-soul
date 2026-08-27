import Link from 'next/link'
import { cn } from '@/lib/utils'

type EditorialLinkProps = {
  href: string
  children: React.ReactNode
  arrow?: 'right' | 'up-right' | 'none'
  className?: string
  tone?: 'default' | 'light' | 'clay'
}

/**
 * Editorial CTA link — no filled pill. A word with an animated arrow and an
 * underline that draws in on hover. Uses group-hover, works without JS.
 */
export function EditorialLink({
  href,
  children,
  arrow = 'right',
  className,
  tone = 'default',
}: EditorialLinkProps) {
  const color =
    tone === 'light'
      ? 'text-off-white'
      : tone === 'clay'
        ? 'text-terracotta'
        : 'text-foreground'
  const underline =
    tone === 'light' ? 'bg-off-white' : tone === 'clay' ? 'bg-terracotta' : 'bg-foreground'

  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2 font-sans text-sm tracking-wide-2',
        color,
        className,
      )}
    >
      <span className="relative">
        {children}
        <span
          className={cn(
            'absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 transition-transform duration-500 ease-out group-hover:origin-left group-hover:scale-x-100',
            underline,
          )}
        />
      </span>
      {arrow !== 'none' && (
        <span
          aria-hidden
          className={cn(
            'inline-block transition-transform duration-500 ease-out',
            arrow === 'right'
              ? 'group-hover:translate-x-1'
              : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5',
          )}
        >
          {arrow === 'up-right' ? '↗' : '→'}
        </span>
      )}
    </Link>
  )
}
