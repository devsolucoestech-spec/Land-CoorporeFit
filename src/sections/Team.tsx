import { SectionTitle } from '../components/SectionTitle'
import { TEAM } from '../data/team'

export function Team() {
  return (
    <section id="equipe" data-scroll-bg="graphite" className="site-section">
      <div className="container-gym">
        <SectionTitle
          title={
            <>
              Por trás de cada evolução, <span className="text-primary">uma equipe preparada.</span>
            </>
          }
          sub="Conheça os profissionais que estarão ao seu lado durante sua jornada."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {TEAM.map((member) => (
            <article key={member.name} data-reveal className="group">
              <div className="photo-fx overflow-hidden rounded-md border border-border transition-colors duration-300 group-hover:border-primary">
                <img
                  src={member.photo}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  width={768}
                  height={960}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-lg font-bold md:text-xl">{member.name}</h3>
              <p className="font-display text-xs font-semibold tracking-[0.2em] text-primary uppercase">{member.role}</p>
              {member.credentials && <p className="mt-2 text-xs text-muted-foreground">{member.credentials}</p>}
              {member.bio && <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
