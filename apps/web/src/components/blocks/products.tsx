'use client'

import * as React from 'react'
import Link from 'next/link'
import {Image} from '@nerdfish-website/ui/components/image'
import {Badge, H3, Paragraph} from '@nerdfish/ui'
import {tinaField} from 'tinacms/dist/react'

import {Header} from '~/components/header'
import {type Block} from '~/lib/types/cms'
import {
  buildSrc,
  buildSrcSet,
  getLowQualityUrlFor,
} from '~/lib/utils/cloudinary'
import {type Product} from '~/tina/__generated__/types'

function Feature({title, link, description, soon, image}: Partial<Product>) {
  return (
    <div className="col-span-full flex items-center justify-items-stretch lg:col-span-6">
      <Link
        href={link ?? '#'}
        className="group relative flex min-h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-muted px-8 py-5 pt-0 text-primary shadow-outline"
      >
        {image ? (
          <div className="z-1 mb-0 flex h-24 w-auto items-center transition-all duration-1000 group-hover:scale-125">
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
                <Badge variant="success">Soon</Badge>
              ) : (
                link?.replace('https://', '')
              )}
            </span>
          </Paragraph>
        </div>
        <div className="bg-nerdfish-100 absolute inset-0 z-0 opacity-0 transition-opacity duration-1000 group-hover:opacity-10" />
      </Link>
    </div>
  )
}

function Products(
  data: Block & {
    header?: {
      title?: string
      subtitle?: string
      link?: string
    }
  },
) {
  const {header, globalData = {}} = data

  const {products: allProducts = []} = globalData
  const {title, subtitle, link} = header ?? {}

  return (
    <section className="container mx-auto px-4">
      {title ?? subtitle ? (
        <div data-tina-field={tinaField(data, 'header')} className="mb-6">
          <Header
            title={title}
            subTitle={subtitle}
            cta="see all"
            ctaUrl={link}
          />
        </div>
      ) : null}
      <div data-tina-field={tinaField(data, 'header')} className="space-y-6">
        <div className="grid grid-cols-12 gap-6">
          {allProducts.map((product, index) => (
            <Feature key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export {Products}
