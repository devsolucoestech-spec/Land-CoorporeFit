import { Camera } from 'lucide-react'

type PhotoPlaceholderProps = {
  label: string
  note?: string
  className?: string
}

/** Espaço reservado para fotos reais que ainda não foram enviadas. */
export function PhotoPlaceholder({ label, note = 'Foto em breve', className = '' }: PhotoPlaceholderProps) {
  return (
    <div
      className={`relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-md border border-border bg-card p-3 text-center sm:p-4 md:gap-3 md:p-6 ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent_0_14px,rgb(255_255_255/0.025)_14px_15px)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_110%,rgb(71_0_0/0.7),transparent)]"
      />
      <Camera aria-hidden="true" className="relative h-5 w-5 shrink-0 text-primary md:h-6 md:w-6" />
      <p className="relative font-display text-base leading-tight font-bold tracking-wide uppercase sm:text-lg md:text-xl">
        {label}
      </p>
      <p className="relative text-[10px] tracking-[0.18em] whitespace-nowrap text-muted-foreground uppercase md:text-[11px] md:tracking-[0.25em]">
        {note}
      </p>
    </div>
  )
}
