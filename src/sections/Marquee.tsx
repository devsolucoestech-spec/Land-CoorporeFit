const ITEMS = ['Musculação', 'HIIT', 'Funcional', 'Cardio', 'Crossfit', 'Personal']

export function Marquee() {
  return (
    <section data-scroll-bg="black" aria-hidden="true" className="overflow-hidden pt-24">
      <div className="overflow-hidden border-y border-border py-5">
        <div className="marquee-track flex w-max">
          {Array.from({ length: 2 }).map((_, copy) => (
            <div key={copy} className="flex shrink-0 items-center">
              {ITEMS.map((item, i) => (
                <div key={item} className="flex items-center">
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
