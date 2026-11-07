import { Plus } from 'lucide-react'
import { useId, useState } from 'react'

type AccordionItem = { question: string; answer: string }

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0)
  const baseId = useId()

  return (
    <div className="border-t border-border">
      {items.map((item, i) => {
        const isOpen = open === i
        const buttonId = `${baseId}-q${i}`
        const panelId = `${baseId}-a${i}`
        return (
          <div key={item.question} data-reveal className="border-b border-border">
            <h3 className="font-sans normal-case">
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center gap-5 py-6 text-left"
              >
                <span className="font-display text-sm font-bold text-primary">{String(i + 1).padStart(2, '0')}</span>
                <span
                  className={`flex-1 text-base font-semibold transition-colors md:text-lg ${
                    isOpen ? 'text-foreground' : 'text-foreground/85 group-hover:text-foreground'
                  }`}
                >
                  {item.question}
                </span>
                <span
                  className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                    isOpen
                      ? 'rotate-45 border-primary bg-primary text-primary-foreground'
                      : 'border-border group-hover:border-primary group-hover:text-primary'
                  }`}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <p className="pr-14 pb-6 pl-10 text-muted-foreground">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
