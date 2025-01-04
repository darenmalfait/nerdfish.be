'use client'

import { type Testimonial } from 'content-collections'
import * as React from 'react'

type GlobalContextProps = {
	testimonials?: Testimonial[]
}

const GlobalProviderContext = React.createContext<GlobalContextProps | null>(
	null,
)
GlobalProviderContext.displayName = 'GlobalProviderContext'

interface GlobalProviderProps {
	testimonials?: Testimonial[]
	children: React.ReactNode
}

// import { GlobalProvider } from "path-to-context/GlobalProviderContext"
// use <GlobalProviderProvider> as a wrapper around the part you need the context for
function GlobalProvider({ children, ...globalProps }: GlobalProviderProps) {
	return (
		<GlobalProviderContext value={{ ...globalProps }}>
			{children}
		</GlobalProviderContext>
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
