import { CalendarX, Check, CreditCard, Lock, Plus, ReceiptText, Repeat2, type LucideIcon } from 'lucide-react'
import CardFlip from '../components/CardFlip'
import { SectionTitle } from '../components/SectionTitle'
import { SlideTextButton } from '../components/SlideTextButton'
import { COMMERCIAL, WHATSAPP_MESSAGES } from '../config/site'
import { PLANS, type Plan, type PlanConditions } from '../data/plans'
import { whatsappUrl } from '../lib/whatsapp'

const CONDITIONS: { key: keyof PlanConditions; label: string; icon: LucideIcon; fallback: string | null }[] = [
  { key: 'payment', label: 'Forma de pagamento', icon: CreditCard, fallback: COMMERCIAL.paymentMethods },
  { key: 'loyalty', label: 'Fidelidade', icon: Lock, fallback: COMMERCIAL.loyalty },
  { key: 'enrollment', label: 'Taxa de matrícula', icon: ReceiptText, fallback: COMMERCIAL.enrollmentFee },
  { key: 'cancellation', label: 'Cancelamento', icon: CalendarX, fallback: COMMERCIAL.cancellation },
]

function splitPrice(value: number) {
  const reais = Math.floor(value)
  const cents = Math.round((value - reais) * 100)
  return { reais: reais.toLocaleString('pt-BR'), cents: cents ? `,${String(cents).padStart(2, '0')}` : '' }
}

/** Cores de cada face: o plano em destaque usa o vermelho da marca. */
function tone(featured?: boolean) {
  return featured
    ? {
        surface:
          'border-primary bg-[linear-gradient(160deg,var(--cf-red),var(--cf-red-dark)_55%,var(--cf-wine))] text-white',
        badge: 'bg-white text-primary',
        muted: 'text-white/80',
        box: 'border-white/15 bg-black/20',
        icon: 'text-white',
        button: 'white' as const,
      }
    : {
        surface: 'border-border bg-card',
        badge: 'bg-primary text-primary-foreground',
        muted: 'text-muted-foreground',
        box: 'border-border bg-background/50',
        icon: 'text-primary',
        button: 'outline' as const,
      }
}

