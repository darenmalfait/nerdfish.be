'use client'

import { useLocale } from '@repo/i18n/client'
import { type Testimonial } from 'content-collections'
import * as React from 'react'
import { BlogPath } from './[locale]/blog/utils'
import { ContactPath } from './[locale]/contact/utils'
import { WikiPath } from './[locale]/wiki/utils'
import { WorkPath } from './[locale]/work/utils'
import { type Global } from './cms/types'

type GlobalContextProps = Partial<Global> & {
	testimonials?: Testimonial[]
	paths: {
		blog: string
		work: string
		contact: string
		wiki: string
	}
}

const GlobalProviderContext = React.createContext<GlobalContextProps | null>(
	null,
)
GlobalProviderContext.displayName = 'GlobalProviderContext'

interface GlobalProviderProps extends Partial<Global> {
	testimonials?: Testimonial[]
	children: React.ReactNode
}

// import { GlobalProvider } from "path-to-context/GlobalProviderContext"
// use <GlobalProviderProvider> as a wrapper around the part you need the context for
function GlobalProvider({ children, ...globalProps }: GlobalProviderProps) {
	const locale = useLocale()

	const paths = {
		blog: BlogPath[locale],
		work: WorkPath[locale],
		contact: ContactPath[locale],
		wiki: WikiPath[locale],
	}

	return (
		<GlobalProviderContext value={{ ...globalProps, paths }}>
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
