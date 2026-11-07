import aulasColetivasCapa from '../assets/instagram-aulas-coletivas-capa.webp'
import aulasColetivasVideo from '../assets/instagram-aulas-coletivas.mp4'
import professoresCapa from '../assets/instagram-professores-capa.webp'
import professoresVideo from '../assets/instagram-professores.mp4'
import timeDeVencedores from '../assets/instagram-time-de-vencedores.webp'

export type InstagramPost = {
  label: string
  /** Imagem real publicada no perfil (ou capa do vídeo). Sem `src`, o bloco vira um atalho para o perfil. */
  src?: string
  /** Vídeo real do perfil; `src` é usado como capa. */
  video?: string
  alt?: string
}

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    label: 'Nosso time',
    src: timeDeVencedores,
    alt: 'Instrutores da Corpore Fit: "Venha fazer parte do nosso time de vencedores"',
  },
  { label: 'Treinos' },
  {
    label: 'Aulas coletivas',
    src: aulasColetivasCapa,
    video: aulasColetivasVideo,
    alt: 'Vídeo de uma aula coletiva na Corpore Fit',
  },
  {
    label: 'Professores',
    src: professoresCapa,
    video: professoresVideo,
    alt: 'Vídeo apresentando os professores da Corpore Fit',
  },
]
