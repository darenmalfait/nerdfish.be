import {Blog} from '_tina/__generated__/types'
import {parseISO} from 'date-fns'
import {padStart} from 'lodash'

import {client} from '../../../.tina/__generated__/client'

async function getGlobalData() {
  const global = await client.queries.globalConnection()

  return global.data.globalConnection.edges?.map(item => ({
    ...item?.node,
  }))?.[0]
}

async function getPageData(slug?: string) {
  const {data, query, variables} = await client.queries.contentQuery({
    relativePath: `${slug ?? 'home'}.md`,
  })

  return {
    data,
    query,
    variables,
  }
}

async function getAllBlogPosts() {
  const blog = await client.queries.blogConnection()

  return blog.data.blogConnection.edges?.map(item => ({
    ...item?.node,
  }))
}

async function getBlogData(relativePath: string) {
  const blog = await client.queries.blogPostQuery({
    relativePath,
  })

  const allPosts = blog.data.blogConnection.edges?.map(item => ({
    ...item?.node,
  }))

  const relatedPosts = allPosts
    ?.filter(
      post =>
        post.title !== blog.data.blog.title &&
        post.date !== blog.data.blog.date &&
        post.tags?.some(tag => blog.data.blog.tags?.includes(tag)),
    )
    .slice(0, 3)

  return {
    ...blog,
    relatedPosts: relatedPosts as Blog[],
  }
}

async function getWikiData(relativePath: string) {
  return client.queries.wikiQuery({
    relativePath,
  })
}

async function getSitemapData() {
  const queryData = await client.queries.sitemapQuery()

  const pages =
    queryData.data.pageConnection.edges?.map(
      item => item?.node?._sys.filename,
    ) ?? []

  const blogPosts =
    queryData.data.blogConnection.edges?.map(item => {
      const date = parseISO(item?.node?.date ?? '')
      const year = date.getFullYear()
      const month = padStart((date.getMonth() + 1).toString(), 2, '0')

      return `blog/${year}/${month}/${item?.node?._sys.filename}`
    }) ?? []

  const wikiPosts =
    queryData.data.wikiConnection.edges?.map(item => {
      const date = parseISO(item?.node?.date ?? '')
      const year = date.getFullYear()
      const month = padStart((date.getMonth() + 1).toString(), 2, '0')

      return `wiki/${year}/${month}/${item?.node?._sys.filename}`
    }) ?? []

  return [...pages, ...blogPosts, ...wikiPosts].filter(Boolean)
}

export {
  getGlobalData,
  getAllBlogPosts,
  getPageData,
  getBlogData,
  getWikiData,
  getSitemapData,
}
