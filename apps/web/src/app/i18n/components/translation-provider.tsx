'use client'

import * as React from 'react'
import type { Dictionary } from '../get-dictionary'
import type { Locale } from '../i18n-config'

interface TranslationContextProps {
	t: (key: keyof Dictionary) => string
	currentLocale: Locale
}

const TranslationContext = React.createContext<TranslationContextProps | null>(
	null
)
TranslationContext.displayName = 'TranslationContext'

interface TranslationProviderProps {
	children: React.ReactNode
	dictionary: Dictionary
	currentLocale: Locale
}

// import { TranslationProvider } from "path-to-context/TranslationContext"
// use <TranslationProvider> as a wrapper around the part you need the context for
function TranslationProvider({
	children,
	dictionary,
	currentLocale,
}: TranslationProviderProps) {
	const t = React.useCallback(
		(key: keyof Dictionary) => {
			return dictionary[key]
		},
		[dictionary]
	)

	return (
		<TranslationContext.Provider
			value={React.useMemo(() => ({ t, currentLocale }), [t, currentLocale])}
		>
			{children}
		</TranslationContext.Provider>
	)
}

// import { useTranslation } fron "path-to-context/TranslationContext"
// within functional component
// const { sessionToken, ...TranslationContext } = useTranslation()
function useTranslation(): TranslationContextProps {
	const context = React.useContext(TranslationContext)

	if (!context) {
		throw new Error(
			'You should use useTranslation within an TranslationContext'
		)
	}

	return context
}

export { TranslationProvider, useTranslation }
