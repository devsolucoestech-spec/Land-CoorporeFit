import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

const mobile = () => window.matchMedia('(max-width: 767px)').matches

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const farEnough = y > window.innerHeight * 1.5
      // No celular só aparece ao rolar para cima, para não cobrir botões de largura total.
      setVisible(farEnough && (!mobile() || y < lastY))
      lastY = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label="Voltar ao topo"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 grid h-12 w-12 place-items-center rounded-full border border-primary/60 bg-background/90 text-foreground shadow-[0_10px_30px_-10px_var(--primary)] backdrop-blur transition-all duration-300 hover:bg-primary hover:text-primary-foreground md:right-5 md:bottom-5 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
