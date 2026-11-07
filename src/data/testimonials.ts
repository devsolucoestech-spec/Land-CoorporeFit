export type Testimonial = {
  name: string
  text: string
  /** Foto do aluno, somente com autorização. */
  photo?: string
  /** Nota de 1 a 5, quando vier de uma avaliação verificável. */
  rating?: number
  /** Origem da avaliação (ex.: 'Google') e link público para conferência. */
  source?: string
  sourceUrl?: string
}

/** Somente depoimentos reais e autorizados. Enquanto estiver vazio, a seção mostra um convite. */
export const TESTIMONIALS: Testimonial[] = []
