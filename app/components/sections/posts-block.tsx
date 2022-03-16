import { H3, Grid, H2 } from '@daren/ui-components'
import { PlusIcon, SearchIcon } from '@heroicons/react/solid'
import formatDate from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import * as React from 'react'
import { useSearchParams } from 'remix'

import { Button } from '~/components/buttons'
import { ArticleCard, HighlightCard, Tag } from '~/components/elements'
import { Section, Container, Header, Spacer } from '~/components/layout'
import { useTranslations } from '~/context/translations-provider'
import { getBlogSlug, getRoute } from '~/lib/routes'
import { filterPosts } from '~/lib/utils/blog'
import { localizeSlug } from '~/lib/utils/i18n'
import { useUpdateQueryStringValueWithoutNavigation } from '~/lib/utils/misc'
import { PageType } from '~/types/languages'
import type {
  SanityBlock,
  SanityPage,
  SanityPost,
  SanityTag,
} from '~/types/sanity'

// should be divisible by 3 and 2 (large screen, and medium screen).
const PAGE_SIZE = 6

interface ContentProps {
  title?: string
  subTitle?: string
  posts?: SanityPost[]
  searchEnabled?: boolean
  featuredEnabled?: boolean
  count?: number
  tags?: SanityTag[]
  link?: SanityPage
}

export function PostsBlock({
  content: {
    count,
    featuredEnabled,
    link,
    posts: allPosts = [],
    searchEnabled,
    subTitle,
    tags = [],
    title,
  } = {},
}: SanityBlock<ContentProps>) {
  const { t, currentLanguage } = useTranslations()
  const [searchParams] = useSearchParams()

  const [indexToShow, setIndexToShow] = React.useState(PAGE_SIZE)
  let filteredPosts =
    tags.length > 0
      ? filterPosts(allPosts, tags.map(({ value }) => value).join(' '))
      : allPosts

  if (count) {
    filteredPosts = filteredPosts.slice(0, count)
  }

  const featured = filteredPosts.length > 0 ? filteredPosts[0] : null

  const [queryValue, setQuery] = React.useState<string>(
    searchParams.get('q') ?? '',
  )

  const query = queryValue.trim()

  useUpdateQueryStringValueWithoutNavigation('q', query)

  const matchingPosts = React.useMemo(() => {
    return filterPosts(filteredPosts, query)
  }, [filteredPosts, query])

  React.useEffect(() => {
    setIndexToShow(PAGE_SIZE)
  }, [query])

  const allTags = [
    ...new Set(
      filteredPosts.flatMap(post => post.tags?.map(({ value }) => value)),
    ),
  ]

  const isSearching = query.length > 0

  const posts: SanityPost[] =
    isSearching || !featuredEnabled
      ? matchingPosts.slice(0, indexToShow)
      : matchingPosts
          .filter(p => p.slug !== featured?.slug)
          .slice(0, indexToShow)

  const hasMorePosts =
    isSearching || !featuredEnabled
      ? indexToShow < matchingPosts.length
      : indexToShow < matchingPosts.length - 1

  const visibleTags =
    isSearching || !featuredEnabled
      ? [
          ...new Set(
            matchingPosts.flatMap(post => post.tags?.map(({ value }) => value)),
          ),
        ]
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
            <Grid>
              <Container size="full" className="mt-12">
                {title && <H2 className="mb-4">{title}</H2>}
                {subTitle && <H3 className="mb-8">{subTitle}</H3>}

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

      {!searchEnabled && (title || subTitle) && (
        <Section className="mt-24">
          <Header
            title={title}
            subTitle={subTitle}
            cta={t('see-all-articles')}
            ctaUrl={link?.slug && localizeSlug(link?.slug, currentLanguage)}
          />
          <Spacer size="2xs" />
        </Section>
      )}

      {!isSearching && featured && featuredEnabled && (
        <Section>
          <HighlightCard
            category={featured.category}
            href={getRoute(
              getBlogSlug(featured.publishedAt, featured.slug as string),
              PageType.blog,
              currentLanguage,
            )}
            title={featured.title}
            subTitle={
              featured.publishedAt
                ? `${formatDate(parseISO(featured.publishedAt), 'PPP')} — ${
                    `${featured.readingTime} ${t('read-time')}` ??
                    t('quick-read')
                  }`
                : 'TBA'
            }
            image={featured.image}
          />
        </Section>
      )}
      <Section>
        <Grid className="gap-y-16 mt-16 mb-32">
          {matchingPosts.length === 0 ? (
            <div className="flex flex-col col-span-full">
              <H3 as="p" variant="secondary" className="mt-24 max-w-lg">
                {t('blog-no-results')}
              </H3>
            </div>
          ) : (
            posts.map(post => (
              <div key={post.slug} className="col-span-4">
                <ArticleCard {...post} />
              </div>
            ))
          )}
        </Grid>
        {hasMorePosts ? (
          <div className="flex justify-center mb-32 w-full">
            <Button
              variant="secondary"
              onClick={() => setIndexToShow(i => i + PAGE_SIZE)}
            >
              <span>{t('blog-load-more')}</span>{' '}
              <PlusIcon width="20px" height="20px" />
            </Button>
          </div>
        ) : null}
      </Section>
    </>
  )
}
