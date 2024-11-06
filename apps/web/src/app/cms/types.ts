import { type Locale } from '../i18n'
import {
	type PageBlocks,
	type Product,
	type Wiki,
	type Work,
} from '~/tina/__generated__/types'

export type Image = {
	src: string
	alt: string
}

export type Block<T extends PageBlocks = any> = T & {
	locale?: Locale
	globalData?: {
		wikis?: Partial<Wiki>[]
		products?: Partial<Product>[]
		works?: Partial<Work>[]
	}
}
