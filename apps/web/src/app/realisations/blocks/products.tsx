'use client'

import * as React from 'react'
import Link from 'next/link'
import {Icons} from '@nerdfish-website/ui/icons'
import {Avatar, Badge, Button, Grid, Skeleton} from '@nerdfish/ui'
import {cx} from '@nerdfish/utils'
import {tinaField} from 'tinacms/dist/react'

import {type Block, type PageBlocksProducts, type Product} from '~/app/cms'
import {buildSrc, Header} from '~/app/common'

function Product({title, link, description, soon, image}: Partial<Product>) {
  return (
    <>
      <div />
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-focus-within:-translate-y-10 group-hover:-translate-y-10">
        {image ? (
          <Avatar className="size-12 origin-left transform-gpu text-primary transition-all duration-300 ease-in-out group-focus-within:scale-75 group-hover:scale-75">
            <Avatar.Image
              src={buildSrc(image, {
                width: 100,
              })}
              className="object-cover"
              alt={title ?? 'Product image'}
            />
            <Avatar.Fallback>
              <Skeleton className="size-full" />
            </Avatar.Fallback>
          </Avatar>
        ) : null}
        <h3 className="text-xl font-semibold text-primary">{title}</h3>
        <p className="max-w-lg text-muted">{description}</p>
        <span className="block truncate whitespace-nowrap font-bold">
          {soon ? (
            <Badge variant="success">Soon</Badge>
          ) : (
            link?.replace('https://', '')
          )}
        </span>
      </div>
      {link ? (
        <div
          className={cx(
            'pointer-events-none z-10 absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100',
          )}
        >
          <Button
            variant="ghost"
            asChild
            size="sm"
            className="pointer-events-auto"
          >
            <Link href={link} target="_blank" rel="noreferrer">
              Read more
              <Icons.ChevronRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-focus-within:bg-popover group-hover:bg-popover" />
    </>
  )
}

export function ProductsBlock(data: Block<PageBlocksProducts>) {
  const {header, globalData = {}} = data

  const {products: allProducts = []} = globalData
  const {title, subtitle, link} = header ?? {}

  return (
    <section className="container mx-auto mb-16 px-4">
      {title ?? subtitle ? (
        <div data-tina-field={tinaField(data, 'header')} className="mb-6">
          <Header
            title={title ?? ''}
            subtitle={subtitle}
            cta="see all"
            className="mb-12"
            ctaUrl={link ?? ''}
          />
        </div>
      ) : null}
      <div data-tina-field={tinaField(data, 'header')} className="space-y-6">
        <Grid className="auto-rows-[15rem]">
          {allProducts.map(product => (
            <Grid.Card
              key={product.id ?? product.title}
              className="bg-muted lg:col-span-1"
            >
              <Product {...product} />
            </Grid.Card>
          ))}
        </Grid>
      </div>
    </section>
  )
}
