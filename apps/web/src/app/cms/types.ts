import {
	type Blog,
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
	globalData?: {
		wikis?: Partial<Wiki>[]
		blogs?: Partial<Blog>[]
		products?: Partial<Product>[]
		works?: Partial<Work>[]
	}
}
