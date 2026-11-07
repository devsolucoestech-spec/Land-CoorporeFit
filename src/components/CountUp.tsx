import { useEffect, useRef, useState } from 'react'

type CountUpProps = {
  to: number
  duration?: number
  prefix?: string
  suffix?: string
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

export function CountUp({ to, duration = 2400, prefix = '', suffix = '' }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      setValue(Math.round(to * easeOutCubic(progress)))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [visible, to, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {value.toLocaleString('pt-BR')}
      {suffix}
    </span>
  )
}
