import { useEffect } from 'react'
import { Section, SectionFlow } from './components/sectionflow/core/section-flow'
import type { TransitionComponent, TransitionProps } from './components/sectionflow/core/types'
import { PinReveal } from './components/sectionflow/transitions/pin-reveal'
import { useScrollAnimations } from './hooks/useScrollAnimations'
import { About } from './sections/About'
import { CallToAction } from './sections/CallToAction'
import { Footer } from './sections/Footer'
import { Header } from './sections/Header'
import { Hero } from './sections/Hero'
import { InstagramGallery } from './sections/InstagramGallery'
import { Marquee } from './sections/Marquee'
import { Performance } from './sections/Performance'
import { Pricing } from './sections/Pricing'
import { Programs } from './sections/Programs'
import { Schedule } from './sections/Schedule'
import { Testimonials } from './sections/Testimonials'
import { Trainers } from './sections/Trainers'

/** Saída do hero: a próxima seção sobe por cima. Pausas curtas (em vh) para o topo não parecer travado. */
const HeroTransition = Object.assign((props: TransitionProps) => <PinReveal {...props} />, {
  timing: { rest: 20, duration: 100 },
}) satisfies TransitionComponent

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
      <Header />
      <main ref={ref} className="overflow-x-clip text-foreground">
        <div className="scroll-bg" aria-hidden="true" />
        <SectionFlow>
          <Section transition={HeroTransition} className="bg-background">
            <Hero />
          </Section>
          <Section className="bg-background">
            <Marquee />
            <Programs />
          </Section>
        </SectionFlow>
        <About />
        <Schedule />
        <Performance />
        <Pricing />
        <Trainers />
        <InstagramGallery />
        <Testimonials />
        <CallToAction />
        <Footer />
      </main>
    </>
  )
}
