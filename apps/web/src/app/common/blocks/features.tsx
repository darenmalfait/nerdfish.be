import * as React from 'react'
import {H2} from '@nerdfish/ui'
import {camelCase, startCase} from 'lodash'
import * as Icons from 'lucide-react'
import {tinaField} from 'tinacms/dist/react'

import {
  type Block,
  type Page,
  type PageBlocksFeatures,
  type PageBlocksFeaturesItems,
} from '~/app/cms'

import {ArrowLink, Header} from '../components'

const dynamicHeroIcon = (name: keyof typeof Icons) => Icons[name]

function DetailLink({page}: {page?: Page}) {
  if (!page) return null

  return (
    <ArrowLink className="mt-4 text-sm" href={`/${page._sys.filename}`}>
      Read more
    </ArrowLink>
  )
}

function FeatureCard(props: PageBlocksFeaturesItems) {
  const {title, description, icon, detail, ...rest} = props

  const Icon =
    icon && (dynamicHeroIcon(icon as keyof typeof Icons) as Icons.LucideIcon)

  return (
    <div
      className="relative flex size-full flex-col items-start gap-3 rounded-lg bg-muted px-8 py-6 shadow-outline lg:flex-row lg:gap-6 lg:px-12  lg:py-10"
      {...rest}
    >
      {Icon ? (
        <Icon
          data-tina-field={tinaField(props, 'icon')}
          className="flex h-8 shrink-0 text-primary lg:mt-0.5"
        />
      ) : null}
      <div>
        <H2
          data-tina-field={tinaField(props, 'title')}
          as="h3"
          className="mb-4 flex flex-none items-end !text-xl font-medium tracking-normal text-primary"
        >
          {title}
        </H2>
        <p
          data-tina-field={tinaField(props, 'description')}
          className="flex-auto text-lg text-muted"
        >
          {description}
        </p>
        <DetailLink page={detail as Page} />
      </div>
    </div>
  )
}

export function FeaturesBlock(props: Block<PageBlocksFeatures>) {
  const {title, subTitle, items} = props

  return (
    <section className="container mx-auto my-24 px-4">
      {title ?? subTitle ? (
        <Header
          title={title?.toString()}
          subTitle={subTitle}
          className="mb-12"
        />
      ) : null}
      <div
        className="grid grid-cols-12 gap-6"
        data-tina-field={tinaField(props, 'items')}
      >
        {items?.map((item, i) => {
          if (!item) return null

          const {icon, ...itemProps} = item

          return (
            <div
              key={`${item.title} ${i}`}
              className="col-span-full lg:col-span-6"
            >
              <FeatureCard
                {...itemProps}
                icon={
                  icon
                    ? (`${startCase(camelCase(icon)).replace(/ /g, '')}` as keyof typeof Icons)
                    : null
                }
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
