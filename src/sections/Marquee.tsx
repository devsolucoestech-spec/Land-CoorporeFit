import { MODALITIES } from '../data/modalities'

/** Repetida em número par para a alternância cheio/contorno não quebrar na emenda do loop. */
const ITEMS = [...MODALITIES, ...MODALITIES].map((modality) => modality.name)

export function Marquee() {
  return (
    <section data-scroll-bg="black" aria-hidden="true" className="overflow-hidden pt-10 md:pt-28">
      <div className="overflow-hidden border-y border-border py-5">
        <div className="marquee-track flex w-max">
          {Array.from({ length: 2 }).map((_, copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {ITEMS.map((item, i) => (
                <div key={`${item}-${i}`} className="flex items-center">
                  <span
                    className={`px-6 font-display text-3xl font-bold uppercase md:text-4xl ${
                      i % 2 ? 'text-outline' : ''
                    }`}
                  >
                    {item}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
