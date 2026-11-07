import logoEmblem from '../assets/logo-emblema.webp'
import logoFull from '../assets/logo.webp'

type LogoProps = {
  variant?: 'header' | 'full'
}

export function Logo({ variant = 'header' }: LogoProps) {
  if (variant === 'full') {
    return (
      <a href="#inicio" aria-label="Corpore Fit Academia – início" className="inline-block shrink-0">
        <img
          src={logoFull}
          alt="Corpore Fit Academia"
          width={373}
          height={336}
          loading="lazy"
          className="h-28 w-auto max-w-none object-contain"
        />
      </a>
    )
  }

  return (
    <a
      href="#inicio"
      aria-label="Corpore Fit – início"
      className="flex min-h-11 shrink-0 items-center gap-2 font-display text-lg font-bold whitespace-nowrap uppercase lg:gap-2.5 lg:text-xl"
    >
      <img src={logoEmblem} alt="" width={208} height={192} className="h-10 w-auto lg:h-14" />
      <span>
        Corpore <span className="text-primary">Fit</span>
      </span>
    </a>
  )
}
