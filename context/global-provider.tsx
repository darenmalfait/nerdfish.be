import * as React from 'react'

import type { Global, GlobalPaths } from '../.tina/__generated__/types'
import { stripPreSlash } from '../lib/utils/string'

interface GlobalContextProps {
  paths?: Global['paths']
  navigation: Global['navigation']
  social?: Global['social']
}

const GlobalProviderContext = React.createContext<GlobalContextProps | null>(
  null,
)
GlobalProviderContext.displayName = 'GlobalProviderContext'

interface GlobalProviderProps extends Partial<Global> {
  children: React.ReactNode
}

// import { GlobalProvider } from "path-to-context/GlobalProviderContext"
// use <GlobalProviderProvider> as a wrapper around the part you need the context for
function GlobalProvider({ children, ...globalProps }: GlobalProviderProps) {
  const { navigation, paths: originalPaths, social } = globalProps

  const paths = React.useMemo(() => {
    if (!originalPaths) return undefined
    return Object.keys(originalPaths).reduce((acc, key) => {
      const path = originalPaths[key as keyof GlobalPaths] ?? ''

      const isExternal = path.startsWith('http')

      return {
        ...acc,
        [key]: isExternal ? path : `/${stripPreSlash(path)}`,
      }
    }, {} as GlobalPaths)
  }, [originalPaths])

  return (
    <GlobalProviderContext.Provider value={{ paths, navigation, social }}>
      {children}
    </GlobalProviderContext.Provider>
  )
}

// import { useGlobal } fron "path-to-context/GlobalProviderContext"
// within functional component
// const { sessionToken, ...GlobalProviderContext } = useGlobal()
function useGlobal(): GlobalContextProps {
  const context = React.useContext(GlobalProviderContext)

  if (!context) {
    throw new Error('You should use useGlobal within an GlobalProviderContext')
  }

  return context
}

export { GlobalProvider, useGlobal }
