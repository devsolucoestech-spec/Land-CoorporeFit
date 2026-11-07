import equipe1 from '../assets/equipe-1.webp'
import equipe2 from '../assets/equipe-2.webp'
import equipe3 from '../assets/equipe-3.webp'
import equipe4 from '../assets/equipe-4.webp'

export type TeamMember = {
  name: string
  role: string
  photo: string
  /** Formação ou certificações reais (ex.: 'CREF 000000-G/SP'). Não preencha sem confirmação. */
  credentials?: string
  /** Apresentação curta, em até duas linhas. */
  bio?: string
}

/** Nomes e fotos provisórios: substitua pela equipe real da Corpore Fit. */
export const TEAM: TeamMember[] = [
  { name: 'Marcos Ribeiro', role: 'Funcional', photo: equipe1 },
  { name: 'Rafael Souza', role: 'Musculação', photo: equipe2 },
  { name: 'Daniela Paiva', role: 'GAP', photo: equipe3 },
  { name: 'Juliana Alves', role: 'Funcional', photo: equipe4 },
]
