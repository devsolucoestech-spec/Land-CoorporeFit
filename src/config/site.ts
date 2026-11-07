/**
 * Configuração central da Corpore Fit.
 * Campos vazios ('' ou null) não aparecem no site: preencha somente com dados reais e confirmados.
 */
export const SITE = {
  name: 'Corpore Fit Academia',
  shortName: 'Corpore Fit',
  description: 'Musculação e treino funcional para quem quer evoluir com acompanhamento.',

  /** Somente números, com DDI e DDD. Ex.: '5511999999999'. */
  whatsapp: '',
  /** Telefone para exibição. Ex.: '(11) 3333-3333'. */
  phone: '',
  email: '',

  instagram: {
    url: 'https://www.instagram.com/corpore_fit_academia/',
    handle: '@corpore_fit_academia',
  },
  facebook: '',

  address: {
    /** Ex.: 'Rua Exemplo, 123 – Centro'. */
    street: 'Q. Raimundo Portela, 48 - 21 395 - Promorar',
    /** Ex.: 'Cidade – UF'. */
    city: 'Teresina - PI',
    zip: '64027-110',
    /** Link do Google Maps. */
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Corpore%20Fit%20Academia%2C%20Q.%20Raimundo%20Portela%2C%2048%20-%2021%20395%20-%20Promorar%2C%20Teresina%20-%20PI%2C%2064027-110',
    /** Busca usada no mapa incorporado e no "Como chegar". Com o nome, o Google aponta o estabelecimento certo. */
    mapQuery: 'Corpore Fit Academia, Q. Raimundo Portela, 48 - 21 395 - Promorar, Teresina - PI, 64027-110',
  },

  /** Razão social e CNPJ, usados na política de privacidade e no rodapé. */
  legalName: '',
  cnpj: '',
}

/** Horário de funcionamento da academia. Marque `confirmed: true` quando os horários forem oficiais. */
export const OPENING_HOURS = {
  confirmed: false,
  items: [
    { days: 'Segunda a sexta', hours: '06h às 22h' },
    { days: 'Sábado', hours: '08h às 14h' },
    { days: 'Domingo e feriados', hours: 'Fechado' },
  ],
}

/**
 * Condições comerciais exibidas abaixo dos planos e usadas no FAQ.
 * Mantenha `null` enquanto a informação não for oficial.
 */
export const COMMERCIAL = {
  /** Marque `true` quando preços e benefícios dos planos forem oficiais. */
  pricesConfirmed: false,
  enrollmentFee: null as string | null,
  loyalty: null as string | null,
  paymentMethods: null as string | null,
  cancellation: null as string | null,
  specialConditions: null as string | null,
  trialClass: null as string | null,
  physicalAssessment: null as string | null,
}

export const WHATSAPP_MESSAGES = {
  general: 'Olá! Gostaria de saber mais sobre a Corpore Fit.',
  visit: 'Olá! Gostaria de agendar uma visita à Corpore Fit.',
  schedule: 'Olá! Gostaria de informações sobre os horários de aulas da Corpore Fit.',
  modalitySchedule: (modality: string) => `Olá! Gostaria de saber os dias e horários de ${modality} na Corpore Fit.`,
  plan: (plan: string) =>
    `Olá! Tenho interesse no plano ${plan} da Corpore Fit. Gostaria de saber mais sobre a matrícula.`,
  modality: (modality: string) => `Olá! Quero conhecer a modalidade ${modality} da Corpore Fit.`,
}
