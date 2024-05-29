import {type Blog, type Product, type Wiki} from '~/tina/__generated__/types'

export type Image = {
  src: string
  alt: string
}

export type Block = {
  _typename?: string
  globalData?: {
    wikis?: Partial<Wiki>[]
    blogs?: Partial<Blog>[]
    products?: Partial<Product>[]
  }
}
