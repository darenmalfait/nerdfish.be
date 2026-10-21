import { useEffect } from 'react'
import { z } from 'zod'
import { en, nl } from 'zod/v4/locales'

export async function loadZodLocale(locale_: string) {
	try {
		if (locale_ === 'nl') {
			return z.config(nl())
		}

		return z.config(en())
	} catch (error) {
		console.error('Failed to load Zod locale', locale_, error)
	}
}

export function useZodLocale(locale_: string) {
	useEffect(() => {
		void loadZodLocale(locale_)
	}, [locale_])
}
