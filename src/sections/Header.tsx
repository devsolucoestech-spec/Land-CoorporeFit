import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Logo } from '../components/Logo'
import { MorphicNavbar } from '../components/MorphicNavbar'
import { useActiveSection } from '../hooks/useActiveSection'
import { SlideTextButton } from '../components/SlideTextButton'

const NAV = [
  { label: 'Início', href: '#inicio' },
  { label: 'Modalidades', href: '#modalidades' },
  { label: 'Planos', href: '#planos' },
  { label: 'Horários', href: '#horarios' },
  { label: 'Estrutura', href: '#estrutura' },
  { label: 'Contato', href: '#contato' },
]

const NAV_ITEMS = Object.fromEntries(NAV.map((item) => [item.href, { name: item.label }]))
const NAV_HREFS = NAV.map((item) => item.href)

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useActiveSection(NAV_HREFS)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-2xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || open
          ? 'border-white/10 bg-background/45 shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_12px_40px_-12px_rgb(8_8_8/0.8)]'
          : 'border-white/5 bg-background/20 shadow-[inset_0_1px_0_rgb(255_255_255/0.05)]'
      }`}
    >
      <div className="container-gym flex h-24 items-center justify-between gap-6">
        <Logo />

        <MorphicNavbar items={NAV_ITEMS} currentPath={activeSection} className="hidden px-0 py-0 lg:flex" />

        <SlideTextButton
          href="#planos"
          text="Quero me matricular"
          hoverText="Ver planos →"
          size="md"
          className="hidden lg:inline-flex"
        />

        <button
          type="button"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen(!open)}
          className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-primary lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="menu-mobile"
        hidden={!open}
        className="h-[calc(100dvh-6rem)] overflow-y-auto border-t border-border bg-background lg:hidden"
      >
        <nav aria-label="Menu mobile" className="container-gym flex flex-col py-6">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-border py-4 font-display text-2xl font-bold uppercase transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <SlideTextButton
            href="#planos"
            onClick={() => setOpen(false)}
            text="Quero me matricular"
            hoverText="Ver planos →"
            className="mt-8"
          />
        </nav>
      </div>
    </header>
  )
}
