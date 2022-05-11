import { Switch } from '@headlessui/react'
import clsx from 'clsx'

import { useControllableState } from '~/hooks/use-controllable-state'

interface ToggleProps {
  disabled?: boolean
  id: string
  onChange?(): void
  value?: boolean
}

function Toggle({ disabled, id, onChange, value }: ToggleProps) {
  const [enabled, setEnabled] = useControllableState(value, false, onChange)

  return (
    <button onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}>
      <Switch
        id={id}
        disabled={disabled}
        checked={enabled}
        onChange={setEnabled}
        className={clsx(
          enabled ? 'bg-green-300' : 'bg-gray-200',
          'inline-flex relative shrink-0 w-11 h-6 rounded-full border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ease-in-out cursor-pointer focus:ring-primary',
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          className={clsx(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'inline-block relative w-5 h-5 bg-white rounded-full ring-0 shadow transition duration-200 ease-in-out pointer-events-none',
          )}
        >
          <span
            className={clsx(
              enabled
                ? 'opacity-0 duration-100 ease-out'
                : 'opacity-100 duration-200 ease-in',
              'flex absolute inset-0 justify-center items-center w-full h-full transition-opacity',
            )}
            aria-hidden="true"
          >
            <svg
              className="w-3 h-3 text-gray-400"
              fill="none"
              viewBox="0 0 12 12"
            >
              <path
                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span
            className={clsx(
              enabled
                ? 'opacity-100 duration-200 ease-in'
                : 'opacity-0 duration-100 ease-out',
              'flex absolute inset-0 justify-center items-center w-full h-full transition-opacity',
            )}
            aria-hidden="true"
          >
            <svg
              className="w-3 h-3 text-indigo-600"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
            </svg>
          </span>
        </span>
      </Switch>
    </button>
  )
}

export { Toggle }
