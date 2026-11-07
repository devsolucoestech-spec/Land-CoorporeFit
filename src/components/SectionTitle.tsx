import type { ReactNode } from 'react'

type SectionTitleProps = {
  title: ReactNode
  action?: ReactNode
}

export function SectionTitle({ title, action }: SectionTitleProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-6">
      <h2 data-split-title className="site-h2 max-w-2xl">
        {title}
      </h2>
      {action && <div data-reveal>{action}</div>}
    </div>
  )
}
