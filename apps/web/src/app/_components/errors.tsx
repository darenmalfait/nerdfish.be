import * as React from 'react'
import Image from 'next/image'
import {stripPreSlash} from '@nerdfish-website/lib/utils'
import {Container, Grid, Paragraph, Section} from '@nerdfish/ui'
import {Bookmark, ChevronRight, Rss} from 'lucide-react'

import errorImage from '~/assets/images/fish-error.png'
import {ArrowLink} from '~/components/arrow-link'
import {BigTitle} from '~/components/blocks/big-title'
import global from '~/content/global/index.json'

function ErrorPage({
  title = '404',
  subTitle,
}: {
  title?: string
  subTitle?: string
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
      <Section>
        <BigTitle title={title} />
      </Section>
      <Section>
        <Grid>
          <Container size="full">
            <div className="relative w-full pb-8 pt-6 text-center lg:py-8 lg:text-left">
              <div className="flex flex-auto flex-col justify-start lg:w-1/2 xl:pr-16">
                <div className="max-w-xl py-16 sm:py-24">
                  <div className="text-center lg:text-left">
                    <Paragraph className="mt-2 text-lg text-secondary">
                      {subTitle}
                    </Paragraph>
                  </div>
                  <div className="mt-12">
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-secondary">
                      Popular pages
                    </h2>
                    <ul className="mt-4 divide-y divide-gray-200 border-y border-gray-200">
                      {links.map((link, i) => (
                        <li
                          key={i}
                          className="group relative flex items-start space-x-4 py-6"
                        >
                          <div className="shrink-0">
                            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-inverse">
                              <link.icon
                                className="h-6 w-6 text-inverse"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-base font-medium text-primary">
                              <span className="rounded-sm focus-within:ring-2 focus-within:ring-accent focus-within:ring-offset-2">
                                <a
                                  href={link.href}
                                  className="focus:outline-none"
                                >
                                  <span
                                    className="absolute inset-0"
                                    aria-hidden="true"
                                  />
                                  {link.title}
                                </a>
                              </span>
                            </h3>
                            <p className="text-base text-secondary">
                              {link.description}
                            </p>
                          </div>
                          <div className="shrink-0 self-center">
                            <ChevronRight
                              className="h-5 w-5 text-gray-400"
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
                  width={200}
                  className="mx-auto w-full max-w-96 rounded-md"
                  src={errorImage}
                  alt="not found"
                />
              </div>
            </div>
          </Container>
        </Grid>
      </Section>
    </>
  )
}

export {ErrorPage}
