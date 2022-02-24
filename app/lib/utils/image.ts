import type { ResponsiveProps } from '~/components/elements/optimized-image.js'
import type { SizeValue } from '~/components/layout'

const sizeMap: Record<SizeValue, number> = {
  small: 600,
  default: 850,
  medium: 1100,
  full: 1300,
}

export function getResponsiveImageSizes(size: SizeValue | number = 'default') {
  const sizeKeys: SizeValue[] = Object.keys(sizeMap) as SizeValue[]

  const sizeIndex =
    typeof size === 'string'
      ? Object.keys(sizeMap).indexOf(size)
      : sizeKeys.findIndex(key => sizeMap[key] > size)

  return sizeKeys
    .map(
      (key, index) =>
        sizeIndex >= index && {
          size: {
            width: sizeMap[key],
          },
          maxWidth: sizeMap[key],
        },
    )
    .filter(Boolean) as ResponsiveProps[]
}
