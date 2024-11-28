'use client'

import { stripPreSlash } from '@repo/lib/utils'
import * as React from 'react'
import type { Global, GlobalPaths } from './cms/types'

type GlobalContextProps = Partial<Global>

const GlobalProviderContext = React.createContext<GlobalContextProps | null>(
	null
)
GlobalProviderContext.displayName = 'GlobalProviderContext'

interface GlobalProviderProps extends Partial<Global> {
	children: React.ReactNode
}

// import { GlobalProvider } from "path-to-context/GlobalProviderContext"
// use <GlobalProviderProvider> as a wrapper around the part you need the context for
function GlobalProvider({ children, ...globalProps }: GlobalProviderProps) {
	const { paths: originalPaths, ...rest } = globalProps

	const paths = React.useMemo(() => {
		if (!originalPaths) return undefined
		return Object.keys(originalPaths).reduce<GlobalPaths>((acc, key) => {
			const path = originalPaths[key as keyof GlobalPaths] ?? ''

			if (typeof path === 'object') return acc

			const isExternal = path.startsWith('http')

			return Object.assign(acc, {
				[key]: isExternal ? path : `/${stripPreSlash(path)}`,
			})
		}, {})
	}, [originalPaths])

	return (
		<GlobalProviderContext.Provider value={{ paths, ...rest }}>
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
