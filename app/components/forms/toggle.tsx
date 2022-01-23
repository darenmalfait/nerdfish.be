import { Switch } from '@headlessui/react'
import clsx from 'clsx'

import * as React from 'react'

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
          'inline-flex relative shrink-0 w-[50px] h-[30px] rounded-full border-2 border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:opacity-75 transition-colors duration-200 ease-in-out cursor-pointer',
          {
            'bg-green-400': enabled,
            'bg-gray-300': !enabled,
          },
        )}
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={clsx(
            'inline-block w-[25px] h-[25px] bg-white rounded-full ring-0 shadow-lg transition duration-200 ease-in-out pointer-events-none',
            {
              'translate-x-5': enabled,
              'translate-x-0': !enabled,
            },
          )}
        />
      </Switch>
    </button>
  )
}

export { Toggle }
