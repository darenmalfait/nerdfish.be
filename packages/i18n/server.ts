export * from 'next-intl/server'
import { getLocale as untypedGetLocale } from 'next-intl/server'

import { type Locale } from './types'

export function getLocale() {
	return untypedGetLocale() as Promise<Locale>
}
