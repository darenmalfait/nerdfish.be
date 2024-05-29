import * as React from 'react'
import {Spacer} from '@nerdfish-website/ui/components/spacer'
import {H2} from '@nerdfish/ui'
import {camelCase, startCase} from 'lodash'
import * as Icons from 'lucide-react'
import {tinaField} from 'tinacms/dist/react'

import {type Block, type PageBlocksFeatures} from '~/app/cms'

import {Header} from '../components'

const dynamicHeroIcon = (name: keyof typeof Icons) => Icons[name]

function FeatureCard(
  data: React.ComponentPropsWithoutRef<'div'> & {
    title: string
    description: string
    icon?: keyof typeof Icons
    index?: number
  },
) {
  const {title, description, icon, index, ...props} = data
  const Icon = icon && (dynamicHeroIcon(icon) as Icons.LucideIcon)

  return (
    <div
      className="relative flex size-full flex-col items-start gap-3 rounded-lg bg-muted px-8 py-6 shadow-outline lg:flex-row lg:gap-6 lg:px-12  lg:py-10"
      {...props}
    >
      {Icon ? (
        <Icon
          data-tina-field={tinaField(data, 'icon')}
          className="flex h-8 shrink-0 text-primary lg:mt-0.5"
        />
      ) : null}
      <div>
        <H2
          data-tina-field={tinaField(data, 'title')}
          as="h3"
          className="mb-4 flex flex-none items-end !text-xl font-medium tracking-normal text-primary"
        >
          {title}
        </H2>
        <p
          data-tina-field={tinaField(data, 'description')}
          className="flex-auto text-lg text-muted"
        >
          {description}
        </p>
      </div>
    </div>
  )
}

export function FeaturesBlock({
  title,
  subTitle,
  items,
}: Block<PageBlocksFeatures>) {
  return (
    <section className="container mx-auto mt-24 px-4">
      {title ?? subTitle ? (
        <>
          <Header title={title?.toString()} subTitle={subTitle} />
          <Spacer size="2xs" />
        </>
      ) : null}
      <div className="grid grid-cols-12 gap-6">
        {items?.map((item, i) => {
          if (!item) return null

          const {title: itemTitle, icon, description} = item

          return (
            <div key={item.title} className="col-span-full lg:col-span-6">
              <FeatureCard
                index={i}
                icon={
                  icon
                    ? (`${startCase(camelCase(icon)).replace(/ /g, '')}` as any)
                    : null
                }
                title={itemTitle ?? ''}
                description={description ?? ''}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
