import { Check } from 'lucide-react'
import { SectionTitle } from '../components/SectionTitle'

type Plan = {
  name: string
  price: string
  features: string[]
  featured?: boolean
}

const PLANS: Plan[] = [
  { name: 'Básico', price: '99', features: ['Musculação', 'Horário livre', 'Avaliação física'] },
  {
    name: 'Regular',
    price: '139',
    featured: true,
    features: ['Tudo do Básico', 'Aulas coletivas', 'Treino personalizado'],
  },
  { name: 'Premium', price: '189', features: ['Tudo do Regular', 'Funcional e HIIT', 'Acompanhamento mensal'] },
]

export function Pricing() {
  return (
    <section id="planos" data-scroll-bg="black" className="site-section pt-0 md:pt-0">
      <div className="container-gym">
        <SectionTitle
          title={
            <>
              Escolha o seu <span className="text-primary">plano.</span>
            </>
          }
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3 md:items-center">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              data-reveal
              className={`rounded-md border p-8 transition-colors ${
                plan.featured
                  ? 'border-primary bg-card shadow-[0_24px_60px_-30px_var(--primary)] md:py-12'
                  : 'border-border bg-card/40 hover:border-primary/60'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                {plan.featured && (
                  <span className="rounded-sm bg-primary px-2 py-1 text-[10px] font-semibold text-primary-foreground uppercase">
                    Mais escolhido
                  </span>
                )}
              </div>
              <p className="mt-6 font-display text-5xl font-semibold">
                <span className="mr-1 text-xl">R$</span>
                {plan.price}
                <span className="ml-1 font-sans text-xs text-muted-foreground">/mês</span>
              </p>
              <ul className="mt-8 space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a href="#contato" className="btn-primary mt-8 w-full">
                Matricule-se
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
