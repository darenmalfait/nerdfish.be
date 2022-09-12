import { MoonIcon, SunIcon } from '@heroicons/react/solid'
import * as React from 'react'

import { Theme, useTheme } from '~/context/theme-provider'

function ThemeToggle() {
  const [theme, setTheme] = useTheme()
  const isDarkMode = theme === 'dark'

  return (
    <button
      type="button"
      className="flex justify-center items-center p-2 rounded-full focus-ring"
      onClick={() =>
        setTheme(prev => (prev === Theme.DARK ? Theme.LIGHT : Theme.DARK))
      }
    >
      {isDarkMode ? <SunIcon className="w-5" /> : <MoonIcon className="w-5" />}
      <div className="sr-only">{isDarkMode ? `Light` : `Dark`} Mode</div>
    </button>
  )
}

export { ThemeToggle }
