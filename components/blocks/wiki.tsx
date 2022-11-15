import { Button, Container, Grid, H2, H3, Section } from '@daren/ui-components'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import * as React from 'react'
import type { Template } from 'tinacms'

import { tagsSchema } from '../../.tina/schema/objects'
import { DateFormatter } from '../../components/common/date-formatter'
import { useBlockData } from '../../context/block-data-provider'
import type { Block } from '../../lib/types/cms'
import { useUpdateQueryStringValueWithoutNavigation } from '../../lib/utils/misc'
import { getDatedSlug } from '../../lib/utils/routes'
import { filterWiki } from '../../lib/utils/wiki'
import { Link } from '../common/link'
import { PortableText } from '../common/portable-text'
import { Tag } from '../common/tag'
import { Header } from '../layout/header'
import { Spacer } from '../layout/spacer'

// should be divisible by 3 and 2 (large screen, and medium screen).
const PAGE_SIZE = 6

function Wiki({
  parentField,
  header,
  searchEnabled,
  tags,
  count,
}: Block & {
  header?: {
    title?: string
    subtitle?: string
    link?: string
  }
  searchEnabled?: boolean
  tags?: string[]
  count?: number
}) {
  const { title, subtitle, link } = header || {}
  const router = useRouter()
  const [queryValue, setQuery] = React.useState(
    router.query.q?.toString() ?? '',
  )
  const { wiki: allPosts } = useBlockData()

  const query = typeof queryValue === 'string' ? queryValue.trim() : ''
  useUpdateQueryStringValueWithoutNavigation('q', query)

  const [indexToShow, setIndexToShow] = React.useState(PAGE_SIZE)
  let filteredPosts =
    tags && tags.length > 0 ? filterWiki(allPosts, tags.join(' ')) : allPosts

  if (count) {
    filteredPosts = filteredPosts.slice(0, count)
  }

  const matchingPosts = React.useMemo(() => {
    return filterWiki(filteredPosts, query)
  }, [filteredPosts, query])

  React.useEffect(() => {
    setIndexToShow(PAGE_SIZE)
  }, [query])

  const allTags = [...new Set(filteredPosts.flatMap(post => post.tags))]

  const posts = matchingPosts.slice(0, indexToShow)

  const hasMorePosts = indexToShow < matchingPosts.length

  const visibleTags = [...new Set(matchingPosts.flatMap(post => post.tags))]

  function toggleTag(tag: string) {
    setQuery(q => {
      // create a regexp so that we can replace multiple occurrences (`react node react`)
      const expression = new RegExp(tag, 'ig')

      const newQuery = expression.test(q)
        ? q.replace(expression, '')
        : `${q} ${tag}`

      // trim and remove subsequent spaces (`react   node ` => `react node`)
      return newQuery.replace(/\s+/g, ' ').trim()
    })
  }

  return (
    <>
      {searchEnabled && (
        <>
          <Section>
            <Grid>
              <Container
                size="full"
                className="mt-12"
                data-tinafield={`${parentField}.header`}
              >
                {title && <H2 className="mb-4">{title}</H2>}
                {subtitle && <H3 className="mb-8">{subtitle}</H3>}

                <div className="relative">
                  <MagnifyingGlassIcon
                    width="20px"
                    height="20px"
                    className="flex absolute top-0 left-6 justify-center items-center p-0 h-full text-primary-400 bg-transparent border-none"
                  />
                  <input
                    type="search"
                    value={queryValue}
                    onChange={event => {
                      setQuery(event.currentTarget.value.toLowerCase())
                    }}
                    name="q"
                    placeholder="Search"
                    className="py-6 pr-16 pl-14 w-full text-primary-400 bg-white rounded-full border-2 outline-none focus-ring"
                  />
                  <div className="hidden absolute top-0 right-0 justify-between items-center w-14 h-full text-lg font-bold text-primary-400 md:flex">
                    {matchingPosts.length}
                  </div>
                </div>
              </Container>
            </Grid>
          </Section>

          <Spacer size="3xs" className="col-span-full" />

          {allTags.length > 0 ? (
            <Section className="mb-16">
              <Grid>
                <Container size="full">
                  <div className="flex flex-wrap col-span-full justify-center -mr-4 -mb-4 lg:col-span-10">
                    {allTags.map(tag => {
                      if (!tag) {
                        return null
                      }

                      const selected = query.includes(tag)
                      return (
                        <Tag
                          key={tag}
                          tag={tag}
                          selected={selected}
                          onClick={() => toggleTag(tag || '')}
                          disabled={!visibleTags.includes(tag) && !selected}
                        />
                      )
                    })}
                  </div>
                </Container>
              </Grid>
            </Section>
          ) : null}

          <Spacer size="3xs" className="col-span-full" />
        </>
      )}

      {!searchEnabled && (title || subtitle) && (
        <Section className="mt-24" data-tinafield={`${parentField}.header`}>
          <Header
            title={title}
            subTitle={subtitle}
            cta="see all"
            ctaUrl={link}
          />
          <Spacer size="2xs" />
        </Section>
      )}

      <Section>
        <Grid>
          <Container size="small">
            <section className="py-12 space-y-14 sm:py-16 sm:space-y-16">
              {matchingPosts.length === 0 ? (
                <div className="flex flex-col col-span-full">
                  <H3 as="p" variant="secondary" className="max-w-lg">
                    No results found.
                  </H3>
                </div>
              ) : (
                posts.map(wiki => {
                  return (
                    <article
                      key={wiki._sys?.filename}
                      className="flex flex-col"
                    >
                      <Link
                        href={`/wiki${getDatedSlug(
                          wiki.date as string,
                          wiki._sys?.filename || '',
                        )}`}
                        className="line-clamp-3 text-2xl font-semibold leading-snug hover:underline text-primary hover:text-secondary"
                      >
                        {wiki.title}
                      </Link>
                      {wiki.date && (
                        <p className="text-sm text-gray-400 dark:text-gray-600">
                          <DateFormatter dateString={wiki.date} format="PPP" />
                        </p>
                      )}
                      <div className="mt-2 text-justify text-gray-600 dark:text-gray-300">
                        <PortableText content={wiki.excerpt} />
                      </div>
                    </article>
                  )
                })
              )}
            </section>
          </Container>
        </Grid>

        {hasMorePosts ? (
          <div className="flex justify-center mb-32 w-full">
            <Button
              variant="secondary"
              onClick={() => setIndexToShow(i => i + PAGE_SIZE)}
            >
              <span>Load more</span> <PlusIcon width="20px" height="20px" />
            </Button>
          </div>
        ) : null}
      </Section>
    </>
  )
}

const wikiBlockSchema: Template = {
  name: 'Wiki',
  label: 'Wiki',
  ui: {
    previewSrc: '/blocks/hero.png',
  },
  fields: [
    {
      name: 'header',
      label: 'Header',
      type: 'object',
      fields: [
        {
          type: 'string',
          label: 'Title',
          name: 'title',
        },
        {
          type: 'string',
          label: 'subtitle',
          name: 'subtitle',
        },
        {
          type: 'string',
          label: 'Link',
          name: 'link',
          description: 'Optional CTA link',
        },
      ],
    },
    {
      type: 'boolean',
      label: 'Is search enabled?',
      name: 'searchEnabled',
    },
    tagsSchema,
    {
      type: 'number',
      label: 'Number of visible items, leave empty for all.',
      name: 'count',
    },
  ],
}

export { Wiki, wikiBlockSchema }
