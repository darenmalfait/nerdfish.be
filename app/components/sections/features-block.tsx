import { Grid } from '@daren/ui-components'
import { camelCase, startCase } from 'lodash'
import * as React from 'react'

import { FeatureCard } from '../elements'

import { Section, Header, Spacer } from '~/components/layout'
import type { SanityBlock } from '~/types/sanity'

interface ContentProps {
  title?: string
  subTitle?: string
  items?: {
    title: string
    icon?: {
      name: string
    }
    description: string
  }[]
}

export function FeaturesBlock({
  content: { title, items = [], subTitle } = {},
}: SanityBlock<ContentProps>) {
  return (
    <>
      {(title || subTitle) && (
        <Section className="mt-24">
          <Header title={title} subTitle={subTitle} />
          <Spacer size="2xs" />
        </Section>
      )}
      <Section>
        <Grid rowGap>
          {items.map(({ title, icon, description }) => (
            <div key={title} className="col-span-full lg:col-span-6">
              <FeatureCard
                icon={
                  icon?.name &&
                  (`${startCase(camelCase(icon.name)).replace(
                    / /g,
                    '',
                  )}Icon` as any)
                }
                title={title}
                description={description}
              />
            </div>
          ))}
        </Grid>
      </Section>
    </>
  )
}
