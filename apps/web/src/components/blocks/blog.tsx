'use client'

import * as React from 'react'
import {Image} from '@nerdfish-website/ui/components/image'
import {Spacer} from '@nerdfish-website/ui/components/spacer'
import {Tag} from '@nerdfish-website/ui/components/tag'
import {Button, H3, H5} from '@nerdfish/ui'
import {cx, ExtractProps} from '@nerdfish/utils'
import {formatDate, parseISO} from 'date-fns'
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
        <section className="container mx-auto px-4">
          <div
            data-tina-field={tinaField(data, 'header')}
            className="relative mx-auto mb-24 grid h-auto grid-cols-4 justify-center gap-x-4 md:grid-cols-8 lg:mb-0 lg:grid-cols-12 lg:gap-x-6 lg:pb-12"
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
                  <Header title={title} subTitle={subtitle} />
                ) : null}
                <div className="relative w-full pb-8 pt-6 text-center lg:py-8 lg:text-left">
                  <Search
                    width="20px"
                    height="20px"
                    className="absolute left-6 top-0 flex h-full items-center justify-center border-none bg-transparent p-0 text-muted"
                  />
                  <input
                    type="search"
                    value={query}
                    onChange={event => {
                      setQuery(event.currentTarget.value.toLowerCase())
                    }}
                    name="q"
                    placeholder="Search"
                    className="w-full rounded-full border-2 bg-primary py-6 pl-14 pr-16 text-primary/60 outline-none focus-ring"
                  />
                  <div className="absolute right-0 top-0 hidden h-full w-14 items-center justify-between text-lg font-bold text-muted md:flex">
                    {matchingPosts.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {searchEnabled && allTags.length > 0 ? (
        <div className="container mx-auto my-16 px-4">
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
        </div>
      ) : null}

      <section className="container mx-auto mt-24 px-4">
        {!searchEnabled && (title ?? subtitle) ? (
          <div data-tina-field={tinaField(data, 'header')}>
            <Header
              title={title}
              subTitle={subtitle}
              cta="See all articles"
              ctaUrl={link}
            />
            <Spacer size="2xs" />
          </div>
        ) : null}

        {!isSearching && featured && featuredEnabled ? (
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
        ) : null}

        <div className="relative mb-32 mt-16 grid grid-cols-4 gap-x-4 gap-y-16 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-6">
          {matchingPosts.length === 0 ? (
            <div className="flex flex-col">
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
        </div>

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
      </section>
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
