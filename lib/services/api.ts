import client from '../../.tina/__generated__/client'

import type { Blog, ContentQueryQuery, Wiki } from '.tina/__generated__/types'

function sortByDate<T>(
  items: T &
    {
      date?: string
    }[],
) {
  return items.sort((a, b) => {
    const aDate = new Date(a.date || '')
    const bDate = new Date(b.date || '')

    return bDate.getTime() - aDate.getTime()
  })
}

async function getPages() {
  const blogListData = await client.queries.pageConnection()

  return sortByDate(
    blogListData.data.pageConnection.edges?.map(item => ({
      ...item?.node,
    })) || [],
  )
}

async function getBlogPosts() {
  const blogListData = await client.queries.blogConnection()

  return sortByDate(
    blogListData.data.blogConnection.edges?.map(item => ({
      ...item?.node,
    })) || [],
  )
}

async function getWikiPosts() {
  const wikiListData = await client.queries.wikiConnection()

  return sortByDate(
    wikiListData.data.wikiConnection.edges?.map(item => ({
      ...item?.node,
    })) || [],
  )
}

async function getWikiPost(relativePath: string) {
  return client.queries.wikiQuery({
    relativePath,
  })
}

async function getBlogPost(relativePath: string) {
  return client.queries.blogPostQuery({
    relativePath,
  })
}

function mapPageData(data: ContentQueryQuery) {
  return {
    ...data,
    blog: data.blogConnection.edges?.map(item => ({
      ...(item?.node ?? {}),
    })) as Blog[],
    wiki: data.wikiConnection.edges?.map(item => ({
      ...(item?.node ?? {}),
    })) as Wiki[],
  }
}

async function getPage(relativePath: string) {
  const page = await client.queries.contentQuery({
    relativePath,
  })

  return {
    ...page,
    data: mapPageData(page.data),
  }
}

export {
  getBlogPosts,
  getWikiPosts,
  getWikiPost,
  getBlogPost,
  getPages,
  getPage,
  mapPageData,
}
