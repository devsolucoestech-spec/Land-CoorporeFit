import trainer1 from '../assets/trainer-1.jpg'
import trainer2 from '../assets/trainer-2.jpg'
import trainer3 from '../assets/trainer-3.jpg'
import trainer4 from '../assets/trainer-4.jpg'
import { SectionTitle } from '../components/SectionTitle'

const TRAINERS = [
  { name: 'Marcos Ribeiro', role: 'Funcional', img: trainer1 },
  { name: 'Rafael Souza', role: 'Musculação', img: trainer2 },
  { name: 'Daniela Paiva', role: 'HIIT', img: trainer3 },
  { name: 'Juliana Alves', role: 'Funcional', img: trainer4 },
]

export function Trainers() {
  return (
    <section data-scroll-bg="wine" className="site-section pb-16 md:pb-16">
      <div className="container-gym">
        <SectionTitle
          title={
            <>
              Nosso <span className="text-primary">time.</span>
            </>
          }
        />
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {TRAINERS.map((trainer) => (
            <div key={trainer.name} data-reveal className="group">
              <div className="photo-fx overflow-hidden rounded-md border border-transparent transition-colors duration-300 group-hover:border-primary">
                <img
                  src={trainer.img}
                  alt={trainer.name}
                  loading="lazy"
                  width={768}
                  height={960}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-lg font-bold">{trainer.name}</h3>
              <p className="font-display text-xs tracking-[0.2em] text-primary uppercase">{trainer.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
