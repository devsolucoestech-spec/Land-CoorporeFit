const PROTECTED = 'img, video, picture, [data-protect-media]'

const isProtected = (target: EventTarget | null) => target instanceof Element && target.closest(PROTECTED) !== null

/**
 * Dificulta salvar fotos e vídeos pelo clique direito ou arrastando para fora da página.
 * Não impede capturas de tela nem a aba Rede do DevTools: tudo o que é exibido já foi baixado pelo navegador.
 */
export function protectMedia() {
  const block = (event: Event) => {
    if (isProtected(event.target)) event.preventDefault()
  }
  document.addEventListener('contextmenu', block)
  document.addEventListener('dragstart', block)
}
