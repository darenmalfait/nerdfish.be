'use client'

import * as React from 'react'
import {Image} from '@nerdfish-website/ui/components/image'
import {Spacer} from '@nerdfish-website/ui/components/spacer'
import {Tag} from '@nerdfish-website/ui/components/tag'
import {Button, Container, Grid, H3, H5, Section} from '@nerdfish/ui'
import {cx, ExtractProps} from '@nerdfish/utils'
import formatDate from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import {Plus, Search} from 'lucide-react'
import {tinaField} from 'tinacms/dist/react'

import {ArticleCard} from '~/components/article-card'
import {Header} from '~/components/header'
import {HighlightCard} from '~/components/highlight-card'
import {type Block} from '~/lib/types/cms'
import {filterBlog} from '~/lib/utils/blog'
import {
  buildSrc,
  buildSrcSet,
  getLowQualityUrlFor,
} from '~/lib/utils/cloudinary'
import {BlogPath} from '~/lib/utils/constants'
import {getDatedSlug} from '~/lib/utils/routes'

// should be divisible by 3 and 2 (large screen, and medium screen).
const PAGE_SIZE = 6

function BlogOverview(
  data: Block & {
    header?: {
      title?: string
      subtitle?: string
      link?: string
      image?: string
    }
    searchEnabled?: boolean
    featuredEnabled?: boolean
    tags?: string[]
    count?: number
  },
) {
  const {
    header,
    searchEnabled,
    featuredEnabled,
    tags,
    count,
    globalData = {},
  } = data

  const {blogs: allPosts = []} = globalData

  const {title, subtitle, link} = header ?? {}

  const [query, setQuery] = React.useState('')

  const [indexToShow, setIndexToShow] = React.useState(PAGE_SIZE)

  let filteredPosts =
    tags && tags.length > 0 ? filterBlog(allPosts, tags.join(' ')) : allPosts
  const allTags = [...new Set(filteredPosts.flatMap(post => post.tags))]

  if (count) {
    filteredPosts = filteredPosts.slice(0, count)
  }

  const matchingPosts = React.useMemo(() => {
    return filterBlog(filteredPosts, query)
  }, [filteredPosts, query])

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
      {searchEnabled ? (
        <Section>
          <Grid>
            <Container size="full">
              <div
                data-tina-field={tinaField(data, 'header')}
                className="relative mx-auto mb-24 grid h-auto max-w-7xl grid-cols-4 justify-center gap-x-4 md:grid-cols-8 lg:mb-0 lg:grid-cols-12 lg:gap-x-6 lg:pb-12"
              >
                {header?.image ? (
                  <div
                    data-tina-field={tinaField(data, 'header')}
                    className="col-span-full mb-12 px-10 lg:col-span-5 lg:col-start-7 lg:mb-0"
                  >
                    <Image
                      className="rounded-xl"
                      placeholder={getLowQualityUrlFor(header.image)}
                      srcSet={buildSrcSet(header.image)}
                      src={buildSrc(header.image, {
                        width: 500,
                      })}
                      loading="eager"
                      alt={header.image}
                    />
                  </div>
                ) : null}
                <div
                  className={cx(
                    'col-span-full pt-6 lg:row-start-1 lg:flex lg:h-full lg:flex-col',
                    {
                      'lg:col-span-5 lg:col-start-1': header?.image,
                    },
                  )}
                >
                  <div className="flex flex-auto flex-col justify-center">
                    {title ?? subtitle ? (
                      <Header nested title={title} subTitle={subtitle} />
                    ) : null}
                    <Grid
                      nested
                      className="relative w-full pb-8 pt-6 text-center lg:py-8 lg:text-left"
                    >
                      <Container size="full" className="relative">
                        <Search
                          width="20px"
                          height="20px"
                          className="absolute left-6 top-0 flex h-full items-center justify-center border-none bg-transparent p-0 text-primary-400"
                        />
                        <input
                          type="search"
                          value={query}
                          onChange={event => {
                            setQuery(event.currentTarget.value.toLowerCase())
                          }}
                          name="q"
                          placeholder="Search"
                          className="w-full rounded-full border-2 bg-white py-6 pl-14 pr-16 text-primary-400 outline-none focus-ring"
                        />
                        <div className="absolute right-0 top-0 hidden h-full w-14 items-center justify-between text-lg font-bold text-primary-400 md:flex">
                          {matchingPosts.length}
                        </div>
                      </Container>
                    </Grid>
                  </div>
                </div>
              </div>
            </Container>
          </Grid>
        </Section>
      ) : null}

      {searchEnabled && allTags.length > 0 ? (
        <Section className="my-16">
          <Grid>
            <Container size="full" className="space-y-4">
              <H5 as="h3" className="mb-8">
                Filter articles by topic
              </H5>
              <div className="col-span-full -mb-4 -mr-4 flex flex-wrap justify-start lg:col-span-10">
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
                      disabled={visibleTags.includes(tag) ? false : !selected}
                    />
                  )
                })}
              </div>
            </Container>
          </Grid>
        </Section>
      ) : null}

      {!searchEnabled && (title ?? subtitle) ? (
        <Section className="mt-24" data-tina-field={tinaField(data, 'header')}>
          <Header
            title={title}
            subTitle={subtitle}
            cta="See all articles"
            ctaUrl={link}
          />
          <Spacer size="2xs" />
        </Section>
      ) : null}

      {!isSearching && featured && featuredEnabled ? (
        <Section>
          <HighlightCard
            category={featured.category}
            href={`/${BlogPath}${getDatedSlug(
              featured.date as string,
              featured._sys?.filename ?? '',
            )}`}
            title={featured.title}
            subTitle={
              featured.date
                ? `${formatDate(parseISO(featured.date), 'PPP')}`
                : 'TBA'
            }
            image={featured.heroImg}
          />
        </Section>
      ) : null}

      <Section>
        <Grid className="mb-32 mt-16 gap-y-16">
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
                  <ArticleCard {...blog} />
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
              <span>Load more</span> <Plus width="20px" height="20px" />
            </Button>
          </div>
        ) : null}
      </Section>
    </>
  )
}

export default function Blog(props: ExtractProps<typeof BlogOverview>) {
  return <BlogOverview {...props} />
}

export {Blog}

/*
eslint
  complexity: "off",
*/
