import type { PageBlocks, Product, Wiki } from '~/tina/__generated__/types'
import type { Locale } from '../i18n'

export type Image = {
	src: string
	alt: string
}

// biome-ignore lint/suspicious/noExplicitAny: unsure how we type this
export type Block<T extends PageBlocks = any> = T & {
	locale?: Locale
	globalData?: {
		wikis?: Partial<Wiki>[]
		products?: Partial<Product>[]
	}
}
