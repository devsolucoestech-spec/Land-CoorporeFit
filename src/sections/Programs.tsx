import { ArrowUpRight } from 'lucide-react'
import progFitness from '../assets/prog-fitness.jpg'
import progHiit from '../assets/prog-hiit.jpg'
import progPersonal from '../assets/prog-personal.jpg'
import progStrength from '../assets/prog-strength.jpg'
import { SectionTitle } from '../components/SectionTitle'

const PROGRAMS = [
  { title: 'Musculação', img: progStrength },
  { title: 'Personal', img: progPersonal },
  { title: 'HIIT', img: progHiit },
  { title: 'Funcional', img: progFitness },
]

export function Programs() {
  return (
    <section id="programas" data-scroll-bg="black" className="site-section">
      <div className="container-gym">
        <SectionTitle
          title={
            <>
              Escolha o seu <span className="text-primary">treino.</span>
            </>
          }
          action={
            <a href="#planos" className="btn-primary btn-lg">
              Matricule-se →
            </a>
          }
        />
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {PROGRAMS.map((program, i) => (
            <article
              key={program.title}
              data-reveal
              className="group relative aspect-[3/4] overflow-hidden rounded-md border border-border transition-colors duration-300 hover:border-primary"
            >
              <div className="photo-fx absolute inset-0">
                <img
                  src={program.img}
                  alt={program.title}
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <span className="absolute top-4 left-4 font-display text-xs font-bold tracking-[0.2em] text-primary">
                0{i + 1}
              </span>
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 text-white sm:p-5">
                <h3 className="text-lg font-bold sm:text-2xl md:text-3xl">{program.title}</h3>
                <span className="hidden h-9 w-9 shrink-0 place-items-center rounded-full bg-primary transition-transform group-hover:rotate-45 sm:grid">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
