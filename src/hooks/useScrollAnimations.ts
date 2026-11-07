import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLayoutEffect, useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

/** Janela de rolagem em que o fundo muda para a cor da próxima seção. */
const BG_START = 'top 70%'
const BG_END = 'top 45%'

/** Converte qualquer cor CSS (inclusive oklch) para rgba, formato que o GSAP consegue interpolar. */
function toRgba(color: string) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 1
  const ctx = canvas.getContext('2d', { willReadFrequently: true })
  if (!ctx) return color
  ctx.fillStyle = color
  ctx.fillRect(0, 0, 1, 1)
  const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data
  return `rgba(${r}, ${g}, ${b}, ${a / 255})`
}

/**
 * Envolve cada palavra do elemento em `.word-mask > .word-mask__inner`,
 * preservando spans internos (ex.: palavras destacadas com `text-primary`).
 * Idempotente: o StrictMode executa os efeitos duas vezes em desenvolvimento.
 */
function splitWords(el: HTMLElement) {
  if (el.dataset.split !== 'done') {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
    const nodes: Text[] = []
    while (walker.nextNode()) {
      const node = walker.currentNode as Text
      if (node.nodeValue?.trim()) nodes.push(node)
    }

    nodes.forEach((node) => {
      const fragment = document.createDocumentFragment()
      node.nodeValue!.split(/(\s+)/).forEach((part) => {
        if (!part.trim()) {
          fragment.appendChild(document.createTextNode(part))
          return
        }
        const mask = document.createElement('span')
        mask.className = 'word-mask'
        const inner = document.createElement('span')
        inner.className = 'word-mask__inner'
        inner.textContent = part
        mask.appendChild(inner)
        fragment.appendChild(mask)
      })
      node.parentNode!.replaceChild(fragment, node)
    })

    el.dataset.split = 'done'
  }

  return el.querySelectorAll<HTMLElement>('.word-mask__inner')
}

/**
 * Animações de rolagem da página. Marque os elementos com:
 * - `.scroll-bg` + `section[data-scroll-bg]`: fundo fixo que troca de cor entre as seções
 * - `data-split-title`: título revelado palavra por palavra
 * - `data-poster`: título que cresce ao entrar na tela
 * - `data-reveal`: elementos que surgem de baixo em cascata
 * - `data-parallax`: imagem com leve parallax dentro de um container com overflow oculto
 * - `data-progress`: barra que se preenche ao entrar na tela
 */
export function useScrollAnimations<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const html = document.documentElement

    const ctx = gsap.context(() => {
      const scrollBg = root.querySelector<HTMLElement>('.scroll-bg')
      const bgSections = [...root.querySelectorAll<HTMLElement>('section[data-scroll-bg]')]
      if (scrollBg && bgSections.length) {
        // Lê as cores antes de `has-scroll-bg` deixar as seções transparentes.
        const colors = bgSections.map((section) => toRgba(getComputedStyle(section).backgroundColor))
        html.classList.add('has-scroll-bg')
        gsap.set(scrollBg, { backgroundColor: colors[0] })
        for (let i = 1; i < bgSections.length; i++) {
          if (colors[i] === colors[i - 1]) continue
          gsap.fromTo(
            scrollBg,
            { backgroundColor: colors[i - 1] },
            {
              backgroundColor: colors[i],
              ease: 'none',
              immediateRender: false,
              scrollTrigger: { trigger: bgSections[i], start: BG_START, end: BG_END, scrub: true },
            },
          )
        }
      }

      if (reduceMotion) return

      // Conteúdo dentro do SectionFlow fica fixo na tela e é animado pela transição dele.
      const animated = (selector: string) =>
        [...root.querySelectorAll<HTMLElement>(selector)].filter((el) => !el.closest('[data-sf-layer]'))

      animated('[data-split-title]').forEach((title) => {
        const words = splitWords(title)
        if (!words.length) return
        gsap.fromTo(
          words,
          { yPercent: 115 },
          {
            yPercent: 0,
            ease: 'none',
            stagger: 0.12,
            scrollTrigger: { trigger: title, start: 'top 80%', end: 'top 50%', scrub: true },
          },
        )
      })

      animated('[data-poster]').forEach((poster) => {
        gsap.fromTo(
          poster,
          { scale: 0.72, opacity: 0.3 },
          {
            scale: 1,
            opacity: 1,
            ease: 'none',
            scrollTrigger: { trigger: poster, start: 'top 95%', end: 'top 45%', scrub: true },
          },
        )
      })

      animated('[data-parallax]').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: 'none',
            scrollTrigger: { trigger: img.parentElement ?? img, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })

      animated('[data-progress]').forEach((bar) => {
        gsap.fromTo(
          bar,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: { trigger: bar, start: 'top 90%', toggleActions: 'play none none reverse' },
          },
        )
      })

      // Cada seção forma um grupo próprio, para a cascata não misturar elementos de seções diferentes.
      const revealGroups = new Map<Element, HTMLElement[]>()
      animated('[data-reveal]').forEach((el) => {
        const key = el.closest('section, footer') ?? root
        revealGroups.set(key, [...(revealGroups.get(key) ?? []), el])
      })
      revealGroups.forEach((items) => {
        gsap.set(items, { opacity: 0, y: 48 })
        ScrollTrigger.batch(items, {
          start: 'top 92%',
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.09, overwrite: true }),
          onLeaveBack: (batch) =>
            gsap.to(batch, { opacity: 0, y: 48, duration: 0.4, ease: 'power2.in', overwrite: true }),
        })
      })
    }, root)

    // Imagens carregando alteram a altura da página; recalcula os gatilhos.
    let timer = 0
    const refresh = () => ScrollTrigger.refresh()
    const observer = new ResizeObserver(() => {
      window.clearTimeout(timer)
      timer = window.setTimeout(refresh, 150)
    })
    observer.observe(root)
    window.addEventListener('load', refresh)

    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
      window.removeEventListener('load', refresh)
      ctx.revert()
      html.classList.remove('has-scroll-bg')
    }
  }, [])

  return ref
}
