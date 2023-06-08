import {Blog, Product, Wiki} from '~/tina/__generated__/types'

type Image = {
  src: string
  alt: string
}

type Block = {
  _typename?: string
  globalData?: {
    wikis?: Partial<Wiki>[]
    blogs?: Partial<Blog>[]
    products?: Partial<Product>[]
  }
}

export type {Image, Block}
