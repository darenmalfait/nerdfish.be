import { Grid } from '@daren/ui-components'
import type { PortableTextEntry } from '@sanity/block-content-to-react'
import * as React from 'react'

import { OptimizedImage } from '../elements/optimized-image'

import { CtaLink } from '~/components/buttons'
import { PortableText } from '~/components/common'
import { Section } from '~/components/layout'
import { getLowQualityUrlFor, urlFor } from '~/lib/sanity'
import type { SanityBlock, SanityCta, SanityImage } from '~/types/sanity'
import { getResponsiveImageSizes } from '~/utils/image'

interface ContentProps {
  image?: SanityImage
  body?: PortableTextEntry[]
  action?: SanityCta
}

export function AboutBlock({
  content: { body, image, action } = {},
}: SanityBlock<ContentProps>) {
  return (
    <Section className="py-32">
      <Grid>
        <div className="table col-span-full lg:col-span-6">
          <div className="table-cell text-center align-middle">
            <div className="aspect-w-4 aspect-h-3">
              {image && (
                <OptimizedImage
                  src={urlFor(image).url()}
                  blurDataUrl={getLowQualityUrlFor(image)}
                  alt={image.alt}
                  className="rounded-xl"
                  responsive={getResponsiveImageSizes('small')}
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col col-span-full justify-center prose lg:col-span-4 lg:col-start-8 lg:mt-0">
          {body && <PortableText blocks={body} />}
          {action && <CtaLink {...action} />}
        </div>
      </Grid>
    </Section>
  )
}
