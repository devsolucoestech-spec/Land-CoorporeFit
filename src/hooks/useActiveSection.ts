import { useEffect, useState } from 'react'

/**
 * Âncora da seção em destaque na tela: a última cujo topo já passou de 40% da altura da janela.
 * Funciona também dentro do trecho fixo do hero, porque a camada que sobe é medida com o transform aplicado.
 */
export function useActiveSection(hrefs: string[]) {
  const [active, setActive] = useState(hrefs[0])
  const key = hrefs.join('|')

  useEffect(() => {
    const ids = key.split('|')
    let frame = 0
    const update = () => {
      frame = 0
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4
      if (atBottom) {
        setActive(ids[ids.length - 1])
        return
      }
      const line = window.innerHeight * 0.4
      let current = ids[0]
      for (const href of ids) {
        const el = document.getElementById(href.slice(1))
        if (el && el.getBoundingClientRect().top <= line) current = href
      }
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [key])

  return active
}
