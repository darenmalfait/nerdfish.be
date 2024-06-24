import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {Icons} from '@nerdfish-website/ui/icons'
import {tinaField} from 'tinacms/dist/react'

import {
  PortableText,
  type Block,
  type PageBlocksHero,
  type PageBlocksHeroAction,
} from '~/app/cms'

import {BigTitle} from '../components/big-title'

function Title(props: {title?: string | null; action?: PageBlocksHeroAction}) {
  const {title, action} = props

  if (!title && !action?.label) return null

  return (
    <div className="container mx-auto flex flex-col gap-3 px-4">
      {action?.label ? (
        <div>
          <Link
            href={action.href ?? '/'}
            data-tina-field={tinaField(action)}
            className="group relative inline-block w-auto cursor-pointer rounded-full bg-gradient-to-r from-nerdfish/50 via-blog-wiki/50 to-blog-project/50 p-[1px] outline-none brightness-90 contrast-150 dark:brightness-125 dark:contrast-100"
          >
            <div className="rounded-full bg-white/80 px-3 py-1 group-focus:outline-active group-focus:after:rounded-full dark:bg-black/80">
              <span className="flex select-none items-center bg-gradient-to-r from-nerdfish via-blog-wiki to-blog-project bg-clip-text text-transparent">
                <span className="font-normal">{action.label}</span>
                <Icons.ChevronRight
                  direction="right"
                  className="ml-2 size-4 stroke-primary stroke-2 transition-transform group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </Link>
        </div>
      ) : null}
      <BigTitle
        className="relative font-black"
        data-tina-field={tinaField(props, 'title')}
      >
        {title}
      </BigTitle>
    </div>
  )
}

export function HeroBlock(data: Block<PageBlocksHero>) {
  const {image, text, title, action} = data

  return (
    <div className="isolate my-8 flex min-h-[80vh] flex-col items-center justify-center lg:my-16">
      <Title title={title} action={action ?? {}} />
      <div className="container mx-auto px-4 lg:flex lg:items-center lg:gap-x-10">
        <div className="mx-auto w-full lg:mx-0 lg:max-w-2xl lg:flex-auto">
          {text ? (
            <div
              data-tina-field={tinaField(data, 'text')}
              className="prose prose-lg mb-12 mt-8 dark:prose-invert"
            >
              <PortableText content={text} />
            </div>
          ) : null}
        </div>
        <div className="mt-16 sm:mt-24 lg:mt-0 lg:shrink-0 lg:grow">
          {image?.src ? (
            <div className="relative max-w-3xl flex-none sm:max-w-xl xl:max-w-3xl 2xl:max-w-none">
              <Image
                className="inset-0 mb-12 rounded-xl"
                src={image.src}
                width={700}
                height={700}
                loading="eager"
                alt={image.alt ?? ''}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
