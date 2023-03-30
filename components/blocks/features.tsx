import {Grid, H2, Section} from '@nerdfish/ui'
import {camelCase, startCase} from 'lodash'
import * as Icons from 'lucide-react'

import {type Block} from '~/lib/types/cms'

import {Header} from '../layout/header'
import {Spacer} from '../layout/spacer'

const dynamicHeroIcon = (name: keyof typeof Icons) => Icons[name]

function FeatureCard({
  parentField,
  title,
  description,
  icon,
  index,
  ...props
}: Block &
  JSX.IntrinsicElements['div'] & {
    title: string
    description: string
    icon?: keyof typeof Icons
    index?: number
  }) {
  const Icon = icon && (dynamicHeroIcon(icon) as Icons.LucideIcon)

  return (
    <div
      className="bg-secondary shadow-outline relative flex h-full w-full flex-col items-start gap-3 rounded-lg px-8 py-6 lg:flex-row lg:gap-6  lg:px-12  lg:py-10"
      {...props}
    >
      {Icon ? (
        <Icon
          data-tinafield={`${parentField}.items.${index}.icon`}
          className="text-primary flex h-8 shrink-0 lg:mt-0.5"
        />
      ) : null}
      <div>
        <H2
          data-tinafield={`${parentField}.items.${index}.title`}
          as="h3"
          className="text-primary mb-4 flex flex-none items-end !text-xl font-medium tracking-normal"
        >
          {title}
        </H2>
        <p
          data-tinafield={`${parentField}.items.${index}.description`}
          className="text-secondary flex-auto text-lg"
        >
          {description}
        </p>
      </div>
    </div>
  )
}

function Features({
  parentField = '',
  title,
  subTitle,
  items,
}: Block & {
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
      {title || subTitle ? (
        <Section className="mt-24">
          <Header title={title} subTitle={subTitle} />
          <Spacer size="2xs" />
        </Section>
      ) : null}
      <Section>
        <Grid rowGap>
          {items?.map(({title: itemTitle, icon, description}, i) => (
            <div
              key={`${parentField}-${i}`}
              className="col-span-full lg:col-span-6"
            >
              <FeatureCard
                parentField={parentField}
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
