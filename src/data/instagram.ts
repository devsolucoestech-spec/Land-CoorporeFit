import timeDeVencedores from '../assets/instagram-time-de-vencedores.webp'

export type InstagramPost = {
  label: string
  /** Imagem real publicada no perfil. Sem `src`, o bloco vira um atalho para o perfil. */
  src?: string
  alt?: string
}

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    label: 'Nosso time',
    src: timeDeVencedores,
    alt: 'Instrutores da Corpore Fit: "Venha fazer parte do nosso time de vencedores"',
  },
  { label: 'Treinos' },
  { label: 'Aulas coletivas' },
  { label: 'Momentos reais' },
]
