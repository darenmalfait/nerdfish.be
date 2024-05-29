import * as React from 'react'
import {DoubleLabelLink} from '@nerdfish/ui'
import {tinaField} from 'tinacms/dist/react'

import {type Block, type PageBlocksBigTitle} from '~/app/cms'

import {Link} from '../components'

export function BigTitleBlock(data: Block<PageBlocksBigTitle>) {
  const {title, action} = data

  return (
    <section>
      <div className="container mx-auto my-8 flex flex-col space-y-6 px-4 lg:my-16">
        {action?.title ? (
          <div>
            <DoubleLabelLink
              as={Link}
              href={action.href ?? '/'}
              description={action.label ?? ''}
              data-tina-field={tinaField(action)}
              className="cursor-pointer"
            >
              {action.title}
            </DoubleLabelLink>
          </div>
        ) : null}
        <h1
          data-tina-field={tinaField(data, 'title')}
          className="font-sans text-6xl font-black uppercase leading-none text-primary sm:text-[11.6250vw] 2xl:text-[12rem]"
        >
          {title}
        </h1>
      </div>
    </section>
  )
}
