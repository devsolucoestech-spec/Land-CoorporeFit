import logoEmblem from '../assets/logo-emblema.png'
import logoFull from '../assets/logo.png'

type LogoProps = {
  variant?: 'header' | 'full'
}

export function Logo({ variant = 'header' }: LogoProps) {
  if (variant === 'full') {
    return (
      <a href="#inicio" className="inline-block">
        <img src={logoFull} alt="Corpore Fit Academia" width={1039} height={936} className="h-28 w-auto" />
      </a>
    )
  }

  return (
    <a href="#inicio" className="flex items-center gap-2.5 font-display text-xl font-bold uppercase">
      <img src={logoEmblem} alt="" width={822} height={759} className="h-12 w-auto" />
      <span>
        Corpore <span className="text-primary">Fit</span>
      </span>
    </a>
  )
}
