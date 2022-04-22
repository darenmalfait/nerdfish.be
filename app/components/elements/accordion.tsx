import clsx from 'clsx'
import { m } from 'framer-motion'
import * as React from 'react'

const accordionAnim = {
  open: {
    opacity: 1,
    height: 'auto',
  },
  closed: {
    opacity: 0,
    height: 0,
  },
}

interface AccordionProps {
  items: {
    message?: string | React.ReactNode
    title: React.ReactNode
  }[]
}

function Accordion({ items }: AccordionProps) {
  const [activeAccordion, setActiveAccordion] = React.useState<number | null>(
    null,
  )

  const onToggle = React.useCallback((id: number, isOpen: boolean) => {
    setActiveAccordion(isOpen ? id : null)
  }, [])

  return (
    <div className="space-y-2">
      {items.map((accordion, key) => {
        return (
          <AccordionItem
            key={key}
            id={key}
            isOpen={key === activeAccordion}
            onToggle={onToggle}
            message={accordion.message}
            title={accordion.title}
          />
        )
      })}
    </div>
  )
}

interface AccordionItemProps {
  id: string | number
  isOpen?: boolean
  message?: string | React.ReactNode
  title?: React.ReactNode
  onToggle(id: string | number, isOpen: boolean): void
}

const AccordionItem = React.memo(function AccordionItem({
  id,
  isOpen,
  title,
  onToggle,
  message,
}: AccordionItemProps) {
  function handleToggle() {
    onToggle(id, !isOpen)
  }

  return (
    <div className="border-t">
      <button
        className="flex justify-between items-center py-4 px-0 w-full text-lg font-semibold text-left no-underline bg-transparent appearance-none cursor-pointer outline-none!"
        onClick={handleToggle}
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-controls={`accordion-${id}`}
      >
        {title}
        <div
          className={clsx('block relative shrink-0 ml-8 w-3 h-3 ease-in-out', {
            'rotate-45': isOpen,
          })}
        >
          <div className="block absolute inset-x-0 top-1/2 w-full h-px bg-current -translate-y-1/2" />
          <div className="block absolute inset-x-0 top-1/2 w-full h-px bg-current rotate-90 -translate-y-1/2" />
        </div>
      </button>

      <m.div
        className="overflow-hidden prose prose-sm"
        id={`accordion-${id}`}
        initial={isOpen ? 'open' : 'closed'}
        animate={isOpen ? 'open' : 'closed'}
        variants={accordionAnim}
        transition={{ duration: 0.5, ease: [0.19, 1.0, 0.22, 1.0] }}
      >
        <div className="pb-12 m-0 max-w-2xl text-primary">
          <span>{message}</span>
        </div>
      </m.div>
    </div>
  )
})

export { Accordion }
