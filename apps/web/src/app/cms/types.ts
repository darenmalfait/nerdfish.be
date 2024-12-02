import { type Locale } from '~/app/i18n/types'
import {
	type PageBlocks,
	type Product,
	type Wiki,
} from '~/tina/__generated__/types'
export type * from '~/tina/__generated__/types'

export type Image = {
	src: string
	alt: string
}

export type Block<T extends PageBlocks = any> = T & {
	locale?: Locale
	globalData?: {
		wikis?: Partial<Wiki>[]
		products?: Partial<Product>[]
	}
}
