import { useEffect } from 'react'
import { BackToTop } from './components/BackToTop'
import { Section, SectionFlow } from './components/sectionflow/core/section-flow'
import type { TransitionComponent, TransitionProps } from './components/sectionflow/core/types'
import { PinReveal } from './components/sectionflow/transitions/pin-reveal'
import { useScrollAnimations } from './hooks/useScrollAnimations'
import { Faq } from './sections/Faq'
import { FinalCta } from './sections/FinalCta'
import { Footer } from './sections/Footer'
import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { Instagram } from './sections/Instagram'
import { Marquee } from './sections/Marquee'
import { Modalities } from './sections/Modalities'
import { Pricing } from './sections/Pricing'
import { Schedule } from './sections/Schedule'
import { Structure } from './sections/Structure'
import { Testimonials } from './sections/Testimonials'

/** Saída do hero: a próxima seção sobe por cima. Pausas curtas (em vh) para o topo não parecer travado. */
const HeroTransition = Object.assign((props: TransitionProps) => <PinReveal {...props} />, {
  timing: { rest: 20, duration: 100 },
}) satisfies TransitionComponent

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Âncoras dentro do SectionFlow ficam presas na tela, então o navegador não sabe rolar até elas.
 * Leva ao início do trecho (hero) ou ao ponto em que a transição termina (seção seguinte).
 */
function scrollToPinnedAnchor(target: HTMLElement) {
  const layer = target.closest<HTMLElement>('[data-sf-layer]')
  const spine = layer?.parentElement?.parentElement
  if (!layer || !spine) return false

  const vh = window.innerHeight
  const spineTop = spine.getBoundingClientRect().top + window.scrollY
  const totalVh = (spine.offsetHeight / vh) * 100
  const revealVh = layer.dataset.sfLayer === '0' ? 0 : HeroTransition.timing.rest + HeroTransition.timing.duration
  window.scrollTo({ top: spineTop + (revealVh / totalVh) * (spine.offsetHeight - vh), behavior: 'smooth' })
  return true
}

export default function App() {
  const ref = useScrollAnimations<HTMLElement>()

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      const id = link?.getAttribute('href')?.slice(1)
      const target = id ? document.getElementById(id) : null
      if (target && scrollToPinnedAnchor(target)) event.preventDefault()
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-[60] rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" ref={ref} className="overflow-x-clip text-foreground">
        <div className="scroll-bg" aria-hidden="true" />
        {reduceMotion ? (
          <>
            <Hero />
            <Marquee />
            <Modalities />
          </>
        ) : (
          <SectionFlow>
            <Section transition={HeroTransition} className="bg-background">
              <Hero />
            </Section>
            <Section className="bg-background">
              <Marquee />
              <Modalities />
            </Section>
          </SectionFlow>
        )}
        <Pricing />
        <Schedule />
        <Structure />
        <Instagram />
        <Testimonials />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
