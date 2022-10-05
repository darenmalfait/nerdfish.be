import { Listbox as HeadlessListbox } from '@headlessui/react'
import { CheckIcon, ArrowsUpDownIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

import { Button } from '~/components/buttons'

export function Options({
  children,
  className,
  openAbove,
}: {
  children: React.ReactNode
  className?: string
  openAbove?: boolean
}) {
  return (
    <HeadlessListbox.Options
      className={clsx(
        'overflow-auto absolute left-1/2 z-40 py-1 px-0 mt-1 w-auto min-w-full max-h-60 text-base bg-white rounded-md outline-none shadow-lg -translate-x-1/2 sm:text-sm',
        {
          'bottom-full': openAbove,
        },
        className,
      )}
    >
      {children}
    </HeadlessListbox.Options>
  )
}

type OptionProps = React.ComponentPropsWithRef<
  typeof HeadlessListbox.Option
> & {
  value: any
  children: React.ReactNode
  className?: string
}

function Option({ children, value, className, ...props }: OptionProps) {
  return (
    <HeadlessListbox.Option
      className={clsx('before:hidden p-0 m-0 text-primary', className)}
      value={value}
      {...props}
    >
      {({ selected, active }) => (
        <div
          className={clsx(
            'relative py-2 pr-4 pl-10 my-0 text-base cursor-default select-none sm:text-base',
            {
              'bg-primary-600': active,
            },
          )}
        >
          <span>{children}</span>

          {selected ? (
            <div
              className="flex absolute inset-y-0 left-0 items-center pl-3"
              aria-hidden="true"
            >
              <CheckIcon className="w-5 h-5" aria-hidden="true" />
            </div>
          ) : null}
        </div>
      )}
    </HeadlessListbox.Option>
  )
}

interface ButtonProps {
  Icon?(props: React.SVGProps<SVGSVGElement>): JSX.Element
  children?: React.ReactNode
}

function ListboxButton({
  children,
  Icon = ArrowsUpDownIcon,
  ...props
}: ButtonProps) {
  return (
    <HeadlessListbox.Button>
      <Button {...props} variant="secondary">
        <div className="flex relative text-left">
          {children}
          <span className="flex items-center pl-2 pointer-events-none">
            <Icon className="w-6 h-6" aria-hidden="true" />
          </span>
        </div>
      </Button>
    </HeadlessListbox.Button>
  )
}

type ListboxProps = {
  [key in keyof typeof HeadlessListbox]?: typeof HeadlessListbox[key]
} & {
  children: React.ReactNode
  onChange: (value: any) => void
  value?: any
}

function Listbox({ value, onChange, children, ...props }: ListboxProps) {
  return (
    <div className="relative w-full">
      <HeadlessListbox {...props} value={value} onChange={onChange}>
        {children}
      </HeadlessListbox>
    </div>
  )
}

Listbox.Button = ListboxButton
Listbox.Option = Option
Listbox.Options = Options

export { Listbox }
