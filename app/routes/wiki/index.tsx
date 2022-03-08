import { Grid, H3 } from '@daren/ui-components'
import { PlusIcon, SearchIcon } from '@heroicons/react/solid'
import * as React from 'react'
import {
  json,
  Link,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
  useSearchParams,
} from 'remix'

import { Button } from '~/components/buttons'
import { Tag } from '~/components/elements'

import { Container, Section, Spacer } from '~/components/layout'

import { getWikiPages, WikiPage } from '~/lib/api/wiki.server'
import { useUpdateQueryStringValueWithoutNavigation } from '~/lib/utils/misc'
import { filterWikiPages } from '~/lib/utils/wiki'

const PAGE_SIZE = 10

export const meta: MetaFunction = () => {
  return {
    title: 'Darens Wiki Pages',
    description: 'A list of all my wiki pages that I use as documentation.',
  }
}

type LoaderData = {
  wikiPages: WikiPage[]
  tags: string[]
}
export const loader: LoaderFunction = async () => {
  const wikiPages = await getWikiPages()

  return json<LoaderData>({
    wikiPages:
      wikiPages.sort((a, b) => {
        return new Date(a.date) < new Date(b.date) ? 1 : -1
      }) || [],
    tags: [],
  })
}

export default function WikiOverviewPage() {
  const { wikiPages: allWikiPages, tags } = useLoaderData<LoaderData>()

  const [searchParams] = useSearchParams()

  const [indexToShow, setIndexToShow] = React.useState(PAGE_SIZE)
  const filteredWikiPages =
    tags.length > 0
      ? filterWikiPages(allWikiPages, tags.map(value => value).join(' '))
      : allWikiPages

  const [queryValue, setQuery] = React.useState<string>(
    searchParams.get('q') ?? '',
  )

  const query = queryValue.trim()

  useUpdateQueryStringValueWithoutNavigation('q', query)

  const matchingWikiPages = React.useMemo(() => {
    return filterWikiPages(filteredWikiPages, query)
  }, [filteredWikiPages, query])

  React.useEffect(() => {
    setIndexToShow(PAGE_SIZE)
  }, [query])

  const allTags = [
    ...new Set(
      filteredWikiPages?.flatMap(wikipage =>
        wikipage.tags?.map(value => value),
      ),
    ),
  ]

  const wikiPages: WikiPage[] = matchingWikiPages.slice(0, indexToShow)

  const hasMoreWikiPages = indexToShow < matchingWikiPages.length

  const visibleTags = [
    ...new Set(
      matchingWikiPages.flatMap(wikiPage => wikiPage.tags?.map(value => value)),
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
    <div>
      <Section>
        <Grid>
          <Container size="full">
            <h1 className="text-6xl font-black leading-none text-transparent uppercase sm:text-[11.6250vw] 2xl:text-[12rem] text-primary">
              Darens Wiki Pages
            </h1>
          </Container>
        </Grid>
      </Section>
      <Section>
        <Grid>
          <Container size="default" className="mt-24">
            <div className="relative">
              <SearchIcon
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
                {matchingWikiPages.length}
              </div>
            </div>
          </Container>
        </Grid>
      </Section>

      <Spacer size="3xs" className="col-span-full" />

      {allTags.length > 0 ? (
        <Section className="mb-16">
          <Grid>
            <Container size="small">
              <div className="flex flex-wrap col-span-full justify-center -mr-4 -mb-4 lg:col-span-10">
                {allTags.map(tag => {
                  if (!tag || !tag) {
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

      <Section>
        <Grid className="gap-y-16 mt-16 mb-32">
          {matchingWikiPages.length === 0 ? (
            <Container size="default">
              <H3 as="p" variant="secondary" className="max-w-lg">
                No results found
              </H3>
            </Container>
          ) : (
            <Container
              size="default"
              className="-my-5 divide-y divide-gray-200 dark:divide-gray-800"
            >
              {wikiPages.map(wikiPage => (
                <div key={wikiPage.slug} className="py-5">
                  <div className="relative focus-within:ring-2 focus-within:ring-slate-300">
                    <H3 className="text-sm font-semibold text-primary">
                      <Link
                        to={`/wiki/${wikiPage.slug}`}
                        className="hover:underline focus:outline-none"
                      >
                        {/* Extend touch target to entire panel */}
                        <span className="absolute inset-0" aria-hidden="true" />
                        {wikiPage.title}
                      </Link>
                    </H3>
                    <p className="mt-2 text-sm text-secondary line-clamp-2">
                      {wikiPage.description}
                    </p>
                  </div>
                </div>
              ))}
            </Container>
          )}
        </Grid>
        {hasMoreWikiPages ? (
          <div className="flex justify-center mb-32 w-full">
            <Button
              variant="secondary"
              onClick={() => setIndexToShow(i => i + PAGE_SIZE)}
            >
              <span>Load more wiki pages</span>{' '}
              <PlusIcon width="20px" height="20px" />
            </Button>
          </div>
        ) : null}
      </Section>
    </div>
  )
}
