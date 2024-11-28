import type { i18n } from './config'

export type Locale = (typeof i18n)['locales'][number]

export type WithLocale<T> = T & { locale: Locale }
