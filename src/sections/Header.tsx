import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Logo } from '../components/Logo'

const NAV = [
  { label: 'Início', href: '#inicio' },
  { label: 'Programas', href: '#programas' },
  { label: 'Horários', href: '#horarios' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur transition-colors duration-300 ${
        scrolled ? 'border-primary/25 bg-background/85' : 'border-transparent bg-background/30'
      }`}
    >
      <div className="container-gym flex h-20 items-center justify-between">
        <Logo />
        <nav className="hidden gap-8 text-sm md:flex">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="text-foreground/90 transition-colors hover:text-primary">
              {item.label}
            </a>
          ))}
        </nav>
        <a href="#planos" className="btn-primary hidden md:inline-flex">
          Matricule-se
        </a>
        <button aria-label="Menu" className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-gym flex flex-col gap-4 py-6">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-display text-lg uppercase"
              >
                {item.label}
              </a>
            ))}
            <a href="#planos" onClick={() => setOpen(false)} className="btn-primary w-fit">
              Matricule-se
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
