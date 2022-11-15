import client from '../../.tina/__generated__/client'

import type { Blog, ContentQueryQuery, Wiki } from '.tina/__generated__/types'

async function getPages() {
  const pageDate = await client.queries.pageConnection()

  return pageDate.data.pageConnection.edges?.map(item => ({
    ...item?.node,
  }))
}

async function getBlogPosts() {
  const blogListData = await client.queries.blogConnection()

  return blogListData.data.blogConnection.edges?.map(item => ({
    ...item?.node,
  }))
}

async function getWikiPosts() {
  const wikiListData = await client.queries.wikiConnection()

  return wikiListData.data.wikiConnection.edges?.map(item => ({
    ...item?.node,
  }))
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
