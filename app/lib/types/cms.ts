import type {Blog, Wiki} from '.tina/__generated__/types'

type Image = {
  src: string
  alt: string
}

type Block = {
  parentField: string
}

type BlogType = Partial<Omit<Blog, '_values'>>
type WikiType = Omit<Wiki, '_values'>

export type {Image, Block, BlogType, WikiType}
