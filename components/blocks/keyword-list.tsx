import {Container, Grid, H1, Section} from '@daren/ui-components'
import * as React from 'react'

import type {Template} from 'tinacms'

import type {Block} from '../../lib/types/cms'

const KeywordList = ({
  parentField,
  title,
  keywords,
}: Block & {
  title?: string
  keywords?: string[]
}) => {
  return (
    <Section>
      <Grid>
        <Container size="full" className="py-32">
          <div className="flex flex-col space-y-8 lg:flex-row lg:justify-between lg:space-y-0 lg:space-x-16">
            <div className="w-full max-w-sm xl:max-w-lg">
              <H1
                data-tinafield={`${parentField}.title`}
                as="h2"
                className="w-full font-bold "
              >
                {title}
              </H1>
            </div>
            <div className="grid w-full grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {keywords?.map(item => (
                <span
                  data-tinafields={`${parentField}.keywords.{i}.item`}
                  key={item}
                  className="block text-lg text-primary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Grid>
    </Section>
  )
}

const keywordListBlockSchema: Template = {
  name: 'KeywordList',
  label: 'Keywords',
  ui: {
    previewSrc: '/blocks/keyword-list.png',
    defaultItem: {
      items: ['feature', 'feature', 'feature'],
    },
  },
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    {
      type: 'string',
      label: 'Keywords',
      name: 'keywords',
      list: true,
    },
  ],
}

export {KeywordList, keywordListBlockSchema}
