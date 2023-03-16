import * as React from 'react'
import {cx} from '@nerdfish/utils'
import {Moon, Sun} from 'lucide-react'

import {useTheme} from '~/context/theme-provider'

function ThemeToggle({
  className,
  ...props
}: Omit<JSX.IntrinsicElements['button'], 'onCliick'>) {
  const [mounted, setMounted] = React.useState(false)
  const {theme, setTheme, systemTheme} = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDarkMode =
    theme === 'dark' || (theme === 'system' && systemTheme === 'dark')

  return (
    <button
      type="button"
      {...props}
      className={cx(
        'flex items-center justify-center rounded-full p-2 focus-ring',
        className,
      )}
      onClick={() => setTheme(isDarkMode ? 'light' : 'dark')}
    >
      {isDarkMode ? <Sun className="w-5" /> : <Moon className="w-5" />}
      <div className="sr-only">{isDarkMode ? `Light` : `Dark`} Mode</div>
    </button>
  )
}

export {ThemeToggle}
