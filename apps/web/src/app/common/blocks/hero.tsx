import * as React from 'react'
import Image from 'next/image'
import {H1} from '@nerdfish/ui'
import {tinaField} from 'tinacms/dist/react'

import {PortableText, type Block, type PageBlocksHero} from '~/app/cms'
import {buildSrc} from '~/app/common'

export function HeroBlock(data: Block<PageBlocksHero>) {
  const {image, text, title} = data

  return (
    <div className="relative isolate">
      <div className="container mx-auto px-4 py-24 lg:flex lg:items-center lg:gap-x-10">
        <div className="mx-auto w-full lg:mx-0 lg:max-w-2xl lg:flex-auto">
          <H1
            as="h2"
            className="relative font-black"
            data-tina-field={tinaField(data, 'title')}
          >
            {title}
          </H1>
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
          {image ? (
            <div className="relative max-w-3xl flex-none sm:max-w-xl xl:max-w-3xl 2xl:max-w-none">
              <Image
                className="inset-0 mb-12 rounded-xl"
                src={buildSrc(image.src ?? '', {
                  width: 700,
                })}
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
