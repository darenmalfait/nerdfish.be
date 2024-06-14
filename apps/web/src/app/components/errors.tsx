import * as React from 'react'
import Image from 'next/image'
import {stripPreSlash} from '@nerdfish-website/lib/utils'
import {Paragraph} from '@nerdfish/ui'
import {Bookmark, ChevronRight, Rss} from 'lucide-react'

import errorImage from '~/assets/images/fish-error.png'
import global from '~/content/global/index.json'

import {ArrowLink, BigTitleBlock} from '../common'

function ErrorPage({
  title = '404',
  subtitle,
}: {
  title?: string
  subtitle?: string
}) {
  const paths = global.paths

  const links = [
    {
      title: 'Blog',
      description: 'Read about my latest news and articles.',
      icon: Rss,
      href: `/${stripPreSlash(paths.blog || '')}`,
    },
    {
      title: 'Get in touch',
      description: "Send me a message and I'll get back to you.",
      icon: Bookmark,
      href: `/${stripPreSlash(paths.contact || '')}`,
    },
  ]

  return (
    <>
      <section>
        <BigTitleBlock title={title} />
      </section>
      <section className="container">
        <div className="relative w-full pb-8 pt-6 text-center lg:py-8 lg:text-left">
          <div className="flex flex-auto flex-col justify-start lg:w-1/2 xl:pr-16">
            <div className="max-w-xl py-16 sm:py-24">
              <div className="text-center lg:text-left">
                <Paragraph className="mt-2 text-lg text-muted">
                  {subtitle}
                </Paragraph>
              </div>
              <div className="mt-12">
                <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
                  Popular pages
                </h2>
                <ul className="mt-4 divide-y divide-primary/20 border-y border-primary/20">
                  {links.map((link, i) => (
                    <li
                      key={i}
                      className="group relative flex items-start space-x-4 py-6"
                    >
                      <div className="shrink-0">
                        <span className="flex size-12 items-center justify-center rounded-lg bg-inverted">
                          <link.icon
                            className="size-6 text-inverted"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-medium text-primary">
                          <span className="focus-within:ring-accent rounded-sm focus-within:ring-2 focus-within:ring-offset-2">
                            <a href={link.href} className="focus:outline-none">
                              <span
                                className="absolute inset-0"
                                aria-hidden="true"
                              />
                              {link.title}
                            </a>
                          </span>
                        </h3>
                        <p className="text-base text-muted">
                          {link.description}
                        </p>
                      </div>
                      <div className="shrink-0 self-center">
                        <ChevronRight
                          className="size-5 text-muted"
                          aria-hidden="true"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ArrowLink href="/">Back to website</ArrowLink>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mx-auto flex w-full items-center overflow-hidden rounded-full sm:w-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2">
            <Image
              placeholder="blur"
              width={200}
              className="mx-auto w-full max-w-96 rounded-md"
              src={errorImage}
              alt="not found"
            />
          </div>
        </div>
      </section>
    </>
  )
}

export {ErrorPage}
