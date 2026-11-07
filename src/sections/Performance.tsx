import performanceImg from '../assets/performance.jpg'
import { CountUp } from '../components/CountUp'

const SKILLS: [string, number][] = [
  ['Funcional', 85],
  ['Cardio', 90],
  ['Musculação', 80],
]

export function Performance() {
  return (
    <section data-scroll-bg="black" className="site-section">
      <div className="container-gym grid items-center gap-12 md:grid-cols-2">
        <div>
          <h2 data-split-title className="site-h2">
            Evolução
            <br />
            <span className="text-primary">de verdade.</span>
          </h2>
          <div className="mt-10 space-y-6">
            {SKILLS.map(([label, value]) => (
              <div key={label} data-reveal>
                <div className="flex justify-between font-display text-sm tracking-wider uppercase">
                  <span>{label}</span>
                  <CountUp to={value} duration={1600} suffix="%" />
                </div>
                <div className="mt-2 h-1 rounded-full bg-border">
                  <div
                    data-progress
                    className="h-full origin-left rounded-full bg-primary"
                    style={{ width: `${value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div data-reveal className="relative md:order-first">
          <span className="absolute -top-3 -left-3 z-10 h-6 w-20 -skew-x-[30deg] bg-primary" />
          <div className="photo-fx aspect-[16/10] w-full overflow-hidden rounded-md">
            <img
              data-parallax
              src={performanceImg}
              alt="Treino funcional na academia"
              loading="lazy"
              width={1280}
              height={768}
              className="h-full w-full scale-115 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
