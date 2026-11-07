import logoEmblem from '../assets/logo-emblema.webp'
import logoFull from '../assets/logo.webp'

type LogoProps = {
  variant?: 'header' | 'full'
}

export function Logo({ variant = 'header' }: LogoProps) {
  if (variant === 'full') {
    return (
      <a href="#inicio" aria-label="Corpore Fit Academia – início" className="inline-block">
        <img src={logoFull} alt="Corpore Fit Academia" width={373} height={336} loading="lazy" className="h-28 w-auto" />
      </a>
    )
  }

  return (
    <a
      href="#inicio"
      aria-label="Corpore Fit – início"
      className="flex items-center gap-2.5 font-display text-xl font-bold uppercase"
    >
      <img src={logoEmblem} alt="" width={208} height={192} className="h-14 w-auto" />
      <span>
        Corpore <span className="text-primary">Fit</span>
      </span>
    </a>
  )
}