function PlanHeader({ plan, subtitle }: { plan: Plan; subtitle: string }) {
  const t = tone(plan.featured)
  return (
    <div className="flex items-center gap-4">
      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-lg font-display text-2xl font-bold ${t.badge}`}>
        {plan.code}
      </span>
      <div>
        <h3 className="text-3xl leading-none font-bold">{plan.name}</h3>
        <p className={`mt-1 text-[11px] font-semibold tracking-[0.2em] uppercase ${t.muted}`}>{subtitle}</p>
      </div>
    </div>
  )
}

function FlipHint({ plan, text }: { plan: Plan; text: string }) {
  return (
    <span
      className={`mt-4 flex items-center justify-center gap-1.5 text-[11px] font-semibold tracking-[0.15em] uppercase ${tone(plan.featured).muted}`}
    >
      <Repeat2 aria-hidden="true" className="h-3.5 w-3.5" />
      {text}
    </span>
  )
}

function PlanButton({ plan }: { plan: Plan }) {
  return (
    <SlideTextButton
      href={whatsappUrl(WHATSAPP_MESSAGES.plan(plan.name))}
      external
      text="Quero este plano"
      hoverText="Chamar no WhatsApp →"
      variant={tone(plan.featured).button}
      className="w-full"
    />
  )
}

function Front({ plan }: { plan: Plan }) {
  const t = tone(plan.featured)
  const { reais, cents } = splitPrice(plan.price)
  return (
    <div className={`flex h-full flex-col rounded-lg border p-7 ${t.surface}`}>
      <PlanHeader plan={plan} subtitle={plan.cycle} />
      <p className={`mt-5 text-sm leading-relaxed ${t.muted}`}>{plan.description}</p>

      <p className={`mt-6 text-[11px] font-semibold tracking-[0.2em] uppercase ${t.muted}`}>Mensalidade</p>
      <p className="mt-1 flex items-end font-display font-bold">
        <span className="mb-2.5 mr-1.5 text-xl">R$</span>
        <span className="text-7xl leading-none">{reais}</span>
        <span className="mb-1.5 text-2xl">{cents}</span>
        <span className={`mb-2 ml-1.5 font-sans text-sm font-normal ${t.muted}`}>/{plan.period}</span>
      </p>

      <div className={`mt-6 rounded-md border p-4 ${t.box}`}>
        <p className={`text-[10px] font-bold tracking-[0.2em] uppercase ${t.muted}`}>O que inclui</p>
        <ul className="mt-3 space-y-2.5 text-sm">
          {plan.includes && (
            <li className={`flex items-center gap-3 ${t.muted}`}>
              <Plus aria-hidden="true" className="h-4 w-4 shrink-0" />
              {plan.includes}
            </li>
          )}
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3 font-medium">
              <Check aria-hidden="true" className={`h-4 w-4 shrink-0 ${t.icon}`} />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-5 text-sm">
        <strong className="font-semibold">Ideal pra:</strong> <span className={t.muted}>{plan.idealFor}</span>
      </p>

      <div className="mt-auto pt-6">
        <PlanButton plan={plan} />
        <FlipHint plan={plan} text="Toque para ver as condições" />
      </div>
    </div>
  )
}

function Back({ plan }: { plan: Plan }) {
  const t = tone(plan.featured)
  return (
    <div className={`flex h-full flex-col rounded-lg border p-7 ${t.surface}`}>
      <PlanHeader plan={plan} subtitle="Condições do plano" />

      <div className={`mt-8 rounded-md border p-5 ${t.box}`}>
        <p className={`text-[10px] font-bold tracking-[0.2em] uppercase ${t.muted}`}>O que muda neste plano</p>
        <dl className="mt-4 space-y-4">
          {CONDITIONS.map(({ key, label, icon: Icon, fallback }) => {
            const value = plan.conditions?.[key] ?? fallback
            return (
              <div key={key} className="flex items-start gap-3">
                <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-md border ${t.box}`}>
                  <Icon aria-hidden="true" className={`h-4 w-4 ${t.icon}`} />
                </span>
                <div>
                  <dt className={`text-xs ${t.muted}`}>{label}</dt>
                  <dd className={`text-sm font-semibold ${value ? '' : t.muted}`}>{value ?? 'Consulte a equipe'}</dd>
                </div>
              </div>
            )
          })}
        </dl>
      </div>

      <div className="mt-auto pt-6">
        <PlanButton plan={plan} />
        <FlipHint plan={plan} text="Toque para voltar" />
      </div>
    </div>
  )
}

export function Pricing() {
  return (
    <section id="planos" data-scroll-bg="wine" className="site-section">
      <div className="container-gym">
        <SectionTitle
          align="center"
          title={
            <>
              Encontre o plano <span className="text-primary">ideal para você.</span>
            </>
          }
          sub="Escolha a opção que combina com seus objetivos e comece sua evolução."
        />

        <div className="mx-auto mt-16 grid max-w-md gap-8 lg:max-w-none lg:grid-cols-3">
          {PLANS.map((plan) => (
            <div key={plan.name} data-reveal className="relative">
              {plan.featured && (
                <span className="absolute -top-3.5 left-1/2 z-20 -translate-x-1/2 rounded-md bg-background px-3 py-1 font-display text-xs font-bold tracking-[0.15em] whitespace-nowrap text-white uppercase ring-1 ring-primary">
                  Mais escolhido
                </span>
              )}
              <CardFlip
                label={`Plano ${plan.name}`}
                className="h-[640px] w-full"
                faceClassName="text-foreground"
                front={<Front plan={plan} />}
                back={<Back plan={plan} />}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
