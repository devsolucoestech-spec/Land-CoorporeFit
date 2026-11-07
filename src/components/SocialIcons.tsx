import type { SVGProps } from 'react'
import { SITE, WHATSAPP_MESSAGES } from '../config/site'
import { hasWhatsapp, whatsappUrl } from '../lib/whatsapp'

type IconProps = SVGProps<SVGSVGElement>

const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
} as const

export function InstagramIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

export function WhatsappIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}

/** Redes configuradas em config/site.ts. Redes sem link não aparecem. */
export function SocialLinks() {
  const links = [
    SITE.instagram.url && { label: 'Instagram', href: SITE.instagram.url, Icon: InstagramIcon },
    SITE.facebook && { label: 'Facebook', href: SITE.facebook, Icon: FacebookIcon },
    hasWhatsapp && { label: 'WhatsApp', href: whatsappUrl(WHATSAPP_MESSAGES.general), Icon: WhatsappIcon },
  ].filter(Boolean) as { label: string; href: string; Icon: typeof InstagramIcon }[]

  return (
    <div className="flex gap-3">
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="grid h-11 w-11 place-items-center rounded-full lg:h-10 lg:w-10 border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  )
}
