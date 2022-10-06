import { GiCubes } from 'react-icons/gi'

import type { ArrayField } from '../../types/schema-types'

export const blocks: ArrayField = {
  title: 'Blocks',
  name: 'blocks',
  type: 'array',
  icon: GiCubes,
  of: [
    { type: 'aboutBlock' },
    { type: 'bigTitleBlock' },
    { type: 'carouselBlock' },
    { type: 'featuresBlock' },
    { type: 'galleryBlock' },
    { type: 'heroBlock' },
    { type: 'keywordListBlock' },
    { type: 'longcopyBlock' },
    { type: 'postsBlock' },
    { type: 'wikiBlock' },
  ],
}
