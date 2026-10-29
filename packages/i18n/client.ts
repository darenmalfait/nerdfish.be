import { useLocale as useUntypedLocale } from 'next-intl'
import { type Locale } from './types'
export * from 'next-intl'

export function useLocale() {
	return useUntypedLocale() as Locale
}
