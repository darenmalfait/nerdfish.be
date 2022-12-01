import { Button, Container, Grid, H3, Section } from '@daren/ui-components'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid'
import formatDate from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import { useRouter } from 'next/router'
import * as React from 'react'
import type { Template } from 'tinacms'

import { tagsSchema } from '../../.tina/schema/objects'
import { useBlockData } from '../../context/block-data-provider'
import { useGlobal } from '../../context/global-provider'
import type { Block } from '../../lib/types/cms'
import { filterBlog } from '../../lib/utils/blog'
import { BlogPath } from '../../lib/utils/constants'
import { useUpdateQueryStringValueWithoutNavigation } from '../../lib/utils/misc'
import { getDatedSlug } from '../../lib/utils/routes'
import { ArticleCard } from '../common/article-card'
import { HighlightCard } from '../common/highlight-card'
import { Tag } from '../common/tag'
import { Header } from '../layout/header'
import { Spacer } from '../layout/spacer'

// should be divisible by 3 and 2 (large screen, and medium screen).
const PAGE_SIZE = 6

function Blog({
  parentField,
  header,
  searchEnabled,
  featuredEnabled,
  tags,
  count,
}: Block & {
  header?: {
    title?: string
    subtitle?: string
    link?: string
  }
  searchEnabled?: boolean
  featuredEnabled?: boolean
  tags?: string[]
  count?: number
}) {
  const { hydrated } = useGlobal()
  const { title, subtitle, link } = header || {}
  const router = useRouter()

  const [queryValue, setQuery] = React.useState(
    router.query.q?.toString() ?? '',
  )

  React.useEffect(() => {
    setQuery(router.query.q?.toString() ?? '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady])

  const { blog: allPosts } = useBlockData()

  const query = typeof queryValue === 'string' ? queryValue.trim() : ''
  useUpdateQueryStringValueWithoutNavigation('q', query)

  const [indexToShow, setIndexToShow] = React.useState(PAGE_SIZE)
  let filteredPosts =
    tags && tags.length > 0 ? filterBlog(allPosts, tags.join(' ')) : allPosts

  if (count) {
    filteredPosts = filteredPosts.slice(0, count)
  }

  const matchingPosts = React.useMemo(() => {
    return filterBlog(filteredPosts, query)
  }, [filteredPosts, query])

  React.useEffect(() => {
    setIndexToShow(PAGE_SIZE)
  }, [query])

  const allTags = [...new Set(filteredPosts.flatMap(post => post.tags))]

  const isSearching = query.length > 0
  const featured = filteredPosts.length > 0 ? filteredPosts[0] : null

  const posts =
    isSearching || !featuredEnabled
      ? matchingPosts.slice(0, indexToShow)
      : matchingPosts.filter(p => p.id !== featured?.id).slice(0, indexToShow)

  const hasMorePosts =
    isSearching || !featuredEnabled
      ? indexToShow < matchingPosts.length
      : indexToShow < matchingPosts.length - 1

  const visibleTags =
    isSearching || !featuredEnabled
      ? [...new Set(matchingPosts.flatMap(post => post.tags))]
      : allTags

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
            {(title || subtitle) && (
              <Header title={title} subTitle={subtitle} />
            )}
            <Grid>
              <Container
                size="full"
                className="mt-12"
                data-tinafield={`${parentField}.header`}
              >
                <div className="relative">
                  <MagnifyingGlassIcon
                    width="20px"
                    height="20px"
                    className="absolute top-0 left-6 flex h-full items-center justify-center border-none bg-transparent p-0 text-primary-400"
                  />
                  <input
                    type="search"
                    value={queryValue}
                    onChange={event => {
                      setQuery(event.currentTarget.value.toLowerCase())
                    }}
                    name="q"
                    placeholder="Search"
                    className="w-full rounded-full border-2 bg-white py-6 pr-16 pl-14 text-primary-400 outline-none focus-ring"
                  />
                  <div className="absolute top-0 right-0 hidden h-full w-14 items-center justify-between text-lg font-bold text-primary-400 md:flex">
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
                  <div className="col-span-full -mr-4 -mb-4 flex flex-wrap justify-center lg:col-span-10">
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
            cta="See all articles"
            ctaUrl={link}
          />
          <Spacer size="2xs" />
        </Section>
      )}

      {!isSearching && featured && featuredEnabled && (
        <Section>
          <HighlightCard
            category={featured.category}
            href={
              hydrated
                ? `/${BlogPath}${getDatedSlug(
                    featured.date as string,
                    featured._sys?.filename || '',
                  )}`
                : ''
            }
            title={featured.title}
            subTitle={
              hydrated
                ? featured.date
                  ? `${formatDate(parseISO(featured.date), 'PPP')}`
                  : 'TBA'
                : ''
            }
            image={featured.heroImg}
          />
        </Section>
      )}

      <Section>
        <Grid className="mt-16 mb-32 gap-y-16">
          {matchingPosts.length === 0 ? (
            <div className="col-span-full flex flex-col">
              <H3 as="p" variant="secondary" className="max-w-lg">
                No results found.
              </H3>
            </div>
          ) : (
            posts.map(blog => {
              return (
                <div key={blog.id} className="col-span-4">
                  <ArticleCard {...blog} id={blog.id} />
                </div>
              )
            })
          )}
        </Grid>

        {hasMorePosts ? (
          <div className="mb-32 flex w-full justify-center">
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

const blogBlockSchema: Template = {
  name: 'Blog',
  label: 'Blog',
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
    {
      type: 'boolean',
      label: 'Is featured enabled?',
      name: 'featuredEnabled',
    },
    tagsSchema,
    {
      type: 'number',
      label: 'Number of visible items, leave empty for all.',
      name: 'count',
    },
  ],
}

export { Blog, blogBlockSchema }
