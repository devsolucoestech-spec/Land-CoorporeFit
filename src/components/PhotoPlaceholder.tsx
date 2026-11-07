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
      className={`relative flex flex-col items-center justify-center gap-3 overflow-hidden rounded-md border border-border bg-card p-6 text-center ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent_0_14px,rgb(255_255_255/0.025)_14px_15px)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(90%_70%_at_50%_110%,rgb(71_0_0/0.7),transparent)]"
      />
      <Camera aria-hidden="true" className="relative h-6 w-6 text-primary" />
      <p className="relative font-display text-lg font-bold tracking-wide uppercase md:text-xl">{label}</p>
      <p className="relative text-[11px] tracking-[0.25em] text-muted-foreground uppercase">{note}</p>
    </div>
  )
}
