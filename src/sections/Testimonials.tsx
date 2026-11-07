import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { useRef } from 'react'
import { SectionTitle } from '../components/SectionTitle'
import { SlideTextButton } from '../components/SlideTextButton'
import { TESTIMONIALS } from '../data/testimonials'

function EmptyState() {
  return (
    <div
      data-reveal
      className="relative mt-12 overflow-hidden rounded-md border border-primary/50 bg-card/60 p-10 text-center md:p-16"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_120%,rgb(71_0_0/0.8),transparent)]"
      />
      <Quote aria-hidden="true" className="relative mx-auto h-10 w-10 text-primary" />
      <p className="relative mt-6 font-display text-3xl font-bold uppercase md:text-4xl">
        Sua história pode ser a próxima.
      </p>
      <p className="relative mx-auto mt-4 max-w-md text-muted-foreground">
        Em breve, relatos reais de alunos da Corpore Fit estarão aqui.
      </p>
      <SlideTextButton href="#planos" text="Quero começar →" hoverText="Ver planos →" className="mt-8" />
    </div>
  )
}

function Carousel() {
  const track = useRef<HTMLDivElement>(null)
  const scroll = (direction: 1 | -1) => {
    const el = track.current
    if (el) el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: 'smooth' })
  }
  const navButton =
    'grid h-11 w-11 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary'

  return (
    <div className="mt-12">
      <div
        ref={track}
        className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-4 [scrollbar-width:none]"
      >
        {TESTIMONIALS.map((item) => (
          <figure
            key={item.name}
            className="flex w-[85%] shrink-0 snap-start flex-col rounded-md border border-border bg-card/60 p-8 sm:w-[48%] lg:w-[32%]"
          >
            {item.rating && (
              <div className="flex gap-1 text-primary" aria-label={`Nota ${item.rating} de 5`}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} aria-hidden="true" className="h-4 w-4 fill-current" />
                ))}
              </div>
            )}
            <blockquote className="mt-5 flex-1 text-lg leading-relaxed">“{item.text}”</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              {item.photo && <img src={item.photo} alt="" className="h-11 w-11 rounded-full object-cover" />}
              <span>
                <span className="block font-semibold">{item.name}</span>
                {item.source &&
                  (item.sourceUrl ? (
                    <a
                      href={item.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-primary"
                    >
                      Avaliação no {item.source}
                    </a>
                  ) : (
                    <span className="text-xs text-muted-foreground">Avaliação no {item.source}</span>
                  ))}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
      {TESTIMONIALS.length > 1 && (
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" aria-label="Depoimento anterior" className={navButton} onClick={() => scroll(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" aria-label="Próximo depoimento" className={navButton} onClick={() => scroll(1)}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  )
}

export function Testimonials() {
  return (
    <section id="depoimentos" data-scroll-bg="graphite" className="site-section">
      <div className="container-gym">
        <SectionTitle
          title={
            <>
              Quem já começou, <span className="text-primary">tem histórias para contar.</span>
            </>
          }
        />
        {TESTIMONIALS.length > 0 ? <Carousel /> : <EmptyState />}
      </div>
    </section>
  )
}
