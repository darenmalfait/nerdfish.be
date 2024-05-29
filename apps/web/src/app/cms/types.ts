import {
  type Blog,
  type PageBlocks,
  type Product,
  type Wiki,
} from '~/tina/__generated__/types'

export type Image = {
  src: string
  alt: string
}

export type Block<T extends PageBlocks = PageBlocks> = T & {
  globalData?: {
    wikis?: Partial<Wiki>[]
    blogs?: Partial<Blog>[]
    products?: Partial<Product>[]
  }
}
