import { Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from '../components/Logo'
import { SocialLinks } from '../components/SocialIcons'

const LINKS = [
  { label: 'Programas', href: '#programas' },
  { label: 'Horários', href: '#horarios' },
  { label: 'Planos', href: '#planos' },
  { label: 'Sobre', href: '#sobre' },
]

export function Footer() {
  return (
    <footer id="contato" className="border-t border-primary/40 bg-background pt-16">
      <div className="container-gym grid gap-10 pb-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Logo variant="full" />
          <div className="mt-6">
            <SocialLinks />
          </div>
        </div>

        <nav>
          <h4 className="text-sm font-semibold">Navegação</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h4 className="text-sm font-semibold">Contato</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              contato@corporefit.com.br
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              (11) 99999-9999
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Centro, Sua Cidade
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © 2026 Corpore Fit Academia. Todos os direitos reservados.
      </div>
    </footer>
  )
}
