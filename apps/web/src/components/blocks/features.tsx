import * as React from 'react'
import {Spacer} from '@nerdfish-website/ui/components/spacer'
import {Grid, H2, Section} from '@nerdfish/ui'
import {camelCase, startCase} from 'lodash'
import * as Icons from 'lucide-react'
import {tinaField} from 'tinacms/dist/react'

import {Header} from '~/components/header'
import {Block} from '~/lib/types/cms'

const dynamicHeroIcon = (name: keyof typeof Icons) => Icons[name]

function FeatureCard(
  data: Block &
    JSX.IntrinsicElements['div'] & {
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
      className="relative flex h-full w-full flex-col items-start gap-3 rounded-lg px-8 py-6 bg-secondary shadow-outline lg:flex-row lg:gap-6  lg:px-12  lg:py-10"
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
          className="flex-auto text-lg text-secondary"
        >
          {description}
        </p>
      </div>
    </div>
  )
}

function Features({
  title,
  subTitle,
  items,
}: {
  title?: string
  subTitle?: string
  items?: {
    title: string
    icon?: string
    description: string
  }[]
}) {
  return (
    <>
      {title ?? subTitle ? (
        <Section className="mt-24">
          <Header title={title} subTitle={subTitle} />
          <Spacer size="2xs" />
        </Section>
      ) : null}
      <Section>
        <Grid rowGap>
          {items?.map(({title: itemTitle, icon, description}, i) => (
            <div key={i} className="col-span-full lg:col-span-6">
              <FeatureCard
                index={i}
                icon={
                  icon
                    ? (`${startCase(camelCase(icon)).replace(/ /g, '')}` as any)
                    : null
                }
                title={itemTitle}
                description={description}
              />
            </div>
          ))}
        </Grid>
      </Section>
    </>
  )
}

export {Features}
