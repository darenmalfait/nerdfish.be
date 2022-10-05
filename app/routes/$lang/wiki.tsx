import { Container, Grid, H2 } from '@daren/ui-components'
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/solid'
import type { LoaderArgs, SerializeFrom } from '@remix-run/node'
import { Link, useLoaderData, useSearchParams } from '@remix-run/react'
import { parseISO } from 'date-fns'
import formatDate from 'date-fns/format'
import * as React from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '~/components/buttons'

import { Tag } from '~/components/elements'

import { Section, Spacer } from '~/components/layout'

import { getWikiPages } from '~/lib/api'
import { getBlogSlug, getRoute } from '~/lib/routes'
import { i18n } from '~/lib/services/i18n.server'
import { filterPosts } from '~/lib/utils/blog'
import { useUpdateQueryStringValueWithoutNavigation } from '~/lib/utils/misc'
import { GenericErrorBoundary } from '~/route-containers/boundaries/generic-error-boundary'
import { PageType, SanityPost } from '~/types'

export { GenericErrorBoundary as ErrorBoundary }

export async function loader({ request, params }: LoaderArgs) {
  const lang = await i18n.getLocale(request)

  const wikis = await getWikiPages({
    lang,
  })

  return {
    wikis: wikis?.posts || [],
    params,
  }
}

const PAGE_SIZE = 6

export default function WikiPage() {
  const { t, i18n } = useTranslation()
  const { wikis } = useLoaderData<typeof loader>()
  const [searchParams] = useSearchParams()

  const [indexToShow, setIndexToShow] = React.useState(PAGE_SIZE)

  const [queryValue, setQuery] = React.useState<string>(
    searchParams.get('q') ?? '',
  )

  const query = queryValue.trim()

  useUpdateQueryStringValueWithoutNavigation('q', query)

  const matchingPosts = React.useMemo(() => {
    return filterPosts(wikis, query)
  }, [wikis, query])

  React.useEffect(() => {
    setIndexToShow(PAGE_SIZE)
  }, [query])

  const allTags = [
    ...new Set(wikis.flatMap(post => post.tags?.map(({ value }) => value))),
  ]

  const posts: SerializeFrom<SanityPost>[] = matchingPosts.slice(0, indexToShow)

  const hasMorePosts = indexToShow < matchingPosts.length

  const visibleTags = [
    ...new Set(
      matchingPosts.flatMap(post => post.tags?.map(({ value }) => value)),
    ),
  ]

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
    <main>
      <Section>
        <Grid>
          <Container size="full" className="mt-12">
            <H2 className="mb-4">Wiki</H2>

            <div className="relative">
              <MagnifyingGlassIcon
                width="20px"
                height="20px"
                className="flex absolute top-0 left-6 justify-center items-center p-0 h-full text-primary-400 bg-transparent border-none"
              />
              <input
                type="search"
                value={queryValue}
                onChange={event =>
                  setQuery(event.currentTarget.value.toLowerCase())
                }
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
                {allTags.map((tag, i) => {
                  if (!tag) {
                    return null
                  }

                  const selected = query.includes(tag)
                  return (
                    <Tag
                      key={tag + i}
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
      <Grid>
        <Container size="small">
          <section className="py-12 space-y-14 sm:py-16 sm:space-y-16">
            {posts.map(wiki => {
              return (
                <article key={wiki.slug} className="flex flex-col">
                  <Link
                    to={getRoute(
                      PageType.wiki,
                      getBlogSlug(wiki.publishedAt, wiki.slug as string),
                      i18n.language,
                    )}
                    className="text-2xl font-semibold leading-snug text-primary hover:text-secondary line-clamp-3"
                  >
                    {wiki.title}
                  </Link>
                  <p className="text-sm text-gray-400 dark:text-gray-600">
                    {formatDate(parseISO(wiki.publishedAt), 'PPP')}
                  </p>
                  <p className="mt-2 text-justify text-gray-600 dark:text-gray-300">
                    {wiki.excerpt}
                  </p>
                </article>
              )
            })}
          </section>
        </Container>
      </Grid>
      {hasMorePosts ? (
        <div className="flex justify-center mb-32 w-full">
          <Button
            variant="secondary"
            onClick={() => setIndexToShow(i => i + PAGE_SIZE)}
          >
            <span>{t('blog.load-more')}</span>{' '}
            <PlusIcon width="20px" height="20px" />
          </Button>
        </div>
      ) : null}
    </main>
  )
}
