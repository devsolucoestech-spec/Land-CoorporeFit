import { Repeat2 } from 'lucide-react'
import CardFlip from '../components/CardFlip'
import { SectionTitle } from '../components/SectionTitle'
import { SlideTextButton } from '../components/SlideTextButton'
import { WHATSAPP_MESSAGES } from '../config/site'
import { MODALITIES, type Modality } from '../data/modalities'
import { whatsappUrl } from '../lib/whatsapp'

const number = (i: number) => String(i + 1).padStart(2, '0')

function Front({ modality, index }: { modality: Modality; index: number }) {
  return (
    <div className="relative h-full w-full">
      <div className="photo-fx absolute inset-0">
        <img src={modality.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between">
        <span className="font-display text-sm font-bold tracking-[0.2em] text-primary">{number(index)}</span>
        <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-background/50 px-2.5 py-1 text-[10px] font-semibold tracking-[0.15em] text-white/80 uppercase backdrop-blur">
          <Repeat2 aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
          Virar
        </span>
      </div>
      <h3 className="absolute inset-x-0 bottom-0 p-6 text-3xl font-bold text-white">{modality.name}</h3>
    </div>
  )
}

function Back({ modality, index }: { modality: Modality; index: number }) {
  return (
    <div className="relative flex h-full flex-col p-7">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(90%_60%_at_100%_0%,rgb(255_0_0/0.18),transparent_60%),radial-gradient(80%_60%_at_0%_100%,rgb(71_0_0/0.6),transparent_70%)]"
      />
      <span className="relative font-display text-sm font-bold tracking-[0.2em] text-primary">{number(index)}</span>
      <h3 className="relative mt-4 text-3xl font-bold">{modality.name}</h3>
      <span aria-hidden="true" className="relative mt-4 h-0.5 w-10 bg-primary" />
      <p className="relative mt-5 leading-relaxed text-muted-foreground">{modality.description}</p>
      <SlideTextButton
        href={whatsappUrl(WHATSAPP_MESSAGES.modality(modality.name))}
        external
        text="Conhecer modalidade"
        hoverText="Chamar no WhatsApp →"
        size="md"
        className="relative mt-auto w-full"
      />
    </div>
  )
}

export function Modalities() {
  return (
    <section id="modalidades" data-scroll-bg="black" className="site-section">
      <div className="container-gym">
        <SectionTitle
          title={
            <>
              Encontre o treino <span className="text-primary">ideal para você.</span>
            </>
          }
          sub="Diferentes modalidades para diferentes objetivos. Toque nos cards e escolha como deseja evoluir."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {MODALITIES.map((modality, i) => (
            <div key={modality.name} data-reveal>
              <CardFlip
                label={`Modalidade ${modality.name}`}
                className="aspect-[3/4] w-full"
                front={<Front modality={modality} index={i} />}
                back={<Back modality={modality} index={i} />}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
