import { MapPin } from 'lucide-react'
import type { PointerEvent } from 'react'
import hero1280 from '../assets/hero-1280.webp'
import hero1920 from '../assets/hero-1920.webp'
import hero2880 from '../assets/hero-2880.webp'
import hero3840 from '../assets/hero-3840.webp'
import { SlideTextButton } from '../components/SlideTextButton'
import { SITE } from '../config/site'

const HERO_SRCSET = `${hero1280} 1280w, ${hero1920} 1920w, ${hero2880} 2880w, ${hero3840} 3840w`
const TAGS = ['Musculação', 'Funcional', 'HIIT', 'Acompanhamento']

export function Hero() {
  const location = [SITE.address.street, SITE.address.city].filter(Boolean).join(' · ')

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--px', String((e.clientX - rect.left) / rect.width - 0.5))
    e.currentTarget.style.setProperty('--py', String((e.clientY - rect.top) / rect.height - 0.5))
  }

  return (
    <section
      id="inicio"
      onPointerMove={handlePointerMove}
      className="relative flex min-h-screen items-stretch overflow-hidden bg-background"
    >
      <div aria-hidden="true" className="absolute inset-x-0 top-24 bottom-0 z-[1] overflow-hidden">
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
            className="absolute inset-0 h-full w-full object-cover object-[68%_20%]"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(rgb(8_8_8/0.55),rgb(8_8_8/0.15)_35%,rgb(8_8_8/0.9)),linear-gradient(90deg,rgb(8_8_8/0.85),rgb(8_8_8/0.35)_45%,rgb(71_0_0/0.2)_65%,transparent)]" />
        <div className="absolute inset-0 bg-background/50 md:hidden" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[38%] bg-[radial-gradient(circle,#fff_1.5px,transparent_2.2px)] bg-[length:32px_32px] opacity-10 [mask-image:linear-gradient(transparent,#000_30%,#000_70%,transparent)]" />
      </div>

      <div className="container-gym relative z-[2] self-center pt-32 pb-16 md:pt-28 md:pb-12">
        <div className="fade-up max-w-4xl">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-xs font-semibold tracking-[0.22em] uppercase sm:text-sm">
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

          <h1 className="mt-6 font-poster text-[clamp(46px,6.6vw,108px)] leading-[0.92] font-normal tracking-[-0.01em] uppercase">
            Supere seus limites.
            <br />
            <span className="text-primary">Construa sua melhor versão.</span>
          </h1>

          <div className="mt-10 flex flex-wrap gap-3">
            <SlideTextButton href="#planos" text="Quero começar agora →" hoverText="Ver planos →" />
            <SlideTextButton
              href="#modalidades"
              text="Conhecer modalidades"
              hoverText="Ver modalidades ↓"
              variant="ghost"
            />
          </div>

          {location && (
            <p className="mt-8 flex items-center gap-2 text-sm text-white/70">
              <MapPin aria-hidden="true" className="h-4 w-4 text-primary" />
              {SITE.address.mapsUrl ? (
                <a
                  href={SITE.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:text-primary hover:underline"
                >
                  {location}
                </a>
              ) : (
                location
              )}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
