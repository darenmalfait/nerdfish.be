import customImage from '../../lib/custom-image'
import type { ImageField } from '../../types/schema-types'

export const figure: ImageField = {
  ...customImage(),
}

export const figureWithOptions: ImageField = {
  ...customImage({ hasOptions: true, name: 'figureWithOptions' }),
}
