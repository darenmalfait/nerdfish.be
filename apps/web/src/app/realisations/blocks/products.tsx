'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {Badge, H3, Paragraph} from '@nerdfish/ui'
import {tinaField} from 'tinacms/dist/react'

import {type Block, type PageBlocksProducts, type Product} from '~/app/cms'
import {buildSrc, Header} from '~/app/common'

function Feature({title, link, description, soon, image}: Partial<Product>) {
  return (
    <div className="col-span-full flex items-center justify-items-stretch lg:col-span-6">
      <Link
        href={link ?? '#'}
        className="group relative flex min-h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-muted px-8 py-5 pt-0 text-primary shadow-outline"
      >
        {image ? (
          <div className="z-1 relative mb-4 flex size-16 items-center overflow-hidden rounded-xl transition-all duration-1000 group-hover:scale-125">
            <Image
              className="absolute inset-0 object-cover"
              src={buildSrc(image, {
                width: 100,
              })}
              width={100}
              height={100}
              alt={title ?? 'Product image'}
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

export function ProductsBlock(data: Block<PageBlocksProducts>) {
  const {header, globalData = {}} = data

  const {products: allProducts = []} = globalData
  const {title, subtitle, link} = header ?? {}

  return (
    <section className="container mx-auto px-4">
      {title ?? subtitle ? (
        <div data-tina-field={tinaField(data, 'header')} className="mb-6">
          <Header
            title={title ?? ''}
            subTitle={subtitle}
            cta="see all"
            ctaUrl={link ?? ''}
          />
        </div>
      ) : null}
      <div data-tina-field={tinaField(data, 'header')} className="space-y-6">
        <div className="grid grid-cols-12 gap-6">
          {allProducts.map(product => (
            <Feature key={product.id ?? product.title} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}
