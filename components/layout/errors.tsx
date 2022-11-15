import { Container, Grid, Paragraph, Section } from '@daren/ui-components'
import {
  BookmarkIcon,
  ChevronRightIcon,
  RssIcon,
} from '@heroicons/react/24/solid'

import { BigTitle } from '../../components/blocks/big-title'
import { ArrowLink } from '../../components/common/arrow-link'
import { NoIndex } from '../../components/common/seo'

import global from '../../content/global/index.json'
import { stripPreSlash } from '../../lib/utils/string'

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
      icon: RssIcon,
      href: `/${stripPreSlash(paths.blog || '')}`,
    },
    {
      title: 'Get in touch',
      description: "Send me a message and I'll get back to you.",
      icon: BookmarkIcon,
      href: `/${stripPreSlash(paths.contact || '')}`,
    },
  ]

  return (
    <>
      <NoIndex />
      <Section>
        <BigTitle parentField="title" title={title} />
      </Section>
      <Section>
        <Grid>
          <Container size="full">
            <div className="relative pt-6 pb-8 w-full text-center lg:py-8 lg:text-left">
              <div className="flex flex-col flex-auto justify-start lg:w-1/2 xl:pr-16">
                <div className="py-16 max-w-xl sm:py-24">
                  <div className="text-center lg:text-left">
                    <Paragraph className="mt-2 text-lg text-secondary">
                      {subTitle}
                    </Paragraph>
                  </div>
                  <div className="mt-12">
                    <h2 className="text-sm font-semibold tracking-wide uppercase text-secondary">
                      Popular pages
                    </h2>
                    <ul className="mt-4 border-y border-gray-200 divide-y divide-gray-200">
                      {links.map((link, i) => (
                        <li
                          key={i}
                          className="group flex relative items-start py-6 space-x-4"
                        >
                          <div className="shrink-0">
                            <span className="bg-inverse flex justify-center items-center w-12 h-12 rounded-lg">
                              <link.icon
                                className="w-6 h-6 text-inverse"
                                aria-hidden="true"
                              />
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
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
                            <ChevronRightIcon
                              className="w-5 h-5 text-gray-400"
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

              <div className="flex relative items-center mx-auto w-full sm:w-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
                <img
                  className="max-w-96 mx-auto w-full rounded-md"
                  src="/images/cat-on-box.png"
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

function FourOhFour({
  title,
  subTitle,
}: {
  title?: string
  subTitle?: string
}) {
  return (
    <ErrorPage
      title={title || "404 - Page doesn't exist"}
      subTitle={
        subTitle || "Sorry, we couldn't find the page you were looking for."
      }
    />
  )
}

function ServerError({ error }: { error?: Error }) {
  return (
    <ErrorPage
      title="500 - Oh no, something went wrong!"
      subTitle={error?.message}
    />
  )
}

export { FourOhFour, ServerError }
