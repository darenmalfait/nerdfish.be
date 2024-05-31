import * as React from 'react'
import {Icons} from '@nerdfish-website/ui/icons'
import {tinaField} from 'tinacms/dist/react'

import {type Block, type PageBlocksBigTitle} from '~/app/cms'

import {Link} from '../components'

export function BigTitleBlock(data: Block<PageBlocksBigTitle>) {
  const {title, action} = data

  return (
    <section>
      <div className="container mx-auto my-8 flex flex-col gap-3 px-4 lg:my-16">
        {action?.label ? (
          <div>
            <Link
              href={action.href ?? '/'}
              data-tina-field={tinaField(action)}
              className="inline-block w-auto cursor-pointer"
            >
              <div className="group rounded-full bg-gradient-to-r from-nerdfish/50 via-blog-wiki/50 to-blog-project/50 p-[1px] brightness-90 contrast-150 dark:brightness-125 dark:contrast-100">
                <div className="rounded-full bg-white/80 px-3 py-1 dark:bg-black/80">
                  <span className="flex select-none items-center bg-gradient-to-r from-nerdfish via-blog-wiki to-blog-project bg-clip-text text-transparent">
                    <span className="font-normal">{action.label}</span>
                    <Icons.ChevronRight
                      direction="right"
                      className="ml-2 size-4 stroke-primary stroke-2 transition-transform group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </div>
            </Link>
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
