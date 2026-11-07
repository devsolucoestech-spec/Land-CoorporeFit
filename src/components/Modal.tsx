import { X } from 'lucide-react'
import { useEffect, useRef, type ReactNode } from 'react'

type ModalProps = {
  open: boolean
  onClose: () => void
  label: string
  children: ReactNode
  className?: string
}

/** Modal acessível sobre o <dialog> nativo: Esc, foco preso e clique fora para fechar. */
export function Modal({ open, onClose, label, children, className = '' }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose()
      }}
      className={`m-auto max-h-[92vh] max-w-[min(1100px,94vw)] overflow-visible bg-transparent p-0 text-foreground backdrop:bg-background/90 backdrop:backdrop-blur-sm ${className}`}
    >
      {open && children}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="fixed top-4 right-4 grid h-11 w-11 place-items-center rounded-full border border-border bg-background/80 transition-colors hover:border-primary hover:text-primary"
      >
        <X className="h-5 w-5" />
      </button>
    </dialog>
  )
}
