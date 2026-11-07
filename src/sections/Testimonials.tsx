import { Star } from 'lucide-react'
import trainer1 from '../assets/trainer-1.jpg'
import trainer2 from '../assets/trainer-2.jpg'
import trainer3 from '../assets/trainer-3.jpg'
import trainer4 from '../assets/trainer-4.jpg'
import { CountUp } from '../components/CountUp'

export function Testimonials() {
  return (
    <section data-scroll-bg="black" className="site-section">
      <div className="container-gym grid items-center gap-12 md:grid-cols-[1fr_1.4fr]">
        <div>
          <h2 data-split-title className="site-h2">
            Quem treina,
            <br />
            <span className="text-primary">recomenda.</span>
          </h2>
          <div data-reveal className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[trainer1, trainer3, trainer2].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-10 w-10 rounded-full border-2 border-card object-cover"
                />
              ))}
            </div>
            <p className="font-display text-3xl font-bold">
              <CountUp to={500} suffix="+" />{' '}
              <span className="font-sans text-xs font-normal text-muted-foreground">alunos</span>
            </p>
          </div>
        </div>

        <figure data-reveal className="rounded-md border border-primary/60 bg-card/40 p-8 md:p-10">
          <div className="flex gap-1 text-primary">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <blockquote className="mt-5 font-display text-2xl leading-snug font-medium md:text-3xl">
            “Melhor decisão que tomei pela minha saúde. Ambiente que motiva e resultado de verdade.”
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <img src={trainer4} alt="" loading="lazy" className="h-10 w-10 rounded-full object-cover" />
            <span className="text-sm font-medium">Aline Ferreira</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
