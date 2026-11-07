import aboutImg from '../assets/about.jpg'

export function About() {
  return (
    <section id="sobre" data-scroll-bg="graphite" className="site-section">
      <div className="container-gym grid items-center gap-12 md:grid-cols-2">
        <div data-reveal className="photo-fx aspect-[4/3.4] w-full overflow-hidden rounded-md">
          <img
            data-parallax
            src={aboutImg}
            alt="Atleta treinando com cordas navais"
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full scale-115 object-cover"
          />
        </div>
        <div>
          <h2 data-split-title className="site-h2">
            Força,
            <br />
            disciplina e <span className="text-primary">resultado.</span>
          </h2>
          <p data-reveal className="mt-6 max-w-sm text-muted-foreground">
            Estrutura completa e treinadores ao seu lado em cada treino.
          </p>
          <a data-reveal href="#planos" className="btn-primary btn-lg mt-8">
            Comece agora →
          </a>
        </div>
      </div>
    </section>
  )
}
