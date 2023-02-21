import * as React from 'react'
import {cx} from '@daren/ui-components'
import {MoonIcon, SunIcon} from '@heroicons/react/24/solid'

import {Theme, useTheme} from '~/context/theme-provider'

function ThemeToggle({
  className,
  ...props
}: Omit<JSX.IntrinsicElements['button'], 'onCliick'>) {
  const [theme, setTheme] = useTheme()
  const isDarkMode = theme === Theme.DARK

  return (
    <button
      type="button"
      {...props}
      className={cx(
        'flex items-center justify-center rounded-full p-2 focus-ring',
        className,
      )}
      onClick={() =>
        setTheme(prev => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK))
      }
    >
      {isDarkMode ? <SunIcon className="w-5" /> : <MoonIcon className="w-5" />}
      <div className="sr-only">{isDarkMode ? `Light` : `Dark`} Mode</div>
    </button>
  )
}

export {ThemeToggle}
