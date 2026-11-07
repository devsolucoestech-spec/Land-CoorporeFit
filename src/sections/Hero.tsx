import type { PointerEvent } from 'react'
import hero1280 from '../assets/hero-1280.webp'
import hero1920 from '../assets/hero-1920.webp'
import hero2880 from '../assets/hero-2880.webp'
import hero3840 from '../assets/hero-3840.webp'
import { SlideTextButton } from '../components/SlideTextButton'

const HERO_SRCSET = `${hero1280} 1280w, ${hero1920} 1920w, ${hero2880} 2880w, ${hero3840} 3840w`
const TAGS = ['Musculação', 'Funcional', 'Acompanhamento']

export function Hero() {
  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--px', String((e.clientX - rect.left) / rect.width - 0.5))
    e.currentTarget.style.setProperty('--py', String((e.clientY - rect.top) / rect.height - 0.5))
  }

  return (
    <section
      id="inicio"
      onPointerMove={handlePointerMove}
      className="relative flex min-h-screen items-stretch overflow-hidden bg-background [--hero-media-h:min(118vw,64svh)] max-lg:min-h-[100svh]"
    >
      {/* Celular e tablet: foto no topo com os dois instrutores enquadrados; o texto entra abaixo dos rostos. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(var(--header-h)+env(safe-area-inset-top))] bottom-0 z-[1] overflow-hidden max-lg:bottom-auto max-lg:h-[var(--hero-media-h)]"
      >
        <div
          className="absolute inset-0 transition-transform duration-[1400ms] ease-out motion-reduce:transform-none!"
          style={{
            transform: 'translate3d(calc(var(--px, 0) * -24px), calc(var(--py, 0) * -16px), 0) scale(1.05)',
          }}
        >
          <img
            src={hero1920}
            srcSet={HERO_SRCSET}
            sizes="100vw"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[90%_0%] lg:object-[68%_20%]"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgb(8_8_8/0.55),rgb(8_8_8/0.15)_35%,rgb(8_8_8/0.9)),linear-gradient(90deg,rgb(8_8_8/0.85),rgb(8_8_8/0.35)_45%,rgb(71_0_0/0.2)_65%,transparent)] max-lg:hidden" />
        <div className="absolute inset-0 bg-[linear-gradient(rgb(8_8_8/0.45),transparent_22%,transparent_48%,rgb(8_8_8/0.75)_72%,var(--cf-black)),linear-gradient(90deg,rgb(8_8_8/0.35),transparent_40%)] lg:hidden" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[38%] bg-[radial-gradient(circle,#fff_1.5px,transparent_2.2px)] bg-[length:32px_32px] opacity-10 [mask-image:linear-gradient(transparent,#000_30%,#000_70%,transparent)]" />
      </div>

      <div className="container-gym relative z-[2] self-center pt-32 pb-16 max-lg:self-end max-lg:pt-[calc(var(--header-h)+env(safe-area-inset-top)+var(--hero-media-h)*0.6)] max-lg:pb-10 lg:pt-28 lg:pb-12">
        <div className="fade-up max-w-4xl">
          <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-display text-[11px] font-semibold tracking-[0.18em] uppercase sm:gap-x-3 sm:text-sm sm:tracking-[0.22em]">
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
            {TAGS.map((tag, i) => (
              <span key={tag} className="flex items-center gap-3">
                {i > 0 && (
                  <span aria-hidden="true" className="text-primary">
                    •
                  </span>
                )}
                {tag}
              </span>
            ))}
          </p>

          <h1 className="mt-4 font-poster text-[clamp(40px,12.5vw,64px)] leading-[0.92] font-normal tracking-[-0.01em] uppercase md:mt-6 md:text-[clamp(46px,6.6vw,108px)]">
            Supere seus <br className="md:hidden" />
            limites.
            <br />
            <span className="text-primary">
              Construa sua <br className="md:hidden" />
              melhor versão.
            </span>
          </h1>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-10">
            <SlideTextButton
              href="#planos"
              text="Quero começar agora →"
              hoverText="Ver planos →"
              className="w-full sm:w-auto"
            />
            <SlideTextButton
              href="#modalidades"
              text="Conhecer modalidades"
              hoverText="Ver modalidades ↓"
              variant="ghost"
              className="w-full sm:w-auto"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
