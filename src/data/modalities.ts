import abdominal from '../assets/modalidade-abdominal.webp'
import funcional from '../assets/modalidade-funcional.webp'
import gap from '../assets/modalidade-gap.webp'
import musculacao from '../assets/modalidade-musculacao.webp'

export type Modality = {
  name: string
  /** Linha curta exibida abaixo do nome. */
  tagline: string
  description: string
  /** Principais: aparecem nos cards grandes com foto. */
  featured?: boolean
  image?: string
}

/** Modalidades divulgadas no vídeo institucional da Corpore Fit. Os horários ficam em data/schedule.ts. */
export const MODALITIES: Modality[] = [
  {
    name: 'Musculação',
    tagline: 'Força · resistência · massa muscular',
    description: 'Desenvolva força, resistência e massa muscular com treinos orientados para seus objetivos.',
    featured: true,
    image: musculacao,
  },
  {
    name: 'Funcional',
    tagline: 'Força · equilíbrio · coordenação',
    description: 'Exercícios dinâmicos que trabalham força, equilíbrio, coordenação e condicionamento físico.',
    featured: true,
    image: funcional,
  },
  {
    name: 'GAP',
    tagline: 'Glúteos · abdômen · pernas',
    description: 'Treinamento direcionado para glúteos, abdômen e pernas, trabalhando força e resistência muscular.',
    image: gap,
  },
  {
    name: 'Muay Thai',
    tagline: 'Técnica · movimentação · condicionamento',
    description: 'Uma modalidade de luta que combina técnicas, movimentação e condicionamento físico.',
  },
  {
    name: 'Abdominal',
    tagline: 'Abdômen · região central do corpo',
    description: 'Exercícios direcionados ao fortalecimento da musculatura abdominal e da região central do corpo.',
    image: abdominal,
  },
]
