import { ArrowUpRight, Clock, Repeat2 } from 'lucide-react'
import CardFlip from '../components/CardFlip'
import { SectionTitle } from '../components/SectionTitle'
import { SlideTextButton } from '../components/SlideTextButton'
import { WHATSAPP_MESSAGES } from '../config/site'
import { MODALITIES, type Modality } from '../data/modalities'
import { scheduleOf } from '../data/schedule'
import { focusSchedule } from '../lib/scheduleFocus'
import { whatsappUrl } from '../lib/whatsapp'

const FEATURED = MODALITIES.filter((m) => m.featured)
const OTHERS = MODALITIES.filter((m) => !m.featured)
const number = (modality: Modality) => String(MODALITIES.indexOf(modality) + 1).padStart(2, '0')

function ScheduleLine({ modality, className = '' }: { modality: Modality; className?: string }) {
  const schedule = scheduleOf(modality.name)
  if (schedule.kind === 'none') return null
  return (
    <span className={`flex items-start gap-2 text-[11px] font-semibold tracking-[0.1em] uppercase ${className}`}>
      <Clock aria-hidden="true" className="mt-px h-3.5 w-3.5 shrink-0 text-primary" />
      <span className="flex flex-wrap gap-x-2">
        {schedule.summary.split(' | ').map((part, i) => (
          <span key={part} className="whitespace-nowrap">
            {i > 0 && <span className="mr-2 text-white/30">|</span>}
            {part}
          </span>
        ))}
      </span>
    </span>
  )
}

