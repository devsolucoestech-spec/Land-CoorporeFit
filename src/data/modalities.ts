import funcional from '../assets/modalidade-funcional.webp'
import hiit from '../assets/modalidade-hiit.webp'
import musculacao from '../assets/modalidade-musculacao.webp'
import personal from '../assets/modalidade-personal.webp'

export type Modality = {
  name: string
  description: string
  /** Imagem ilustrativa. Substitua por fotos reais da academia quando houver. */
  image: string
}

export const MODALITIES: Modality[] = [
  {
    name: 'Musculação',
    description: 'Desenvolva força, resistência e massa muscular com treinos adequados aos seus objetivos.',
    image: musculacao,
  },
  {
    name: 'Personal',
    description: 'Acompanhamento individualizado para quem busca atenção exclusiva e orientação mais próxima.',
    image: personal,
  },
  {
    name: 'HIIT',
    description: 'Treinos intervalados de alta intensidade para desenvolver seu condicionamento físico.',
    image: hiit,
  },
  {
    name: 'Funcional',
    description: 'Exercícios dinâmicos que trabalham força, equilíbrio, coordenação e mobilidade.',
    image: funcional,
  },
]
