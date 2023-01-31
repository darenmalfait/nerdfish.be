import * as React from 'react'
import {Grid, H3, Paragraph, Section} from '@daren/ui-components'
import type {Template} from 'tinacms'

import {tagsSchema} from '../../.tina/schema/objects'
import {useBlockData} from '../../context/block-data-provider'
import type {Block} from '../../lib/types/cms'
import {
  buildSrc,
  buildSrcSet,
  getLowQualityUrlFor,
} from '../../lib/utils/cloudinary'
import {Image} from '../common/image'
import {Link} from '../common/link'
import {Header} from '../layout/header'
import type {Product} from '.tina/__generated__/types'

function Feature({title, link, description, soon, image}: Partial<Product>) {
  return (
    <div className="flex items-center col-span-full lg:col-span-6 justify-items-stretch">
      <Link
        href={link ?? '#'}
        className="group text-primary bg-secondary shadow-outline relative flex flex-col items-center justify-center w-full rounded-lg px-8 py-5 overflow-hidden"
      >
        {image ? (
          <div className="mb-4 h-24 flex items-center w-auto group-hover:scale-125 z-1 transition-all duration-1000">
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
        <div className="text-center space-y-2 z-1">
          <H3 className="m-0">{title}</H3>
          <Paragraph>
            <span className="truncate overflow-ellipsis">{description}</span>
            <span className="block font-bold whitespace-nowrap">
              {soon ? (
                <span className="border py-1 px-2 rounded-full text-xs border-green-300 bg-green-50 dark:border-green-200 dark:bg-green-500/10">
                  Soon
                </span>
              ) : (
                link?.replace('https://', '')
              )}
            </span>
          </Paragraph>
        </div>
        <div className="absolute inset-0 bg-daren-100 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 z-0" />
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

const productsBlockSchema: Template = {
  name: 'products',
  label: 'Products',
  ui: {
    previewSrc: '/blocks/products.png',
  },
  fields: [
    {
      name: 'header',
      label: 'Header',
      type: 'object',
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'subtitle',
          name: 'subtitle',
        },
        {
          type: 'string',
          label: 'Link',
          name: 'link',
          description: 'Optional CTA link',
        },
      ],
    },
    tagsSchema,
    {
      type: 'number',
      label: 'Number of visible items, leave empty for all.',
      name: 'count',
    },
  ],
}

export {Products, productsBlockSchema}
