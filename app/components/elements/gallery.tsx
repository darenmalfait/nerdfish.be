import type { SerializeFrom } from '@remix-run/node'
import clsx from 'clsx'
import * as React from 'react'

import { OptimizedImage } from '~/components/elements/'
import { getLowQualityUrlFor, urlFor } from '~/lib/api/sanity'
import { getResponsiveImageSizes } from '~/lib/utils/image'
import type { SanityImage } from '~/types/sanity'

export enum GalleryType {
  Wicked = 'wicked',
  Grid = 'grid',
}

export interface GalleryProps {
  images: SerializeFrom<SanityImage>[]
  zoom?: boolean
}

function Image(image: SerializeFrom<SanityImage>) {
  return (
    <div className="relative w-full h-0 rounded-2xl aspect-w-5 aspect-h-3">
      <OptimizedImage
        {...image}
        className="object-contain absolute inset-0 w-full h-full rounded-lg focus-ring"
        src={urlFor(image).width(600).url()}
        blurDataUrl={getLowQualityUrlFor(image)}
        responsive={getResponsiveImageSizes('default')}
      />
    </div>
  )
}

function Grid({ images, zoom }: GalleryProps) {
  return (
    <div className="flex flex-wrap -m-1 md:-m-2">
      {images.map(image => (
        <div
          key={image.asset?._id}
          className="flex flex-wrap w-full md:w-1/2 xl:w-1/3"
        >
          <div className="p-1 w-full md:p-2">
            <Image {...image} zoom={zoom} alt={image.alt} />
          </div>
        </div>
      ))}
    </div>
  )
}

function getImageContainerProps(full: boolean) {
  return clsx('p-1 md:p-2', {
    'w-1/2': !full,
    'w-full': full,
  })
}

function Wicked({ images = [], zoom }: GalleryProps) {
  const sections = React.useMemo(() => {
    const results: SerializeFrom<SanityImage>[][] = []
    const imageList = [...images]

    while (imageList.length) {
      results.push(imageList.splice(0, 6))
    }

    return results
  }, [images])

  const styles = {
    column: 'flex flex-wrap w-full xl:w-1/2',
  }

  return (
    <>
      {sections.map((col, i) => (
        <div className="flex flex-wrap -m-1 md:-m-2" key={i}>
          <div className={styles.column}>
            {col.slice(0, 3).map((image, j) => (
              <div key={j} className={getImageContainerProps(j === 2)}>
                <Image {...image} zoom={zoom} alt={image.alt} />
              </div>
            ))}
          </div>
          {col.length > 3 && (
            <div className={styles.column}>
              {col.slice(3, 6).map((image, j) => (
                <div key={j} className={getImageContainerProps(j === 0)}>
                  <Image {...image} zoom={zoom} alt={image.alt} />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export const Gallery = {
  Grid,
  Wicked,
}
