import * as React from 'react'
import {Image} from '@nerdfish-website/ui/components/image'
import {H2} from '@nerdfish/ui'
import {type RichTextType} from 'tinacms'
import {tinaField} from 'tinacms/dist/react'

import {PortableText, type Block, type Image as ImageType} from '~/app/cms'
import {buildSrc, buildSrcSet, getLowQualityUrlFor} from '~/app/common'

export function HeroBlock(
  data: Block & {
    image?: ImageType
    text?: RichTextType
    title?: string
  },
) {
  const {image, text, title} = data

  return (
    <header className="container mx-auto h-auto items-start px-4 pt-24 lg:my-12 lg:pb-12">
      <div className="relative w-full pb-8 pt-6 text-center lg:py-8 lg:text-left">
        <div className="flex flex-auto flex-col justify-start lg:w-1/2 xl:pr-16">
          <div className="space-y-6">
            <H2
              data-tina-field={tinaField(data, 'title')}
              className="font-black"
            >
              {title}
            </H2>
          </div>

          {text ? (
            <div
              data-tina-field={tinaField(data, 'text')}
              className="prose prose-lg mb-12 mt-3 dark:prose-invert"
            >
              <PortableText content={text} />
            </div>
          ) : null}
        </div>

        {image ? (
          <div
            data-tina-field={tinaField(data, 'image')}
            className="relative mx-auto flex w-full items-center sm:w-3/4 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2"
          >
            <Image
              className="mb-12 rounded-xl"
              placeholder={getLowQualityUrlFor(image.src)}
              srcSet={buildSrcSet(image.src)}
              src={buildSrc(image.src, {
                width: 500,
              })}
              loading="eager"
              alt={image.alt}
            />
          </div>
        ) : null}
      </div>
    </header>
  )
}
