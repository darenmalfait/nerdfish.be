import { AboutBlock } from '../sections/about-block'
import { BigtitleBlock } from '../sections/big-title-block'
import { CarouselBlock } from '../sections/carousel-block'
import { FeaturesBlock } from '../sections/features-block'
import { GalleryBlock } from '../sections/gallery-block'
import { HeroBlock } from '../sections/hero-block'
import { KeywordlistBlock } from '../sections/keyword-list-block'
import { LongcopyBlock } from '../sections/longcopy-block'
import { PostsBlock } from '../sections/posts-block'

import { Placeholder } from '~/components/layout'

// [key] is the name of the module in sanity
const components = {
  featuresBlock: FeaturesBlock,
  aboutBlock: AboutBlock,
  keywordListBlock: KeywordlistBlock,
  bigTitleBlock: BigtitleBlock,
  carouselBlock: CarouselBlock,
  postsBlock: PostsBlock,
  heroBlock: HeroBlock,
  placeholderBlock: Placeholder,
  longcopyBlock: LongcopyBlock,
  galleryBlock: GalleryBlock,
}

type PropsOf<T> = T extends React.ComponentType<infer Props> ? Props : never

type PageBlockProps<T> = {
  _type: T
}

function PageBlock<T extends keyof typeof components>({
  _type: type,
  ...props
}: PageBlockProps<T> & PropsOf<typeof components[T]>) {
  if (typeof components[type] !== 'undefined') {
    const Component = components[type]

    return <Component {...(props as any)} />
  }

  return <Placeholder componentName={type} />
}

interface PageBuilderProps {
  items: Array<any>
}

function PageBuilder({ items }: PageBuilderProps) {
  return (
    <>
      {items.map(item => (
        <PageBlock key={item._key} {...item} />
      ))}
    </>
  )
}

export { PageBuilder }
