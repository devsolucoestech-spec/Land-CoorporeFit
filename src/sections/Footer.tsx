import { Mail, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { Logo } from '../components/Logo'
import { PrivacyPolicy } from '../components/PrivacyPolicy'
import { InstagramIcon, SocialLinks, WhatsappIcon } from '../components/SocialIcons'
import { SITE, WHATSAPP_MESSAGES } from '../config/site'
import { hasWhatsapp, whatsappUrl } from '../lib/whatsapp'

const linkClass = 'transition-colors hover:text-primary'
const YEAR = new Date().getFullYear()

export function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false)
  const cityLine = [SITE.address.city, SITE.address.zip].filter(Boolean).join(', ')

  const contacts = [
    SITE.phone && { icon: Phone, label: SITE.phone, href: `tel:${SITE.phone.replace(/\D/g, '')}` },
    hasWhatsapp && { icon: WhatsappIcon, label: 'WhatsApp', href: whatsappUrl(WHATSAPP_MESSAGES.general) },
    SITE.email && { icon: Mail, label: SITE.email, href: `mailto:${SITE.email}` },
    SITE.instagram.url && { icon: InstagramIcon, label: SITE.instagram.handle, href: SITE.instagram.url },
  ].filter(Boolean) as { icon: typeof Mail; label: string; href?: string }[]

  return (
    <footer id="contato" className="border-t border-primary/40 bg-background pt-16">
      <div className="container-gym flex flex-col items-center gap-10 pb-12 text-center lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:text-left">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8 lg:flex-col lg:items-start lg:gap-5 xl:flex-row xl:items-center xl:gap-8">
          <Logo variant="full" />
          <p className="max-w-xs text-sm text-muted-foreground sm:border-l sm:border-border sm:pl-8 sm:text-left lg:border-l-0 lg:pl-0 xl:border-l xl:pl-8">
            {SITE.description}
          </p>
        </div>

        {SITE.address.street && (
          <div className="flex flex-col items-center gap-4 lg:items-start">
            <h2 className="text-base font-bold">Localização</h2>
            <a
              href={SITE.address.mapsUrl || undefined}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex min-h-11 items-start gap-2.5 text-sm text-muted-foreground ${linkClass}`}
            >
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <address className="not-italic lg:whitespace-nowrap">
                {SITE.address.street}
                {cityLine && (
                  <>
                    <br />
                    {cityLine}
                  </>
                )}
              </address>
            </a>
          </div>
        )}

        <div className="flex flex-col items-center gap-4 lg:items-start">
          <h2 className="text-base font-bold">Contato</h2>
          <ul className="flex flex-col items-center justify-center gap-x-8 gap-y-1 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-y-3 lg:flex-col lg:items-start">
            {contacts.map(({ icon: Icon, label, href }) => (
              <li key={label} className="flex min-h-11 items-center gap-2.5 sm:min-h-0">
                <Icon aria-hidden="true" className="h-4 w-4 shrink-0 text-primary" />
                {href ? (
                  <a
                    href={href}
                    className={`inline-flex min-h-11 items-center sm:min-h-0 ${linkClass}`}
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

        <div className="flex flex-col items-center gap-4 lg:items-end">
          <h2 className="text-base font-bold whitespace-nowrap">Redes sociais</h2>
          <SocialLinks />
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-gym flex flex-col items-center justify-between gap-1 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] text-center text-xs text-muted-foreground sm:flex-row sm:gap-3 sm:text-left sm:max-[1360px]:pr-20">
          <p>
            © {YEAR} {SITE.legalName || SITE.name}
            {SITE.cnpj && ` · CNPJ ${SITE.cnpj}`}. Todos os direitos reservados.
          </p>
          <button
            type="button"
            onClick={() => setPrivacyOpen(true)}
            className={`min-h-11 underline-offset-4 hover:underline sm:min-h-0 ${linkClass}`}
          >
            Política de privacidade
          </button>
        </div>
      </div>

      <PrivacyPolicy open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </footer>
  )
}
