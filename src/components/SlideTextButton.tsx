/**
 * Adaptado de "Slide Text Button" (KokonutUI) para a identidade da Corpore Fit.
 * @author: @kokonut-labs
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'outline' | 'dark' | 'light' | 'white'
type Size = 'md' | 'lg'

type SlideTextButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> & {
  text: string
  /** Texto que entra por baixo no hover. Sem ele, o próprio texto se repete. */
  hoverText?: string
  icon?: ReactNode
  variant?: Variant
  size?: Size
  /** Abre em nova aba com rel seguro (WhatsApp, Instagram). */
  external?: boolean
}

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-primary text-primary-foreground hover:bg-primary-hover hover:shadow-[0_12px_28px_-10px_var(--primary)]',
  ghost: 'border border-white/20 text-white hover:border-primary hover:bg-primary/10',
  outline:
    'border border-foreground/80 text-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground',
  dark: 'bg-background text-white hover:bg-card hover:shadow-[0_12px_28px_-10px_var(--cf-black)]',
  light: 'border border-white/60 text-white hover:border-white hover:bg-white/10',
  white: 'bg-white text-primary hover:bg-white/90 hover:shadow-[0_12px_28px_-10px_rgb(8_8_8/0.6)]',
}

const SIZES: Record<Size, string> = {
  md: 'h-11 px-6 text-xs',
  lg: 'h-14 px-8 text-sm md:min-w-56',
}

export function SlideTextButton({
  text,
  hoverText,
  icon,
  variant = 'primary',
  size = 'lg',
  external,
  className = '',
  ...props
}: SlideTextButtonProps) {
  const label = (content: string) => (
    <>
      {icon}
      <span>{content}</span>
    </>
  )

  return (
    <a
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      {...props}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-lg font-semibold tracking-wide uppercase transition-[background-color,border-color,color,box-shadow,scale] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] motion-reduce:active:scale-100 ${SIZES[size]} ${VARIANTS[variant]} ${className}`}
    >
      {/* Os dois textos dividem a mesma célula: o mais largo define a largura e o do hover espera uma linha abaixo. */}
      <span className="grid justify-items-center transition-transform duration-200 ease-[cubic-bezier(0.77,0,0.175,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none">
        <span className="col-start-1 row-start-1 flex items-center gap-2 transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0">
          {label(text)}
        </span>
        <span
          aria-hidden="true"
          className="col-start-1 row-start-1 flex translate-y-full items-center gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          {label(hoverText ?? text)}
        </span>
      </span>
    </a>
  )
}
