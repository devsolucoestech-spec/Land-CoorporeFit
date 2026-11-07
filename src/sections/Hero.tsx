import { useEffect, useState } from 'react'
import heroInstrutores from '../assets/hero-instrutores.jpg'

/** Fotos do hero. Com mais de uma, elas alternam em crossfade e aparecem os indicadores. */
const SLIDES = [{ src: heroInstrutores, label: 'Instrutores da Corpore Fit', position: '68% 20%' }]
const SLIDE_INTERVAL = 4500

export function Hero() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (SLIDES.length < 2) return
    const id = window.setInterval(() => setActive((i) => (i + 1) % SLIDES.length), SLIDE_INTERVAL)
    return () => window.clearInterval(id)
  }, [])

  return (
    <section id="inicio" className="relative flex min-h-screen items-stretch overflow-hidden bg-background">
      <div aria-hidden="true" className="absolute inset-x-0 top-20 bottom-0 z-[1]">
        {SLIDES.map((slide, i) => (
          <img
            key={slide.src}
            src={slide.src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover saturate-[1.05] contrast-[1.05] transition-opacity duration-[1200ms]"
            style={{ objectPosition: slide.position, opacity: i === active ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-[linear-gradient(rgb(8_8_8/0.55),rgb(8_8_8/0.15)_35%,rgb(8_8_8/0.9)),linear-gradient(90deg,rgb(8_8_8/0.8),rgb(71_0_0/0.25)_60%,transparent)]" />
        <div className="absolute inset-0 bg-background/45 md:hidden" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[38%] bg-[radial-gradient(circle,#fff_1.5px,transparent_2.2px)] bg-[length:32px_32px] opacity-10 [mask-image:linear-gradient(transparent,#000_30%,#000_70%,transparent)]" />
        {SLIDES.length > 1 && (
          <div className="absolute right-6 bottom-6 z-[3] flex gap-2">
            {SLIDES.map((slide, i) => (
              <button
                key={slide.src}
                aria-label={slide.label}
                onClick={() => setActive(i)}
                className={`h-1 cursor-pointer rounded-sm transition-all duration-300 ${
                  i === active ? 'w-8 bg-primary' : 'w-3 bg-white/40'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="container-gym relative z-[2] self-end py-[clamp(48px,6vw,96px)]">
        <div className="fade-up">
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <span className="inline-flex overflow-hidden rounded font-display text-[10px] font-bold tracking-[0.14em] whitespace-nowrap uppercase shadow-[0_2px_8px_rgb(8_8_8/0.3)] sm:text-xs">
              <span className="inline-flex items-center bg-card px-3 py-2 text-white">★ ★ ★</span>
              <span className="inline-flex items-center bg-white px-3.5 py-2 text-background">Musculação</span>
              <span className="inline-flex items-center bg-primary px-3.5 py-2 text-primary-foreground">
                Funcional & HIIT
              </span>
            </span>
          </div>

          <h1 className="font-poster text-[clamp(56px,8.5vw,132px)] leading-[0.92] font-normal tracking-[-0.025em] normal-case">
            Liberte o seu
            <br />
            <span className="text-primary">potencial.</span>
          </h1>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#planos" className="btn-primary btn-lg">
              Comece agora →
            </a>
            <a href="#programas" className="btn-ghost btn-lg">
              Conheça os programas
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
