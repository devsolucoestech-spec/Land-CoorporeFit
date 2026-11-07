import type { ReactNode } from 'react'

type SectionTitleProps = {
  title: ReactNode
  sub?: ReactNode
  action?: ReactNode
  align?: 'left' | 'center'
}

export function SectionTitle({ title, sub, action, align = 'left' }: SectionTitleProps) {
  const centered = align === 'center'
  return (
    <div
      className={`flex flex-wrap gap-6 ${centered ? 'flex-col items-center text-center' : 'items-end justify-between'}`}
    >
      <div className={centered ? 'max-w-3xl' : 'max-w-2xl'}>
        <h2 data-split-title className="site-h2">
          {title}
        </h2>
        {sub && (
          <p data-reveal className={`mt-5 max-w-xl text-muted-foreground md:text-lg ${centered ? 'mx-auto' : ''}`}>
            {sub}
          </p>
        )}
      </div>
      {action && <div data-reveal>{action}</div>}
    </div>
  )
}
