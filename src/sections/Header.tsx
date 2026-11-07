import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Logo } from '../components/Logo'
import { MorphicNavbar } from '../components/MorphicNavbar'
import { useActiveSection } from '../hooks/useActiveSection'
import { SlideTextButton } from '../components/SlideTextButton'
import { NAV } from '../config/navigation'

const NAV_ITEMS = Object.fromEntries(NAV.map((item) => [item.href, { name: item.label }]))
const NAV_HREFS = NAV.map((item) => item.href)

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const activeSection = useActiveSection(NAV_HREFS)
  // O hero e a chamada final já têm o CTA de matrícula na tela.
  const ctaOnScreen = activeSection === '#inicio' || activeSection === '#matricula'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth >= 1280 && setOpen(false)
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
      className={`fixed inset-x-0 top-0 z-50 border-b pt-[env(safe-area-inset-top)] backdrop-blur-2xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow] duration-300 ${
        open
          ? 'border-white/10 bg-background'
          : scrolled
            ? 'border-white/10 bg-background/45 shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_12px_40px_-12px_rgb(8_8_8/0.8)]'
            : 'border-white/5 bg-background/20 shadow-[inset_0_1px_0_rgb(255_255_255/0.05)]'
      }`}
    >
      <div className="container-gym flex h-[var(--header-h)] items-center justify-between gap-3 lg:gap-6">
        <Logo />

        <MorphicNavbar items={NAV_ITEMS} currentPath={activeSection} className="hidden px-0 py-0 xl:flex" />

        {/* O espaço fica reservado para o menu não se mover quando o botão aparece. */}
        <div
          inert={ctaOnScreen}
          className={`shrink-0 transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] max-xl:hidden motion-reduce:transition-none ${
            ctaOnScreen ? 'pointer-events-none -translate-y-2 opacity-0' : ''
          }`}
        >
          <SlideTextButton
            href="#planos"
            text="Quero me matricular"
            hoverText="Ver planos →"
            size="md"
            className="whitespace-nowrap"
          />
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <a
            href="#planos"
            inert={ctaOnScreen || open}
            className={`inline-flex h-11 items-center rounded-lg bg-primary px-4 text-[11px] font-semibold tracking-wide whitespace-nowrap text-primary-foreground uppercase transition-[opacity,translate,background-color] duration-300 hover:bg-primary-hover max-[359px]:hidden motion-reduce:transition-none ${
              ctaOnScreen || open ? 'pointer-events-none -translate-y-2 opacity-0' : ''
            }`}
          >
            Matricule-se
          </a>
          <button
            type="button"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen(!open)}
            className="grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-primary"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        inert={!open}
        className={`absolute inset-x-0 top-full h-[calc(100dvh-var(--header-h)-env(safe-area-inset-top))] overflow-y-auto overscroll-contain border-t border-border bg-background transition-[opacity,translate,visibility] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] xl:hidden motion-reduce:transition-none ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0'
        }`}
      >
        <nav
          aria-label="Menu mobile"
          className="container-gym flex flex-col pt-4 pb-[calc(2rem+env(safe-area-inset-bottom))]"
        >
          {NAV.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={activeSection === item.href ? 'true' : undefined}
              style={{ transitionDelay: open ? `${60 + i * 35}ms` : '0ms' }}
              className={`flex min-h-14 items-center justify-between border-b border-border font-display text-xl font-bold uppercase transition-[opacity,translate,color] duration-300 hover:text-primary sm:text-2xl motion-reduce:transition-none ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
              } ${activeSection === item.href ? 'text-primary' : ''}`}
            >
              {item.label}
              <span aria-hidden="true" className="text-base text-muted-foreground">
                →
              </span>
            </a>
          ))}
          <SlideTextButton
            href="#planos"
            onClick={() => setOpen(false)}
            text="Quero me matricular"
            hoverText="Ver planos →"
            className="mt-8 w-full"
          />
        </nav>
      </div>
    </header>
  )
}
