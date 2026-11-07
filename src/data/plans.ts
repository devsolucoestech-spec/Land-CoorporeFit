export type PlanConditions = {
  payment?: string
  loyalty?: string
  enrollment?: string
  cancellation?: string
}

export type Plan = {
  name: string
  /** Letra exibida no selo do card. */
  code: string
  /** Valor mensal em reais (aceita centavos, ex.: 139.9). */
  price: number
  period: string
  /** Periodicidade exibida abaixo do nome (ex.: 'Mensal', 'Anual'). */
  cycle: string
  description: string
  /** Benefício herdado do plano anterior (ex.: "Tudo do Básico"). */
  includes?: string
  features: string[]
  idealFor: string
  /** Condições específicas deste plano. Sem elas, vale o que estiver em COMMERCIAL (config/site.ts). */
  conditions?: PlanConditions
  featured?: boolean
}

/** Valores e benefícios provisórios: atualize aqui e marque COMMERCIAL.pricesConfirmed em config/site.ts. */
export const PLANS: Plan[] = [
  {
    name: 'Básico',
    code: 'B',
    price: 99,
    period: 'mês',
    cycle: 'Mensal',
    description: 'O essencial para começar a treinar com estrutura e orientação.',
    features: ['Musculação', 'Horário livre', 'Avaliação física'],
    idealFor: 'quem está começando e quer focar na musculação.',
  },
  {
    name: 'Regular',
    code: 'R',
    price: 139,
    period: 'mês',
    cycle: 'Mensal',
    description: 'Mais opções para evoluir, com aulas coletivas.',
    includes: 'Tudo do Básico',
    features: ['Aulas coletivas'],
    idealFor: 'quem quer variar os treinos e acelerar a evolução.',
    featured: true,
  },
  {
    name: 'Premium',
    code: 'P',
    price: 189,
    period: 'mês',
    cycle: 'Mensal',
    description: 'A experiência completa, com funcional e acompanhamento mensal.',
    includes: 'Tudo do Regular',
    features: ['Funcional', 'Acompanhamento mensal'],
    idealFor: 'quem busca o máximo de resultado com acompanhamento de perto.',
  },
]