function Front({ modality }: { modality: Modality }) {
  return (
    <div className="relative h-full w-full">
      {modality.image && (
        <div className="photo-fx absolute inset-0">
          <img src={modality.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      <div className="absolute inset-x-5 top-5 flex items-center justify-between sm:inset-x-6 sm:top-6">
        <span className="font-display text-sm font-bold tracking-[0.2em] text-primary">{number(modality)}</span>
        <span className="flex items-center gap-1.5 rounded-full border border-white/15 bg-background/50 px-2.5 py-1 text-[10px] font-semibold tracking-[0.15em] text-white/80 uppercase backdrop-blur">
          <Repeat2 aria-hidden="true" className="h-3.5 w-3.5 text-primary" />
          Virar
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 md:p-8">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-white/70 uppercase">{modality.tagline}</p>
        <h3 className="mt-1 text-[clamp(32px,10vw,40px)] font-bold text-white md:text-5xl">{modality.name}</h3>
        <ScheduleLine modality={modality} className="mt-3 text-white/75" />
      </div>
    </div>
  )
}

function Back({ modality }: { modality: Modality }) {
  const schedule = scheduleOf(modality.name)
  return (
    <div className="relative flex h-full flex-col p-6 sm:p-7 md:p-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(90%_60%_at_100%_0%,rgb(255_0_0/0.18),transparent_60%),radial-gradient(80%_60%_at_0%_100%,rgb(71_0_0/0.6),transparent_70%)]"
      />
      <span className="relative font-display text-sm font-bold tracking-[0.2em] text-primary">{number(modality)}</span>
      <h3 className="relative mt-3 text-3xl font-bold sm:text-4xl">{modality.name}</h3>
      <span aria-hidden="true" className="relative mt-4 h-0.5 w-10 bg-primary" />
      <p className="relative mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground sm:mt-5 sm:text-base">
        {modality.description}
      </p>

      <div className="relative mt-auto flex flex-col gap-2.5 pt-6 sm:flex-row">
        {schedule.kind !== 'none' && (
          <SlideTextButton
            href="#horarios"
            onClick={() => focusSchedule(modality.name)}
            text="Ver horários"
            hoverText="Ir para a grade ↓"
            size="md"
            className="sm:flex-1"
          />
        )}
        <SlideTextButton
          href={whatsappUrl(WHATSAPP_MESSAGES.modality(modality.name))}
          external
          text="Conhecer modalidade"
          hoverText="Chamar no WhatsApp →"
          variant="ghost"
          size="md"
          className="sm:flex-1"
        />
      </div>
    </div>
  )
}

function SmallCard({ modality }: { modality: Modality }) {
  const schedule = scheduleOf(modality.name)
  const linked = schedule.kind !== 'none'
  // A área de hover (o link) fica parada; só o painel interno se move, para o card não "fugir" do cursor.
  const className = 'group block h-full rounded-lg outline-none'
  const ease = 'ease-[cubic-bezier(0.23,1,0.32,1)]'

  const content = (
    <span
      className={`relative flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card p-6 transition-[border-color,translate,box-shadow] duration-300 ${ease} group-hover:-translate-y-1 group-hover:border-primary/60 group-hover:shadow-[0_24px_48px_-28px_var(--primary)] group-focus-visible:-translate-y-1 group-focus-visible:border-primary group-focus-visible:ring-2 group-focus-visible:ring-primary motion-reduce:transition-none motion-reduce:group-hover:translate-y-0`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-bottom scale-y-0 bg-[linear-gradient(to_top,rgb(255_0_0/0.16),transparent_70%)] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
      />
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-primary transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-y-100 group-focus-visible:scale-y-100"
      />
      <span
        aria-hidden="true"
        className="text-outline pointer-events-none absolute -right-2 -bottom-6 font-display text-[110px] leading-none font-bold opacity-30 transition-[translate,opacity] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-x-3 group-hover:opacity-60"
      >
        {number(modality)}
      </span>

      <span className="relative flex items-center justify-between">
        <span className="font-display text-sm font-bold tracking-[0.2em] text-primary">{number(modality)}</span>
        {linked && (
          <ArrowUpRight
            aria-hidden="true"
            className="h-5 w-5 text-muted-foreground transition-[rotate,color] duration-300 group-hover:rotate-45 group-hover:text-primary"
          />
        )}
      </span>
      {/* O espaço da descrição é sempre reservado: no hover só muda opacidade/posição, nunca a altura. */}
      <span
        className={`relative mt-5 flex flex-col transition-transform duration-500 ${ease} [@media(hover:hover)]:translate-y-8 group-hover:translate-y-0 group-focus-visible:translate-y-0 motion-reduce:transition-none`}
      >
        <span className="font-display text-2xl font-bold uppercase md:text-3xl">{modality.name}</span>
        <span className="mt-1 text-xs text-muted-foreground">{modality.tagline}</span>
        <span
          className={`mt-4 text-sm leading-relaxed text-muted-foreground transition-[opacity,translate] duration-500 ${ease} [@media(hover:hover)]:translate-y-2 [@media(hover:hover)]:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none`}
        >
          {modality.description}
        </span>
      </span>

      <ScheduleLine modality={modality} className="relative mt-auto pt-5 text-foreground/80" />
    </span>
  )

  return linked ? (
    <a
      href="#horarios"
      onClick={() => focusSchedule(modality.name)}
      aria-label={`${modality.name}: ${schedule.kind === 'classes' ? 'ver horários' : 'consultar horários'}`}
      className={className}
    >
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
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
          sub="Diferentes modalidades para diferentes objetivos. Escolha como deseja evoluir."
        />

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 md:gap-5">
          {FEATURED.map((modality) => (
            <div key={modality.name} data-reveal>
              <CardFlip
                label={`Modalidade ${modality.name}`}
                className="h-[clamp(380px,112vw,440px)] w-full md:h-[420px]"
                front={<Front modality={modality} />}
                back={<Back modality={modality} />}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 min-[480px]:grid-cols-2 md:mt-5 md:grid-cols-3 md:gap-5">
          {OTHERS.map((modality, i) => (
            <div
              key={modality.name}
              data-reveal
              className={
                i === OTHERS.length - 1 && OTHERS.length % 2 === 1 ? 'min-[480px]:max-md:col-span-2' : undefined
              }
            >
              <SmallCard modality={modality} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
