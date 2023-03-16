import * as React from 'react'
import {Grid, H3, Paragraph, Section} from '@nerdfish/ui'

import type {Product} from '~/.tina/__generated__/types'
import {useBlockData} from '~/context/block-data-provider'
import type {Block} from '~/lib/types/cms'
import {
  buildSrc,
  buildSrcSet,
  getLowQualityUrlFor,
} from '~/lib/utils/cloudinary'

import {Image} from '../common/image'
import {Link} from '../common/link'
import {Header} from '../layout/header'

function Feature({title, link, description, soon, image}: Partial<Product>) {
  return (
    <div className="col-span-full flex items-center justify-items-stretch lg:col-span-6">
      <Link
        href={link ?? '#'}
        className="group relative flex w-full flex-col items-center justify-center overflow-hidden rounded-lg px-8 py-5 bg-secondary text-primary shadow-outline"
      >
        {image ? (
          <div className="z-1 mb-4 flex h-24 w-auto items-center transition-all duration-1000 group-hover:scale-125">
            <Image
              placeholder={getLowQualityUrlFor(image)}
              srcSet={buildSrcSet(image)}
              src={buildSrc(image, {
                width: 100,
              })}
              alt={title}
            />
          </div>
        ) : null}
        <div className="z-1 space-y-2 text-center">
          <H3 className="m-0">{title}</H3>
          <Paragraph>
            <span className="text-ellipsis">{description}</span>
            <span className="block whitespace-nowrap font-bold">
              {soon ? (
                <span className="rounded-full border border-green-300 bg-green-50 py-1 px-2 text-xs dark:border-green-200 dark:bg-green-500/10">
                  Soon
                </span>
              ) : (
                link?.replace('https://', '')
              )}
            </span>
          </Paragraph>
        </div>
        <div className="absolute inset-0 z-0 bg-nerdfish-100 opacity-0 transition-opacity duration-1000 group-hover:opacity-10" />
      </Link>
    </div>
  )
}

function Products({
  parentField,
  header,
}: Block & {
  header?: {
    title?: string
    subtitle?: string
    link?: string
  }
}) {
  const {products: allProducts} = useBlockData()
  const {title, subtitle, link} = header ?? {}

  return (
    <>
      {title || subtitle ? (
        <Section data-tinafield={`${parentField}.header`} className="mb-6">
          <Header
            title={title}
            subTitle={subtitle}
            cta="see all"
            ctaUrl={link}
          />
        </Section>
      ) : null}
      <Section data-tinafield={`${parentField}.title`} className="space-y-6">
        <Grid rowGap>
          {allProducts.map((product, index) => (
            <Feature key={index} {...product} />
          ))}
        </Grid>
      </Section>
    </>
  )
}

export {Products}
