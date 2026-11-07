import { Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { Logo } from '../components/Logo'
import { PrivacyPolicy } from '../components/PrivacyPolicy'
import { InstagramIcon, SocialLinks, WhatsappIcon } from '../components/SocialIcons'
import { OPENING_HOURS, SITE, WHATSAPP_MESSAGES } from '../config/site'
import { hasWhatsapp, whatsappUrl } from '../lib/whatsapp'

const LINKS = [
  { label: 'Início', href: '#inicio' },
  { label: 'Modalidades', href: '#modalidades' },
  { label: 'Planos', href: '#planos' },
  { label: 'Horários', href: '#horarios' },
  { label: 'Estrutura', href: '#estrutura' },
  { label: 'Avaliações', href: '#depoimentos' },
  { label: 'Dúvidas', href: '#faq' },
]

const linkClass = 'transition-colors hover:text-primary'
const YEAR = new Date().getFullYear()

export function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const address = [SITE.address.street, SITE.address.city].filter(Boolean).join(' – ')

  const contacts = [
    address && {
      icon: MapPin,
      label: address,
      href: SITE.address.mapsUrl || undefined,
    },
    SITE.phone && { icon: Phone, label: SITE.phone, href: `tel:${SITE.phone.replace(/\D/g, '')}` },
    hasWhatsapp && { icon: WhatsappIcon, label: 'WhatsApp', href: whatsappUrl(WHATSAPP_MESSAGES.general) },
    SITE.email && { icon: Mail, label: SITE.email, href: `mailto:${SITE.email}` },
    SITE.instagram.url && { icon: InstagramIcon, label: SITE.instagram.handle, href: SITE.instagram.url },
  ].filter(Boolean) as { icon: typeof Mail; label: string; href?: string }[]

  return (
    <footer id="contato" className="border-t border-primary/40 bg-background pt-16">
      <div className="container-gym grid gap-12 pb-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.2fr_1fr]">
        <div>
          <Logo variant="full" />
          <p className="mt-6 max-w-xs text-sm text-muted-foreground">{SITE.description}</p>
          <div className="mt-6">
            <SocialLinks />
          </div>
        </div>

        <nav aria-label="Rodapé">
          <h2 className="text-base font-bold">Navegação</h2>
          <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={linkClass}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-base font-bold">Contato</h2>
          <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
            {contacts.map(({ icon: Icon, label, href }) => (
              <li key={label} className="flex items-start gap-3">
                <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {href ? (
                  <a
                    href={href}
                    className={linkClass}
                    {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                  >
                    {label}
                  </a>
                ) : (
                  label
                )}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-base font-bold">Funcionamento</h2>
          <dl className="mt-5 space-y-2.5 text-sm">
            {OPENING_HOURS.items.map((item) => (
              <div key={item.days}>
                <dt className="text-muted-foreground">{item.days}</dt>
                <dd className="font-semibold">{item.hours}</dd>
              </div>
            ))}
          </dl>
          {!OPENING_HOURS.confirmed && (
            <p className="mt-3 text-xs text-muted-foreground">Horários provisórios, sujeitos a confirmação.</p>
          )}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-gym flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {YEAR} {SITE.legalName || SITE.name}
            {SITE.cnpj && ` · CNPJ ${SITE.cnpj}`}. Todos os direitos reservados.
          </p>
          <button type="button" onClick={() => setPrivacyOpen(true)} className={`${linkClass} underline-offset-4 hover:underline`}>
            Política de privacidade
          </button>
        </div>
      </div>

      <PrivacyPolicy open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </footer>
  )
}
