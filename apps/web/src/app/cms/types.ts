import { type PageBlocks, type Product } from '~/tina/__generated__/types'
export type * from '~/tina/__generated__/types'

export type Image = {
	src: string
	alt: string
}

export type Block<T extends PageBlocks = any> = T & {
	globalData?: {
		products?: Partial<Product>[]
	}
}
