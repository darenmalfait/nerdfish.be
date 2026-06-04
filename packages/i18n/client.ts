import { useLocale as useUntypedLocale } from 'next-intl'
import { type Locale } from './types'
export * from 'next-intl'

// eslint-disable-next-line @nerdfish/conventions/no-unnecessary-use-prefix
export function useLocale() {
	return useUntypedLocale() as Locale
}
