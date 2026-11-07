import { COMMERCIAL, OPENING_HOURS, SITE } from '../config/site'

export type FaqItem = { question: string; answer: string }

const ASK_TEAM = 'Fale com a nossa equipe pelo WhatsApp para receber as condições atualizadas.'

const address = [SITE.address.street, SITE.address.city].filter(Boolean).join(', ')
const hours = OPENING_HOURS.items.map((item) => `${item.days}: ${item.hours}`).join(' · ')

/** Respostas baseadas na configuração em config/site.ts. Sem informação oficial, o visitante é direcionado à equipe. */
export const FAQ: FaqItem[] = [
  {
    question: 'Preciso ter experiência para começar a treinar?',
    answer:
      'Não. Os treinos são orientados por profissionais e podem ser adaptados a diferentes perfis e níveis de condicionamento.',
  },
  {
    question: 'Como funciona a avaliação física?',
    answer:
      COMMERCIAL.physicalAssessment ??
      'Fale com a nossa equipe pelo WhatsApp para saber como funciona a avaliação e em quais planos ela está incluída.',
  },
  {
    question: 'Os planos possuem fidelidade?',
    answer: COMMERCIAL.loyalty ?? ASK_TEAM,
  },
  {
    question: 'Existe taxa de matrícula?',
    answer: COMMERCIAL.enrollmentFee ?? ASK_TEAM,
  },
  {
    question: 'Posso fazer uma aula experimental?',
    answer: COMMERCIAL.trialClass ?? 'Fale com a nossa equipe pelo WhatsApp e consulte a disponibilidade.',
  },
  {
    question: 'Quais são os horários de funcionamento?',
    answer: OPENING_HOURS.confirmed
      ? hours
      : 'Confira a seção de horários desta página e confirme com a nossa equipe pelo WhatsApp.',
  },
  {
    question: 'Quais formas de pagamento são aceitas?',
    answer: COMMERCIAL.paymentMethods ?? ASK_TEAM,
  },
  {
    question: 'Como faço para me matricular?',
    answer:
      'Escolha o seu plano na seção de planos e toque em "Quero este plano". Você será direcionado ao WhatsApp da Corpore Fit para concluir a matrícula.',
  },
  {
    question: 'Quais modalidades estão incluídas em cada plano?',
    answer: 'Os benefícios de cada plano estão descritos na seção de planos. Em caso de dúvida, fale com a nossa equipe.',
  },
  {
    question: 'Onde fica a academia?',
    answer: address || 'Fale com a nossa equipe pelo WhatsApp para receber o endereço e a melhor forma de chegar.',
  },
]
